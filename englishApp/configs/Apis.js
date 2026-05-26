import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GATEWAY_URL = 'https://api-gateway-truong-ehdahkaybrfxbfc8.southeastasia-01.azurewebsites.net';

const IDENTITY_BASE_URL = `${GATEWAY_URL}/identity/api`;
const LEARNING_BASE_URL = `${GATEWAY_URL}/learning/api`;
const AI_BASE_URL       = `${GATEWAY_URL}/ai`;

export const endpoints = {
    // ===== IDENTITY SERVICE =====
    'login':           '/login',
    'register':        '/register',
    'refresh-token':   '/auth/refresh',
    'google-login':    '/auth/google-signin',
    'profile':         '/secure/profile',
    'reset-password':  '/reset-password',
    'verify-otp':      '/verified-otp',
    'change-password': '/change-password',
    'update-password': '/secure/change-password',

    // ===== LEARNING SERVICE =====
    'main-topics':            '/secure/main-topics',
    'main-topics-detail':     (id) => `/secure/main-topics/${id}`,
    'main-topics-recommend':  '/secure/learning-path',
    'sub-topics-detail':      (id) => `/secure/sub-topics/${id}`,
    'vocabulary-detail':      (id) => `/secure/vocabulary/${id}`,
    'save-vocabulary':        '/secure/vocabulary/save',
    'toggle-vocabulary-save': (id) => `/secure/vocabulary/${id}/toggle`,
    'user-vocabulary-progress': '/secure/learning-progress/vocabulary',
    'video':                  '/secure/videos',
    'video-detail':           (id) => `/secure/videos/${id}`,
    'video-progress':         (id) => `/secure/video/${id}/update-progress`,
    'user-video-progress':    '/secure/learning-progress/video',
    'do-quiz':                (id) => `/secure/quiz/${id}/quiz-progress`,
    'quiz':                   '/quiz',
    'generate-quiz':          '/quiz/generate',
    'submit-quiz':            '/secure/quiz/submit',
    'quiz-detail':            (id) => `/quiz/${id}`,
    'session':                '/secure/sessions/daily',
    'submit-quiz-session':    (sessionId, quizId) => `/secure/sessions/${sessionId}/quiz/${quizId}/submit`,
    'submit-writing-session': (sessionId, promptId) => `/secure/sessions/${sessionId}/writing/${promptId}/submit`,
    'check-level-up':         (sessionId) => `/sessions/${sessionId}/levelup-check`,
    'leader-board':           '/secure/leaderboard/weekly',
    'learning-profile':       '/secure/learning-profile',
    'streak-calendar':        '/secure/stats/streak-calendar',
    'summary':                '/secure/stats/summary',
    'placement-test':         '/secure/placement/generate',
    'submit-placement-test':  '/secure/placement/submit',

    // ===== AI SERVICE =====
    'chat-voice': '/chat',
    'get-score':  '/v2/score',
    'tts':        '/tts',
};

// ---------------------------------------------------------------------------
// Unauthorized callback
// ---------------------------------------------------------------------------
let onUnauthorizedCallback = null;
export const registerUnauthorizedHandler = (callback) => {
    onUnauthorizedCallback = callback;
};

// ---------------------------------------------------------------------------
// Dedicated instance ONLY for refreshing — NO interceptors to avoid circular calls
// ---------------------------------------------------------------------------
const refreshInstance = axios.create({
    baseURL: IDENTITY_BASE_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'Accept':        'application/json',
    },
});

// ---------------------------------------------------------------------------
// Token-refresh queue (prevents race conditions with multiple 401s)
// ---------------------------------------------------------------------------
let isRefreshing = false;
let failedQueue  = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
    failedQueue = [];
};

// ---------------------------------------------------------------------------
// The actual refresh logic — self-contained, no dependency on LoadData
// ---------------------------------------------------------------------------
const doRefreshToken = async () => {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const res = await refreshInstance.post(endpoints['refresh-token'], {
        token: refreshToken,
    });

    if (res.data?.code === 1000) {
        const token = res.data.result?.token;
        await AsyncStorage.setItem("token", token);
        console.log("New token:", token);
        return token;
    }

    throw new Error("Refresh token failed");
};

const handleUnauthorizedAndRetry = async (instance, originalRequest) => {
    const isAuthEndpoint =
        originalRequest.url?.includes(endpoints['login']) ||
        originalRequest.url?.includes(endpoints['refresh-token']);

    if (isAuthEndpoint) {
        onUnauthorizedCallback?.();
        throw new Error("Unauthorized on auth endpoint");
    }

    // Queue subsequent 401s/redirects while a refresh is already in flight
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        }).then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return instance(originalRequest);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
        const newToken = await doRefreshToken();
        processQueue(null, newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return instance(originalRequest);
    } catch (refreshError) {
        processQueue(refreshError, null);
        onUnauthorizedCallback?.();
        throw refreshError;
    } finally {
        isRefreshing = false;
    }
};

// ---------------------------------------------------------------------------
// Interceptor factory
// ---------------------------------------------------------------------------
const addInterceptors = (instance, isAuth = false) => {
    // — Request —
    instance.interceptors.request.use(
        async (config) => {
            if (isAuth) {
                const token = await AsyncStorage.getItem("token");
                if (token) config.headers['Authorization'] = `Bearer ${token}`;
            }
            console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL || ''}${config.url}`, config.data || '');
            return config;
        },
        (error) => {
            console.log(`[API Request Error]`, error);
            return Promise.reject(error);
        },
    );

    // — Response —
    instance.interceptors.response.use(
        async (response) => {
            console.log(`[API Response Success] ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`, response.data);
            // Gateway sometimes redirects to an HTML login page instead of 401
            if (
                typeof response.data === 'string' &&
                response.data.includes('<!DOCTYPE html>')
            ) {
                const originalRequest = response.config;
                if (!originalRequest._retry) {
                    try {
                        return await handleUnauthorizedAndRetry(instance, originalRequest);
                    } catch (retryError) {
                        return Promise.reject(retryError);
                    }
                } else {
                    onUnauthorizedCallback?.();
                }
            }
            return response;
        },
        async (error) => {
            console.log(`[API Response Error] ${error.config?.method?.toUpperCase()} ${error.config?.url} - Status: ${error.response?.status}`, error.response?.data || error.message);
            const originalRequest = error.config;
            const status = error.response?.status;

            if ((status === 401 || status === 403) && !originalRequest._retry) {
                try {
                    return await handleUnauthorizedAndRetry(instance, originalRequest);
                } catch (retryError) {
                    return Promise.reject(retryError);
                }
            }

            return Promise.reject(error);
        },
    );
};

// ---------------------------------------------------------------------------
// API instances
// ---------------------------------------------------------------------------
export const IdentityApis = axios.create({
    baseURL: IDENTITY_BASE_URL,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
addInterceptors(IdentityApis);

export const LearningApis = axios.create({
    baseURL: LEARNING_BASE_URL,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
addInterceptors(LearningApis);

export const AIApis = axios.create({
    baseURL: AI_BASE_URL,
    timeout: 30000,
    headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
});
addInterceptors(AIApis);

// Authenticated singletons — token is injected automatically by the interceptor
export const authIdentityApisInstance = axios.create({
    baseURL: IDENTITY_BASE_URL,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
addInterceptors(authIdentityApisInstance, true);

export const authLearningApisInstance = axios.create({
    baseURL: LEARNING_BASE_URL,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
addInterceptors(authLearningApisInstance, true);

// Kept as functions for backward-compatibility with existing call sites
// (token param is ignored — the interceptor reads it from AsyncStorage)
export const authIdentityApis = () => authIdentityApisInstance;
export const authLearningApis = () => authLearningApisInstance;

const Apis = axios.create({ timeout: 15000 });
addInterceptors(Apis);
export default Apis;
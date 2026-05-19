import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GATEWAY_URL = 'https://api-gateway-truong-ehdahkaybrfxbfc8.southeastasia-01.azurewebsites.net';

const IDENTITY_BASE_URL = `${GATEWAY_URL}/identity/api`;
const LEARNING_BASE_URL = `${GATEWAY_URL}/learning/api`;
const AI_BASE_URL = `${GATEWAY_URL}/ai`;

export const endpoints = {
    // ===== IDENTITY SERVICE =====
    'login': '/login',
    'register': '/register',
    'refresh-token': '/auth/refresh',
    'google-login': '/auth/google-signin',
    'profile': '/secure/profile',
    'reset-password': '/reset-password',
    'verify-otp': '/verified-otp',
    'change-password': '/change-password',
    'update-password': '/secure/change-password',

    // ===== LEARNING SERVICE =====
    // -- Main Topics --
    'main-topics': '/secure/main-topics',
    'main-topics-detail': (id) => `/secure/main-topics/${id}`,
    'main-topics-recommend': '/secure/learning-path',
    // -- Sub Topics --
    'sub-topics-detail': (id) => `/secure/sub-topics/${id}`,
    // -- Vocabulary --
    'vocabulary-detail': (id) => `/secure/vocabulary/${id}`,
    'save-vocabulary': '/secure/vocabulary/save',
    'toggle-vocabulary-save': (id) => `/secure/vocabulary/${id}/toggle`,
    'user-vocabulary-progress': '/secure/learning-progress/vocabulary',
    // -- Video --
    'video': '/secure/videos',
    'video-detail': (id) => `/secure/videos/${id}`,
    'video-progress': (id) => `/secure/video/${id}/update-progress`,
    'user-video-progress': '/secure/learning-progress/video',
    // -- Quiz --
    'do-quiz': (id) => `/secure/quiz/${id}/quiz-progress`,
    'quiz': '/quiz',
    'generate-quiz': '/quiz/generate',
    'submit-quiz': '/secure/quiz/submit',
    'quiz-detail': (id) => `/quiz/${id}`,
    // -- Session --
    'session': '/secure/sessions/daily',
    'submit-quiz-session': (sessionId, quizId) => `/secure/sessions/${sessionId}/quiz/${quizId}/submit`,
    'submit-writing-session': (sessionId, promptId) => `/secure/sessions/${sessionId}/writing/${promptId}/submit`,
    'check-level-up': (sessionId) => `/sessions/${sessionId}/levelup-check`,
    // -- Others --
    'leader-board': '/secure/leaderboard/weekly',
    'learning-profile': '/secure/learning-profile',
    'streak-calendar': '/secure/stats/streak-calendar',
    'summary': '/secure/stats/summary',
    'placement-test': '/secure/placement/generate',
    'submit-placement-test': '/secure/placement/submit',

    // ===== AI SERVICE =====
    'chat-voice': '/chat',
    'get-score': '/v2/score',
    'tts': '/tts'
};

// Global callback for unauthorized access
let onUnauthorizedCallback = null;

export const registerUnauthorizedHandler = (callback) => {
    onUnauthorizedCallback = callback;
};

// Variable to track if refreshing is in progress
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const addInterceptors = (instance, isAuth = false) => {
    instance.interceptors.request.use(async (config) => {
        if (isAuth) {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    }, (error) => Promise.reject(error));

    instance.interceptors.response.use(
        (response) => {
            // Check for HTML response when JSON was expected (Backend redirect)
            if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
                if (onUnauthorizedCallback) {
                    onUnauthorizedCallback();
                }
            }

            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (error.response) {
                // Handle 401 Unauthorized
                if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
                    
                    const isLoginOrRefresh = originalRequest.url?.includes(endpoints['login']) || 
                                           originalRequest.url?.includes(endpoints['refresh-token']);

                    if (isLoginOrRefresh) {
                        if (onUnauthorizedCallback) onUnauthorizedCallback();
                        return Promise.reject(error);
                    }

                    if (isRefreshing) {
                        return new Promise(function(resolve, reject) {
                            failedQueue.push({ resolve, reject });
                        }).then(token => {
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                            return instance(originalRequest);
                        }).catch(err => {
                            return Promise.reject(err);
                        });
                    }

                    originalRequest._retry = true;
                    isRefreshing = true;

                    try {
                        const refreshToken = await AsyncStorage.getItem("refreshToken");
                        if (!refreshToken) throw new Error("No refresh token");

                        const res = await axios.post(`${IDENTITY_BASE_URL}${endpoints['refresh-token']}`, {
                            token: refreshToken
                        });

                        if (res.data.code === 1000) {
                            const { token, refreshToken: newRefreshToken } = res.data.result;
                            await AsyncStorage.setItem("token", token);
                            await AsyncStorage.setItem("refreshToken", newRefreshToken);

                            processQueue(null, token);
                            
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                            return instance(originalRequest);
                        } else {
                            throw new Error("Refresh failed");
                        }
                    } catch (refreshError) {
                        processQueue(refreshError, null);
                        if (onUnauthorizedCallback) onUnauthorizedCallback();
                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                }
            }
            return Promise.reject(error);
        }
    );
};

// ===== BASE API =====
const Apis = axios.create({ timeout: 15000 });
addInterceptors(Apis);

// ===== IDENTITY API =====
export const IdentityApis = axios.create({
    baseURL: IDENTITY_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});
addInterceptors(IdentityApis);

// ===== LEARNING API =====
export const LearningApis = axios.create({
    baseURL: LEARNING_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});
addInterceptors(LearningApis);

// ===== AI API =====
export const AIApis = axios.create({
    baseURL: AI_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    }
});
addInterceptors(AIApis);

// ===== AUTHENTICATED APIS (Singletons) =====
export const authIdentityApisInstance = axios.create({
    baseURL: IDENTITY_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});
addInterceptors(authIdentityApisInstance, true);

export const authLearningApisInstance = axios.create({
    baseURL: LEARNING_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});
addInterceptors(authLearningApisInstance, true);

// Keep compatibility with existing code that calls these as functions
export const authIdentityApis = () => authIdentityApisInstance;
export const authLearningApis = () => authLearningApisInstance;

export default Apis;

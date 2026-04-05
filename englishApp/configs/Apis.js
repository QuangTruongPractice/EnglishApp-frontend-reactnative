import axios from "axios";

const IDENTITY_BASE_URL = 'http://192.168.1.204:8080/identity/api';
const LEARNING_BASE_URL = 'http://192.168.1.204:8090/learning/api';
const AI_BASE_URL = 'https://satyr-dashing-officially.ngrok-free.app';

export const endpoints = {
    // ===== IDENTITY SERVICE =====
    'login': '/login',
    'register': '/register',
    // 'google-login': '/auth/google-signin',
    'profile': '/secure/profile',
    'reset-password': '/reset-password',
    'verify-otp': '/verified-otp',
    'change-password': '/change-password',

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
    'leader-board': '/leaderboard/weekly',
    'learning-profile': '/secure/profile',
    'streak-calendar': '/secure/stats/streak-calendar',
    'summary': '/secure/stats/summary',

    // ===== CHATBOT SERVICE =====
    'chat-voice': '/chat',

    // ===== SCORING SERVICE =====
    'get-score': '/v2/score',
};

// Create a base Apis instance for global configs
const Apis = axios.create({
    timeout: 15000,
});

// Global callback for unauthorized access
let onUnauthorizedCallback = null;

export const registerUnauthorizedHandler = (callback) => {
    onUnauthorizedCallback = callback;
};

// Helper to add interceptors to any instance
const addInterceptors = (instance) => {
    instance.interceptors.request.use((config) => {
        console.log(`📤 REQUEST: [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`);
        if (config.data) console.log('📦 DATA:', config.data);
        return config;
    });

    instance.interceptors.response.use(
        (response) => {
            console.log(`📥 RESPONSE: [${response.status}] ${response.config.url}`);
            if (response.data) console.log('✅ DATA:', response.data);

            // Check for HTML response when JSON was expected (Backend redirect)
            if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
                console.warn('⚠️ Received HTML instead of JSON. Possible session expiration.');
                if (onUnauthorizedCallback) {
                    onUnauthorizedCallback();
                }
            }

            return response;
        },
        (error) => {
            console.log(`❌ ERROR: ${error.config?.url || 'Unknown URL'}`);
            if (error.response) {
                console.log(`🔴 STATUS: ${error.response.status}`);
                console.log('🔴 DATA:', error.response.data);

                // Handle 401 Unauthorized
                if (error.response.status === 401 || error.response.status === 403) {
                    if (onUnauthorizedCallback) {
                        onUnauthorizedCallback();
                    }
                }
            } else {
                console.log('🌐 NETWORK ERROR:', error.message);
            }
            return Promise.reject(error);
        }
    );
};

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
    timeout: 30000, // Voice processing might take longer
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    }
});
addInterceptors(AIApis);

export const authIdentityApis = (token) => {
    const instance = axios.create({
        baseURL: IDENTITY_BASE_URL,
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        }
    });
    addInterceptors(instance);
    return instance;
};

export const authLearningApis = (token) => {
    const instance = axios.create({
        baseURL: LEARNING_BASE_URL,
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        }
    });
    addInterceptors(instance);
    return instance;
};

// Apply interceptors to the default Apis as well
addInterceptors(Apis);

export default Apis;

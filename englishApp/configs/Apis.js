import axios from "axios";

const IDENTITY_BASE_URL = 'http://192.168.1.204:8081/identity/api/';
const LEARNING_BASE_URL = 'http://192.168.1.204:8082/learning/api/';
const CHATBOT_BASE_URL = 'http://192.168.1.204:8003/api/v1/';
const SCORING_BASE_URL = 'https://satyr-dashing-officially.ngrok-free.app/v2/'

export const endpoints = {
    // ===== IDENTITY SERVICE =====
    'login': '/login',
    'register': '/register',
    'google-login': '/auth/google-signin',
    'profile': '/secure/profile',
    'reset-password': '/reset-password',
    'verify-otp': '/verified-otp',
    'change-password': '/change-password',

    // ===== LEARNING SERVICE =====
    // -- Main Topics --
    'main-topics': '/main-topics',
    'main-topics-detail': (id) => `/main-topics/${id}`,
    'main-topics-recommend': '/secure/learning-path',
    // -- Sub Topics --
    'sub-topics-detail': (id) => `/sub-topics/${id}`,
    // -- Vocabulary --
    'vocabulary-detail': (id) => `/vocabulary/${id}`,
    'save-vocabulary': '/vocabulary/save',
    'toggle-vocabulary-save': (id) => `/vocabulary/${id}/toggle`,
    'daily-vocabulary': '/secure/daily-vocabulary',
    'user-vocabulary-progress': '/secure/learning-progress/vocabulary',
    // -- Video --
    'video': '/videos',
    'video-detail': (id) => `/videos/${id}`,
    'video-progress': (id) => `/secure/video/${id}/update-progress`,
    'user-video-progress': '/secure/learning-progress/video',
    // -- Quiz --
    'do-quiz': (id) => `/secure/quiz/${id}/quiz-progress`,
    'quiz': '/quiz',
    'generate-quiz': '/quiz/generate',
    'submit-quiz': '/secure/quiz/submit',
    'quiz-detail': (id) => `/quiz/${id}`,
    // -- Others --
    'leader-board': '/secure/leader-board',
    'learning-profile': '/secure/profile',

    // ===== CHATBOT SERVICE =====
    'chat-voice': '/chat-voice',

    // ===== SCORING SERVICE =====
    'get-score': '/score',
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
        // console.log('📤 REQUEST:', config.method?.toUpperCase(), config.url);
        // if (config.data) console.log('📦 DATA:', config.data);
        return config;
    });

    instance.interceptors.response.use(
        (response) => {
            // console.log('📥 RESPONSE:', response.config.url);
            
            // Check for HTML response when JSON was expected (Backend redirect)
            if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
                // console.warn('⚠️ Received HTML instead of JSON. Possible session expiration.');
                if (onUnauthorizedCallback) {
                    onUnauthorizedCallback();
                }
            }

            return response;
        },
        (error) => {
            // console.log('❌ ERROR:', error.config?.url);
            if (error.response) {
                // console.log('🔴 STATUS:', error.response.status);
                
                // Handle 401 Unauthorized
                if (error.response.status === 401 || error.response.status === 403) {
                    if (onUnauthorizedCallback) {
                        onUnauthorizedCallback();
                    }
                }
                // console.log('🔴 DATA:', error.response.data);
            } else {
                // console.log('🌐 NETWORK ERROR:', error.message);
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

// ===== CHATBOT API =====
export const ChatbotApis = axios.create({
    baseURL: CHATBOT_BASE_URL,
    timeout: 30000, // Voice processing might take longer
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});
addInterceptors(ChatbotApis);

// ===== SCORING API =====
export const ScoringApis = axios.create({
    baseURL: SCORING_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    }
});
addInterceptors(ScoringApis);

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

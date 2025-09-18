import axios from "axios";

const BASE_URL = 'https://englishapp-go7r.onrender.com/english/api/';

export const endpoints = {
    'main-topics': '/main-topics',
    'main-topics-detail': (id) => `/main-topics/${id}`,
    'sub-topics': '/sub-topics',
    'sub-topics-detail': (id) => `/sub-topics/${id}`,
    'vocabulary': '/vocabulary',
    'vocabulary-detail': (id) => `/vocabulary/${id}`,
    'login': '/login',
    'register': '/register',
    'users': '/users',
    'user-detail': (id) => `/users/${id}`,
    'profile': '/secure/profile',
    'video': '/videos',
    'video-detail': (id) => `/videos/${id}`,
    'video-progress': (id) => `/secure/video/${id}/update-progress`,
    'user-video-progress': '/secure/learning-progress/video',
    'user-vocabulary-progress': '/secure/learning-progress/vocabulary',
    'view-flashcard': (id) => `/secure/vocabulary/${id}/view-flashcard`,
    'practice-pronunciation': (id) => `/secure/vocabulary/${id}/practice-pronunciation`,
    'do-quiz': (id) => `/secure/quiz/${id}/quiz-progress`,
    'quiz': '/quiz',
    'quiz-detail': (id) => `/quiz/${id}`,
    'reset-password': '/reset-password',
    'verify-otp': '/verified-otp',
    'change-password': '/change-password',
    'google-login': '/auth/google-signin',
    'leader-board': '/secure/leader-board',
};

const Apis = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export const authApis = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        }
    });
};

Apis.interceptors.request.use((config) => {
    console.log('📤 REQUEST:', config.method?.toUpperCase(), config.url);
    if (config.data) console.log('📦 DATA:', config.data);
    return config;
});

Apis.interceptors.response.use(
    (response) => {
        console.log('📥 RESPONSE:', response.config.url);
        console.log('✅ DATA:', response.data);
        return response;
    },
    (error) => {
        console.log('❌ ERROR:', error.config?.url);
        if (error.response) {
            console.log('🔴 STATUS:', error.response.status);
            console.log('🔴 DATA:', error.response.data);
        } else {
            console.log('🌐 NETWORK ERROR:', error.message);
        }
        return Promise.reject(error);
    }
);

export default Apis;
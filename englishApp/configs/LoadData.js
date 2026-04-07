import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoints, IdentityApis, LearningApis, authIdentityApis, authLearningApis } from "./Apis";
import { setCache, getCache, CACHE_KEYS } from "../utils/cache";

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const login = async (username, password) => {
  const res = await IdentityApis.post(endpoints["login"], {
    username: username,
    password: password,
  });
  return res.data;
};

export const register = async (formDataToSend) => {
  const res = await IdentityApis.post(endpoints["register"], formDataToSend, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const loadProfile = async () => {
  const token = await getToken();
  const user = await authIdentityApis(token).get(endpoints["profile"]);
  return user.data;
};

export const fetchMainTopicsDetail = async (topicId) => {
  const token = await getToken();
  const response = await authLearningApis(token).get(endpoints["main-topics-detail"](topicId));
  return response.data;
};

export const fetchSubTopicsDetail = async (subTopicId) => {
  const token = await getToken();
  const response = await authLearningApis(token).get(endpoints["sub-topics-detail"](subTopicId));
  return response.data;
};

export const fetchAllMainTopics = async (page, q) => {
  const token = await getToken();
  let url = `${endpoints["main-topics"]}?page=${page}`;
  if (q) url += `&name=${q}`;
  const res = await authLearningApis(token).get(url);
  return res.data;
};

export const fetchAllVideos = async (page, q) => {
  const token = await getToken();
  let url = `${endpoints["video"]}?page=${page}`;
  if (q) url += `&title=${q}`;
  const res = await authLearningApis(token).get(url);
  return res.data;
};

export const updateProfile = async (formData) => {
  const token = await getToken();
  const response = await authIdentityApis(token).put(endpoints["profile"], formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  // Update cache after successful update
  setCache(CACHE_KEYS.USER_PROFILE, response.data);

  return response.data;
};

export const fetchVideoProgress = async ({ pageParam = 1 }) => {
  const token = await getToken();
  const url = pageParam > 1 
    ? `${endpoints["user-video-progress"]}?page=${pageParam}`
    : endpoints["user-video-progress"];
  const videoRes = await authLearningApis(token).get(url);
  return videoRes.data;
};

export const fetchVocabularyProgress = async ({ pageParam = 1 }) => {
  const token = await getToken();
  const url = pageParam > 1 
    ? `${endpoints["user-vocabulary-progress"]}?page=${pageParam}`
    : endpoints["user-vocabulary-progress"];
  const vocabularyRes = await authLearningApis(token).get(url);
  return vocabularyRes.data;
};

export const updateVideoProgress = async (progress, videoId) => {
  const token = await getToken();
  await authLearningApis(token).put(endpoints["video-progress"](videoId), {
    watchedDuration: Math.round(progress.currentTime),
    videoDuration: Math.round(progress.duration),
    lastPosition: Math.round(progress.currentTime),
  });
};

export const fetchVideoDetail = async (videoId) => {
  const token = await getToken();
  const res = await authLearningApis(token).get(endpoints["video-detail"](videoId));
  return res.data;
};

export const fetchVocabularyDetail = async (vocabularyId) => {
  const token = await getToken();
  const response = await authLearningApis(token).get(endpoints["vocabulary-detail"](vocabularyId));
  return response.data;
};

export const doQuiz = async (quizId) => {
  const token = await getToken();
  await authLearningApis(token).put(endpoints["do-quiz"](quizId));
};

export const fetchAllQuiz = async (page) => {
  let url = `${endpoints["quiz"]}?page=${page}`;
  const res = await LearningApis.get(url);
  return res.data;
}

export const fetchQuizDetail = async (quizId) => {
  const res = await LearningApis.get(endpoints["quiz-detail"](quizId));
  return res.data;
}

export const resetPasswordRequest = async (email) => {
  const res = await IdentityApis.post(endpoints["reset-password"], { email });
  return res.data;
}

export const verifyOtpConfirm = async (email, otp) => {
  const res = await IdentityApis.post(endpoints["verify-otp"], { email, otp });
  return res.data;
}

export const changePasswordRequest = async (email, newPassword) => {
  const res = await IdentityApis.post(endpoints["change-password"], {
    email,
    password: newPassword,
  });
  return res.data;
}

export const fetchLeaderBoard = async () => {
  const token = await getToken();
  const res = await authLearningApis(token).get(endpoints["leader-board"]);
  return res.data;
}

export const generateQuiz = async (meanId) => {
  const res = await LearningApis.get(`${endpoints["generate-quiz"]}?meanId=${meanId}`);
  return res.data;
};

export const fetchLearningProfile = async () => {
  try {
    const token = await getToken();
    const res = await authLearningApis(token).get(endpoints["learning-profile"]);
    return res.data;
  } catch (error) {
    // If 404 or other error, assume profile doesn't exist yet
    return null;
  }
};

export const createLearningProfile = async (data) => {
  const token = await getToken();
  const res = await authLearningApis(token).post(endpoints["learning-profile"], data);
  return res.data;
};

export const updateLearningProfile = async (data) => {
  const token = await getToken();
  const res = await authLearningApis(token).put(endpoints["learning-profile"], data);
  return res.data;
};

export const fetchDailyVocabulary = async () => {
  const token = await getToken();
  const res = await authLearningApis(token).get(endpoints["daily-vocabulary"]);
  return res.data;
};

export const submitQuiz = async (meaningId, isCorrect) => {
  const token = await getToken();
  const res = await authLearningApis(token).post(endpoints["submit-quiz"], {
    meaningId,
    isCorrect,
  });
  return res.data;
};

export const toggleVocabularySave = async (vocabularyId) => {
  const token = await getToken();
  const res = await authLearningApis(token).post(endpoints["toggle-vocabulary-save"](vocabularyId));
  return res.data;
};

export const fetchSaveVocabulary = async () => {
  const token = await getToken();
  const res = await authLearningApis(token).get(endpoints["save-vocabulary"]);
  return res.data;
};

export const fetchRecommendedTopics = async () => {
  const token = await getToken();
  const res = await authLearningApis(token).get(endpoints["main-topics-recommend"]);
  return res.data;
};

// ===== SESSION SERVICE =====

export const fetchDailySession = async () => {
  const token = await getToken();
  console.log("🔑 TOKEN:", token ? `${token.substring(0, 30)}...` : "NULL");
  const res = await authLearningApis(token).post(endpoints["session"], null);
  return res.data;
};

export const submitQuizSession = async (sessionId, quizId, isCorrect) => {
  const token = await getToken();
  const url = `${endpoints["submit-quiz-session"](sessionId, quizId)}?isCorrect=${isCorrect}`;
  const res = await authLearningApis(token).post(url, null);
  return res.data;
};

export const submitWritingSession = async (sessionId, promptId, content) => {
  const token = await getToken();
  const res = await authLearningApis(token).post(endpoints["submit-writing-session"](sessionId, promptId), {
    text: content,
  });
  return res.data;
};

export const checkSessionLevelUp = async (sessionId) => {
  const token = await getToken();
  const res = await authLearningApis(token).get(endpoints["check-level-up"](sessionId));
  return res.data;
};

// ===== STATS SERVICE =====

export const fetchSummary = async () => {
  const token = await getToken();
  const res = await authLearningApis(token).get(endpoints["summary"]);
  return res.data;
};

export const fetchStreakCalendar = async (month, year) => {
  const token = await getToken();
  const res = await authLearningApis(token).get(`${endpoints["streak-calendar"]}?month=${month}&year=${year}`);
  return res.data;
};

export const updatePassword = async (oldPassword, newPassword) => {
  const token = await getToken();
  const res = await authIdentityApis(token).post(endpoints["update-password"], {
    oldPassword,
    newPassword,
  });
  return res.data;
};

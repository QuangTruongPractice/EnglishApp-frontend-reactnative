import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoints, IdentityApis, LearningApis, AIApis, authIdentityApis, authLearningApis } from "./Apis";
import { setCache, getCache, CACHE_KEYS } from "../utils/cache";

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem("refreshToken");
};

export const saveTokens = async (token, refreshToken) => {
  await AsyncStorage.setItem("token", token);
  await AsyncStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("refreshToken");
};

export const login = async (username, password) => {
  const res = await IdentityApis.post(endpoints["login"], {
    username: username,
    password: password,
  });
  return res.data;
};

export const googleLogin = async (idToken, email) => {
  const res = await IdentityApis.post(endpoints["google-login"], {
    idToken: idToken,
    email: email,
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
  const userData = user.data?.result || user.data;

  // Sync equipped frame if available
  try {
    const frames = await fetchAvatarFrames();
    if (frames && Array.isArray(frames)) {
      const equipped = frames.find(f => (f.status || '').toLowerCase() === 'equipped');
      if (equipped) {
        userData.equippedFrame = {
          id: equipped.id,
          frameKey: equipped.frameKey,
          name: equipped.name,
          rarity: equipped.rarity,
        };
      }
    }
  } catch (e) {
    // Ignore frame sync error
  }

  // Update user profile cache
  setCache(CACHE_KEYS.USER_PROFILE, userData);
  return userData;
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

export const changePasswordRequest = async (resetToken, newPassword) => {
  const res = await IdentityApis.post(endpoints["change-password"], {
    resetToken,
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

export const submitQuiz = async (meaningId, isCorrect, responseTime = 0) => {
  const token = await getToken();
  const res = await authLearningApis(token).post(endpoints["submit-quiz"], {
    meaningId,
    isCorrect,
    responseTime,
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
  const res = await authLearningApis(token).post(endpoints["session"], null);
  return res.data;
};

export const submitQuizSession = async (sessionId, quizId, isCorrect, responseTime = 0) => {
  const token = await getToken();
  const url = `${endpoints["submit-quiz-session"](sessionId, quizId)}?isCorrect=${isCorrect}&responseTime=${responseTime}`;
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

export const generatePlacementTest = async () => {
  const token = await getToken();
  const res = await authLearningApis(token).get(endpoints["placement-test"]);
  return res.data;
};

export const submitPlacementTest = async (results) => {
  const token = await getToken();
  const res = await authLearningApis(token).post(endpoints["submit-placement-test"], results);
  return res.data;
};

// ===== AI SERVICE =====

export const fetchTTS = async (text) => {
  const response = await AIApis.post(endpoints['tts'], { text: text }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data; // Expected { audio_url: "..." }
};

export const fetchPronunciationScore = async (audioUri, expectedText) => {
  const formData = new FormData();
  formData.append('audio', {
    uri: audioUri,
    name: 'recording.m4a',
    type: 'audio/m4a',
  });
  formData.append('expected_text', expectedText);

  const response = await AIApis.post(endpoints['get-score'], formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const fetchAIChat = async (userId, audioUri = null, reset = false) => {
  const formData = new FormData();
  formData.append('user_id', userId || '');
  
  if (reset) {
    formData.append('reset', 'true');
  }

  if (audioUri) {
    formData.append('audio', {
      uri: audioUri,
      name: 'recording.m4a',
      type: 'audio/m4a'
    });
  }

  const response = await AIApis.post(endpoints['chat-voice'], formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

// =========================================================================
// GAMIFICATION SERVICE (GEMS, AVATAR FRAMES, ACHIEVEMENTS)
// =========================================================================

// =========================================================================
// GAMIFICATION SERVICE (GEMS, AVATAR FRAMES, ACHIEVEMENTS - IDENTITY SERVICE)
// =========================================================================

const GEMS_STORAGE_KEY = 'user_gems_balance';
const FRAMES_STORAGE_KEY = 'user_avatar_frames';
const ACHIEVEMENTS_STORAGE_KEY = 'user_achievements_data';

export const getUserGems = async () => {
  try {
    const token = await getToken();
    if (token) {
      try {
        const res = await authIdentityApis(token).get(endpoints['user-gems']);
        if (res.data?.result !== undefined) {
          const serverGems = Number(res.data.result) || 0;
          await AsyncStorage.setItem(GEMS_STORAGE_KEY, String(serverGems));
          return serverGems;
        }
      } catch (e) {
        // Fallback to local storage
      }
    }
    const saved = await AsyncStorage.getItem(GEMS_STORAGE_KEY);
    return saved !== null ? parseInt(saved, 10) : 0;
  } catch (error) {
    return 0;
  }
};

export const saveUserGems = async (gems) => {
  try {
    const safeGems = Number(gems) || 0;
    await AsyncStorage.setItem(GEMS_STORAGE_KEY, String(safeGems));
    return safeGems;
  } catch (error) {
    return Number(gems) || 0;
  }
};

export const addGems = async (amount) => {
  try {
    const token = await getToken();
    if (token) {
      try {
        const res = await authIdentityApis(token).post(endpoints['reward-gems'], null, {
          params: { amount },
        });
        if (res.data?.result !== undefined) {
          const updated = Number(res.data.result) || 0;
          await AsyncStorage.setItem(GEMS_STORAGE_KEY, String(updated));
          return updated;
        }
      } catch (e) {
        // Fallback to local calculation
      }
    }
    const currentGems = await getUserGems();
    const newGems = currentGems + (Number(amount) || 0);
    await saveUserGems(newGems);
    return newGems;
  } catch (error) {
    console.warn('Error adding gems:', error);
    return 0;
  }
};

export const fetchAvatarFrames = async () => {
  try {
    const token = await getToken();
    if (token) {
      try {
        const res = await authIdentityApis(token).get(endpoints['avatar-frames']);
        if (res.data?.result && Array.isArray(res.data.result) && res.data.result.length > 0) {
          const sorted = res.data.result.slice().sort((a, b) => Number(a.gemCost ?? a.gem_cost ?? 0) - Number(b.gemCost ?? b.gem_cost ?? 0));
          await AsyncStorage.setItem(FRAMES_STORAGE_KEY, JSON.stringify(sorted));
          return sorted;
        }
      } catch (e) {
        // Fallback to local storage
      }
    }
    const saved = await AsyncStorage.getItem(FRAMES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.sort((a, b) => Number(a.gemCost ?? a.gem_cost ?? 0) - Number(b.gemCost ?? b.gem_cost ?? 0));
      }
      return parsed;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const buyAvatarFrame = async (frameKey, frameId) => {
  try {
    const token = await getToken();
    if (token) {
      try {
        await authIdentityApis(token).post(endpoints['buy-frame'](frameKey));
      } catch (e) {
        // Fallback
      }
    }
    // Update local storage
    const saved = await AsyncStorage.getItem(FRAMES_STORAGE_KEY);
    if (saved) {
      const frames = JSON.parse(saved);
      const updated = frames.map((f) => 
        (f.frameKey === frameKey || f.id === frameId) ? { ...f, status: 'unlocked' } : f
      );
      await AsyncStorage.setItem(FRAMES_STORAGE_KEY, JSON.stringify(updated));
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const equipAvatarFrame = async (frameKey, frameId) => {
  try {
    const token = await getToken();
    if (token) {
      try {
        await authIdentityApis(token).post(endpoints['equip-frame'](frameKey));
      } catch (e) {
        // Fallback
      }
    }
    // Update local storage
    const saved = await AsyncStorage.getItem(FRAMES_STORAGE_KEY);
    if (saved) {
      const frames = JSON.parse(saved);
      const updated = frames.map((f) => ({
        ...f,
        status: (f.frameKey === frameKey || f.id === frameId) ? 'equipped' : f.status === 'equipped' ? 'unlocked' : f.status,
      }));
      await AsyncStorage.setItem(FRAMES_STORAGE_KEY, JSON.stringify(updated));
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const unequipAvatarFrame = async () => {
  try {
    const token = await getToken();
    if (token) {
      try {
        await authIdentityApis(token).post(endpoints['unequip-frame']);
      } catch (e) {
        // Fallback
      }
    }
    // Update local storage
    const saved = await AsyncStorage.getItem(FRAMES_STORAGE_KEY);
    if (saved) {
      const frames = JSON.parse(saved);
      const updated = frames.map((f) => ({
        ...f,
        status: f.status === 'equipped' ? 'unlocked' : f.status,
      }));
      await AsyncStorage.setItem(FRAMES_STORAGE_KEY, JSON.stringify(updated));
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const fetchAchievements = async () => {
  try {
    const token = await getToken();
    if (token) {
      try {
        const res = await authIdentityApis(token).get(endpoints['achievements']);
        if (res.data?.result && Array.isArray(res.data.result) && res.data.result.length > 0) {
          await AsyncStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(res.data.result));
          return res.data.result;
        }
      } catch (e) {
        // Fallback to local storage
      }
    }
    const saved = await AsyncStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const claimAchievementReward = async (code, achievementId) => {
  try {
    const token = await getToken();
    if (token) {
      try {
        await authIdentityApis(token).post(endpoints['claim-achievement'](code));
      } catch (e) {
        // Fallback
      }
    }
    // Update local storage
    const saved = await AsyncStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    if (saved) {
      const achievements = JSON.parse(saved);
      const updated = achievements.map((a) => 
        (a.code === code || a.id === achievementId) ? { ...a, status: 'claimed' } : a
      );
      await AsyncStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(updated));
    }
    return true;
  } catch (error) {
    return false;
  }
};


import AsyncStorage from "@react-native-async-storage/async-storage";
import Apis, { authApis, endpoints } from "./Apis";

export const login = async (username, password) => {
  const res = await Apis.post(endpoints["login"], {
    username: username,
    password: password,
  });
  return res.data;
};

export const register = async (formDataToSend) => {
  const res = await Apis.post(endpoints["register"], formDataToSend, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const loadProfile = async () => {
  const token = await AsyncStorage.getItem("token");
  const user = await authApis(token).get(endpoints["profile"]);
  return user.data;
};

export const fetchMainTopicsDetail = async (topicId) => {
  const response = await Apis.get(endpoints["main-topics-detail"](topicId));
  return response.data;
};

export const fetchSubTopicsDetail = async (subTopicId) => {
  const response = await Apis.get(endpoints["sub-topics-detail"](subTopicId));
  return response.data;
};

export const fetchAllMainTopics = async (page, q) => {
  let url = `${endpoints["main-topics"]}?page=${page}`;
  if (q) url += `&name=${q}`;
  const res = await Apis.get(url);
  return res.data;
};

export const fetchAllVideos = async (page, q) => {
  let url = `${endpoints["video"]}?page=${page}`;
  if (q) url += `&title=${q}`;
  const res = await Apis.get(url);
  return res.data;
};

export const updateProfile = async (formData) => {
  const token = await AsyncStorage.getItem("token");
  const response = await authApis(token).put(endpoints["profile"], formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const fetchVideoProgress = async () => {
  const token = await AsyncStorage.getItem("token");
  const videoRes = await authApis(token).get(endpoints["user-video-progress"]);
  return videoRes.data;
};

export const fetchVocabularyProgress = async () => {
  const token = await AsyncStorage.getItem("token");
  const vocabularyRes = await authApis(token).get(
    endpoints["user-vocabulary-progress"]
  );
  return vocabularyRes.data;
};

export const updateVideoProgress = async (progress, videoId) => {
  const token = await AsyncStorage.getItem("token");
  await authApis(token).put(endpoints["video-progress"](videoId), {
    watchedDuration: Math.round(progress.currentTime),
    videoDuration: Math.round(progress.duration),
    lastPosition: Math.round(progress.currentTime),
  });
};

export const fetchVideoDetail = async (videoId) => {
  const res = await Apis.get(endpoints["video-detail"](videoId));
  return res.data;
};

export const fetchVocabularyDetail = async (vocabularyId) => {
  const response = await Apis.get(endpoints["vocabulary-detail"](vocabularyId));
  return response.data;
};

export const viewFlashcard = async (vocabularyId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.info("API URL:", endpoints["view-flashcard"](vocabularyId));
    await authApis(token).put(endpoints["view-flashcard"](vocabularyId));
    console.info("success");
  } catch (error) {
    console.error("Error calling viewFlashcard:", error);
  }
};

export const practicePronunciation = async (vocabularyId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    await authApis(token).put(endpoints["practice-pronunciation"](vocabularyId));
    console.info("success");
  } catch (error) {
    console.error("Error calling practicePronunciation:", error);
  }
};

export const fetchAllQuiz = async (page) => {
  let url = `${endpoints["quiz"]}?page=${page}`;
  const res = await Apis.get(url);
  return res.data;
}

export const fetchQuizDetail = async (quizId) => {
  const res = await Apis.get(endpoints["quiz-detail"](quizId));
  return res.data;
}

export const resetPasswordRequest = async (email) => {
  const res = await Apis.post(endpoints["reset-password"], { email });
  return res.data;
}

export const verifyOtpConfirm = async (email, otp) => {
  const res = await Apis.post(endpoints["verify-otp"], { email, otp });
  return res.data;
}

export const changePasswordRequest = async (email, newPassword) => {
  const res = await Apis.post(endpoints["change-password"], {
    email,
    password: newPassword,
  });
  return res.data;
}
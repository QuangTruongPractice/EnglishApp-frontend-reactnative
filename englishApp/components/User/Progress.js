import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ProgressScreen from "../Screen/ProgressScreen";
import { fetchVideoProgress, fetchVocabularyProgress } from "../../configs/LoadData";

const Progress = () => {
  const [videoProgress, setVideoProgress] = useState(null);
  const [vocabularyProgress, setVocabularyProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("video");
  const nav = useNavigation();

  const loadProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      const videoRes = await fetchVideoProgress();
      const vocabularyRes = await fetchVocabularyProgress();
      setVideoProgress(videoRes.result);
      setVocabularyProgress(vocabularyRes.result);
    } catch (ex) {
      console.error(ex);
      setError("Không thể tải tiến độ học tập. Vui lòng thử lại.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadProgress();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  };

  const handleVideoPress = (videoUrl) => {
    console.log("Open video:", videoUrl);
  };

  const handleAudioPress = (audioUrl) => {
    console.log("Play audio:", audioUrl);
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const completedVideos =
    videoProgress?.filter((item) => item.isCompleted).length || 0;
  const totalVideos = videoProgress?.length || 0;
  const completedVocabulary =
    vocabularyProgress?.filter((item) => item.status === "COMPLETED").length ||
    0;
  const totalVocabulary = vocabularyProgress?.length || 0;

  return (
    <ProgressScreen
      videoProgress={videoProgress}
      vocabularyProgress={vocabularyProgress}
      loading={loading}
      error={error}
      refreshing={refreshing}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onRefresh={onRefresh}
      formatDate={formatDate}
      formatDuration={formatDuration}
      handleVideoPress={handleVideoPress}
      handleAudioPress={handleAudioPress}
      completedVideos={completedVideos}
      totalVideos={totalVideos}
      completedVocabulary={completedVocabulary}
      totalVocabulary={totalVocabulary}
      nav={nav}
      retry={loadProgress}
    />
  );
};

export default Progress;
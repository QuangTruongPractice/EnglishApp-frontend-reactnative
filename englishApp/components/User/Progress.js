import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ProgressScreen from "../Screen/ProgressScreen";
import {
  fetchVideoProgress,
  fetchVocabularyProgress,
  fetchStreakCalendar,
  fetchSummary,
  loadProfile,
} from "../../configs/LoadData";

const Progress = () => {
  const [videoProgress, setVideoProgress] = useState(null);
  const [vocabularyProgress, setVocabularyProgress] = useState(null);
  const [streakCalendar, setStreakCalendar] = useState(null);
  const [summary, setSummary] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeVocaStatus, setActiveVocaStatus] = useState("ALL");
  const nav = useNavigation();

  // Calendar month/year state
  const now = new Date();
  const [calendarMonth, setCalendarMonth] = useState(now.getMonth() + 1);
  const [calendarYear, setCalendarYear] = useState(now.getFullYear());

  const loadProgress = async () => {
    try {
      setLoading(true);
      setError(null);

      const [videoRes, vocabularyRes, summaryRes, profileRes] =
        await Promise.all([
          fetchVideoProgress(),
          fetchVocabularyProgress(),
          fetchSummary(),
          loadProfile(),
        ]);

      setVideoProgress(videoRes.result);
      setVocabularyProgress(vocabularyRes.result);
      setSummary(summaryRes.result || summaryRes);
      setUserProfile(profileRes);

      // Fetch streak calendar for current month
      const streakRes = await fetchStreakCalendar(calendarMonth, calendarYear);
      setStreakCalendar(streakRes.result || streakRes);
    } catch (ex) {
      setError("Không thể tải tiến độ học tập. Vui lòng thử lại.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadStreakCalendar = async (month, year) => {
    try {
      const streakRes = await fetchStreakCalendar(month, year);
      setStreakCalendar(streakRes.result || streakRes);
    } catch (ex) {
      // Silently fail for calendar navigation
    }
  };

  const goToPrevMonth = () => {
    let newMonth = calendarMonth - 1;
    let newYear = calendarYear;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    setCalendarMonth(newMonth);
    setCalendarYear(newYear);
    loadStreakCalendar(newMonth, newYear);
  };

  const goToNextMonth = () => {
    let newMonth = calendarMonth + 1;
    let newYear = calendarYear;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    setCalendarMonth(newMonth);
    setCalendarYear(newYear);
    loadStreakCalendar(newMonth, newYear);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadProgress();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    loadProgress();
  }, []);

  // Vocabulary counts
  const vocaCounts = {
    ALL: vocabularyProgress?.length || 0,
    LEARNING:
      vocabularyProgress?.filter((v) => v.status === "LEARNING").length || 0,
    REVIEWING:
      vocabularyProgress?.filter((v) => v.status === "REVIEWING").length || 0,
    MASTERED:
      vocabularyProgress?.filter((v) => v.status === "MASTERED").length || 0,
  };

  const filteredVocabulary =
    vocabularyProgress?.filter((item) => {
      if (activeVocaStatus === "ALL") return true;
      return item.status === activeVocaStatus;
    }) || [];

  return (
    <ProgressScreen
      videoProgress={videoProgress}
      vocabularyProgress={filteredVocabulary}
      vocaCounts={vocaCounts}
      activeVocaStatus={activeVocaStatus}
      setActiveVocaStatus={setActiveVocaStatus}
      streakCalendar={streakCalendar}
      summary={summary}
      userProfile={userProfile}
      calendarMonth={calendarMonth}
      calendarYear={calendarYear}
      goToPrevMonth={goToPrevMonth}
      goToNextMonth={goToNextMonth}
      loading={loading}
      error={error}
      refreshing={refreshing}
      onRefresh={onRefresh}
      formatDate={formatDate}
      formatDuration={formatDuration}
      nav={nav}
      retry={loadProgress}
    />
  );
};

export default Progress;
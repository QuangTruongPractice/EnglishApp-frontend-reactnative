import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ProgressScreen from "../Screen/ProgressScreen";
import {
  fetchVideoProgress,
  fetchVocabularyProgress,
  fetchStreakCalendar,
  fetchSummary,
  loadProfile,
} from "../../configs/LoadData";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

const Progress = () => {
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeVocaStatus, setActiveVocaStatus] = useState("ALL");
  const nav = useNavigation();

  // Calendar month/year state
  const now = new Date();
  const [calendarMonth, setCalendarMonth] = useState(now.getMonth() + 1);
  const [calendarYear, setCalendarYear] = useState(now.getFullYear());

  const {
    data: videoRes,
    isLoading: videoLoading,
    refetch: refetchVideo,
    fetchNextPage: fetchNextVideoPage,
    hasNextPage: hasNextVideoPage,
    isFetchingNextPage: isFetchingNextVideoPage,
  } = useInfiniteQuery({
    queryKey: ['videoProgress'],
    queryFn: fetchVideoProgress,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.result?.last === false) {
        return allPages.length + 1;
      }
      return undefined;
    }
  });

  const {
    data: vocaRes,
    isLoading: vocaLoading,
    refetch: refetchVoca,
    fetchNextPage: fetchNextVocaPage,
    hasNextPage: hasNextVocaPage,
    isFetchingNextPage: isFetchingNextVocaPage,
  } = useInfiniteQuery({
    queryKey: ['vocabularyProgress'],
    queryFn: fetchVocabularyProgress,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.result?.last === false) {
        return allPages.length + 1;
      }
      return undefined;
    }
  });

  const { data: summaryRes, isLoading: summaryLoading, refetch: refetchSummary } = useQuery({ queryKey: ['summary'], queryFn: fetchSummary });
  const { data: profileRes, isLoading: profileLoading, refetch: refetchProfile } = useQuery({ queryKey: ['profile'], queryFn: loadProfile });
  const { data: streakRes, isLoading: streakLoading, refetch: refetchStreak } = useQuery({
    queryKey: ['streakCalendar', calendarMonth, calendarYear],
    queryFn: () => fetchStreakCalendar(calendarMonth, calendarYear)
  });

  const loading = videoLoading || vocaLoading || summaryLoading || profileLoading || streakLoading;

  const videoProgress = videoRes?.pages.flatMap(page => page.result?.content || []) || [];
  const vocabularyProgress = vocaRes?.pages.flatMap(page => page.result?.content || []) || [];
  const summary = summaryRes?.result || summaryRes;
  const userProfile = profileRes;
  const streakCalendar = streakRes?.result || streakRes;

  const goToPrevMonth = () => {
    let newMonth = calendarMonth - 1;
    let newYear = calendarYear;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    setCalendarMonth(newMonth);
    setCalendarYear(newYear);
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
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refetchVideo(),
      refetchVoca(),
      refetchSummary(),
      refetchProfile(),
      refetchStreak()
    ]);
    setRefreshing(false);
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



  // Vocabulary counts
  const totalVocaElements = vocaRes?.pages[0]?.result?.totalElements || 0;
  const vocaCounts = {
    ALL: totalVocaElements || vocabularyProgress?.length || 0,
    NOT_STARTED: vocabularyProgress?.filter((v) => v.status === "NOT_STARTED").length || 0,
    LEARNING: vocabularyProgress?.filter((v) => v.status === "LEARNING").length || 0,
    MASTERED: vocabularyProgress?.filter((v) => v.status === "MASTERED").length || 0,
  };

  const loadMoreVideo = () => {
    if (hasNextVideoPage && !isFetchingNextVideoPage) {
      fetchNextVideoPage();
    }
  };

  const loadMoreVoca = () => {
    if (hasNextVocaPage && !isFetchingNextVocaPage) {
      fetchNextVocaPage();
    }
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
      retry={onRefresh}
      loadMoreVideo={loadMoreVideo}
      loadMoreVoca={loadMoreVoca}
      isFetchingNextVideoPage={isFetchingNextVideoPage}
      isFetchingNextVocaPage={isFetchingNextVocaPage}
    />
  );
};

export default Progress;
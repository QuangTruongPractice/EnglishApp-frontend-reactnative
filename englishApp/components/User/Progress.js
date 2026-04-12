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

  const [vocaPage, setVocaPage] = useState(1);

  const {
    data: vocaRes,
    isLoading: vocaLoading,
    refetch: refetchVoca,
    isFetching: isFetchingVoca,
  } = useQuery({
    queryKey: ['vocabularyProgress', vocaPage],
    queryFn: () => fetchVocabularyProgress({ pageParam: vocaPage }),
  });

  const { data: summaryRes, isLoading: summaryLoading, refetch: refetchSummary } = useQuery({ queryKey: ['summary'], queryFn: fetchSummary });
  const { data: profileRes, isLoading: profileLoading, refetch: refetchProfile } = useQuery({ queryKey: ['profile'], queryFn: loadProfile });
  const { data: streakRes, isLoading: streakLoading, refetch: refetchStreak } = useQuery({
    queryKey: ['streakCalendar', calendarMonth, calendarYear],
    queryFn: () => fetchStreakCalendar(calendarMonth, calendarYear)
  });

  const loading = videoLoading || vocaLoading || summaryLoading || profileLoading || streakLoading;

  const videoProgress = videoRes?.pages.flatMap(page => page.result?.content || []) || [];
  const vocabularyProgress = vocaRes?.result?.content || [];
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



  const totalVocaElements = vocaRes?.result?.totalElements || 0;
  const vocaTotalPages = vocaRes?.result?.totalPages || 1;

  const loadMoreVideo = () => {
    if (hasNextVideoPage && !isFetchingNextVideoPage) {
      fetchNextVideoPage();
    }
  };

  return (
    <ProgressScreen
      videoProgress={videoProgress}
      vocabularyProgress={vocabularyProgress}
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
      isFetchingNextVideoPage={isFetchingNextVideoPage}
      isFetchingVoca={isFetchingVoca}
      vocaPage={vocaPage}
      vocaTotalPages={vocaTotalPages}
      setVocaPage={setVocaPage}
    />
  );
};

export default Progress;
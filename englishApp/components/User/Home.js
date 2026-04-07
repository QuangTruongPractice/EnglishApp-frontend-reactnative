import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import HomeScreen from "../Screen/HomeScreen";
import { fetchAllMainTopics, fetchRecommendedTopics, loadProfile, fetchSummary } from "../../configs/LoadData";

const Home = () => {
  const [q, setQ] = useState("");
  const nav = useNavigation();

  // 1. Data queries
  const { data: userProfile } = useQuery({ queryKey: ['profile'], queryFn: loadProfile });
  const { data: summaryData, refetch: refetchSummary } = useQuery({ queryKey: ['summary'], queryFn: fetchSummary });

  // 2. Recommended Topics (Tắt nếu đang search)
  const { data: recommendedData, refetch: refetchRecommended } = useQuery({
    queryKey: ['recommendedTopics'],
    queryFn: fetchRecommendedTopics,
    enabled: !q
  });

  // 3. Main Topics (Infinite Scroll)
  const {
    data: mainTopicsData,
    fetchNextPage,
    hasNextPage,
    isLoading: isMainLoading,
    isRefetching: isMainRefetching,
    error: mainError,
    refetch: refetchMain
  } = useInfiniteQuery({
    queryKey: ['mainTopics', q],
    queryFn: ({ pageParam = 1 }) => fetchAllMainTopics(pageParam, q),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.result?.last === false) {
         return allPages.length + 1;
      }
      return undefined;
    }
  });

  const onRefresh = async () => {
    refetchSummary();
    refetchRecommended();
    refetchMain();
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const search = (value, callback) => {
    setQ(value);
    callback(value);
  };

  // Flatten the pages into a single array
  let mainTopics = mainTopicsData?.pages.flatMap(page => page.result?.content || []) || [];
  
  // Lọc bỏ recommended khỏi mainTopics
  const recommendedTopics = (!q ? recommendedData?.result?.content || (Array.isArray(recommendedData?.result) ? recommendedData.result : []) : []);
  if (recommendedTopics.length > 0) {
    const recommendedIds = recommendedTopics.map(t => t.id);
    mainTopics = mainTopics.filter(t => !recommendedIds.includes(t.id));
  }

  const summary = summaryData?.result || summaryData || {
    totalXP: 0, streak: 0, learningCount: 0, masteredCount: 0, savedVocabularyCount: 0,
  };

  return (
    <HomeScreen
      mainTopics={mainTopics}
      recommendedTopics={recommendedTopics}
      userProfile={userProfile}
      summary={summary}
      q={q}
      setQ={setQ}
      search={search}
      loadMore={loadMore}
      refreshing={isMainRefetching}
      onRefresh={onRefresh}
      loading={isMainLoading}
      page={hasNextPage ? 1 : 0} // Support UI cho load more
      nav={nav}
      error={mainError ? "Failed to load topics" : null}
      retry={onRefresh}
    />
  );
};

export default Home;

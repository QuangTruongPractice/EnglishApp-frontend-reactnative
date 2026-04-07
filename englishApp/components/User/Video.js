import { useState } from "react";
import VideoScreen from "../Screen/VideoScreen";
import { fetchAllVideos, loadProfile, fetchSummary } from "../../configs/LoadData";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

const Video = () => {
  const [q, setQ] = useState("");

  const { data: userProfile } = useQuery({ queryKey: ['profile'], queryFn: loadProfile });
  const { data: summaryData, refetch: refetchSummary } = useQuery({ queryKey: ['summary'], queryFn: fetchSummary });

  const {
    data: videoData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isRefetching,
    error: fetchError,
    refetch: refetchVideos
  } = useInfiniteQuery({
    queryKey: ['videos', q],
    queryFn: ({ pageParam = 1 }) => fetchAllVideos(pageParam, q),
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
    refetchVideos();
  };

  const loadMore = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const search = (value) => {
    setQ(value);
  };

  const videos = videoData?.pages.flatMap(page => page.result?.content || []) || [];
  const summary = summaryData?.result || summaryData;

  return (
    <VideoScreen
      userProfile={userProfile}
      summary={summary}
      videos={videos}
      loading={isLoading}
      error={fetchError ? "Failed to load videos. Please try again." : null}
      q={q}
      refreshing={isRefetching}
      onRefresh={onRefresh}
      onRetry={onRefresh}
      onSearch={search}
      onLoadMore={loadMore}
    />
  );
};

export default Video;

import { useState, useEffect } from "react";
import VideoScreen from "../Screen/VideoScreen";
import { fetchAllVideos, loadProfile, fetchSummary } from "../../configs/LoadData";
import Toast from "react-native-toast-message";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [summary, setSummary] = useState(null);

  const loadVideos = async () => {
    if (page <= 0) return;

    const isFirstPage = page === 1;
    if (isFirstPage) setLoading(true);

    try {
      const res = await fetchAllVideos(page, q);
      const newData = res.result.content;

      if (isFirstPage) {
        setVideos(newData);
      } else {
        setVideos((prevVideos) => [...prevVideos, ...newData]);
      }

      if (res.result.last === true) {
        setPage(0);
      }
    } catch (ex) {
      setError("Failed to load videos. Please try again.");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setError(null);
    try {
      const profileData = await loadProfile();
      setUserProfile(profileData);
      const summaryData = await fetchSummary();
      setSummary(summaryData.result || summaryData);
    } catch (err) {
      // Lỗi tải dữ liệu người dùng, bỏ qua
    }
    loadVideos();
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const profileData = await loadProfile();
        setUserProfile(profileData);
        const summaryData = await fetchSummary();
        setSummary(summaryData.result || summaryData);
      } catch (err) {
      // Lỗi tải dữ liệu người dùng, bỏ qua
    }
    };
    loadUserData();
    loadVideos();
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      loadVideos();
    }, 500);

    return () => clearTimeout(timer);
  }, [q, page]);

  const loadMore = () => {
    if (!loading && page > 0) setPage(page + 1);
  };

  const search = (value) => {
    setPage(1);
    setVideos([]);
    setQ(value);
  };

  return (
    <VideoScreen
      userProfile={userProfile}
      summary={summary}
      videos={videos}
      loading={loading}
      error={error}
      q={q}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onRetry={loadVideos}
      onSearch={search}
      onLoadMore={loadMore}
    />
  );
};

export default Video;

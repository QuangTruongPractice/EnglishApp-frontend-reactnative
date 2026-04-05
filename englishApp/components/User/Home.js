import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../Screen/HomeScreen";
import { fetchAllMainTopics, fetchRecommendedTopics, loadProfile, fetchSummary, fetchStreakCalendar } from "../../configs/LoadData";
import { getCache, removeCache, CACHE_KEYS } from "../../utils/cache";
import Toast from "react-native-toast-message";

const Home = () => {
  const [mainTopics, setMainTopics] = useState([]);
  const [recommendedTopics, setRecommendedTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [summary, setSummary] = useState({
    totalXP: 0,
    streak: 0,
    learningCount: 0,
    masteredCount: 0,
    savedVocabularyCount: 0,
  });
  const [streakCalendar, setStreakCalendar] = useState(null);
  const nav = useNavigation();

  // Load cached data immediately on mount
  useEffect(() => {
    const loadFromCache = async () => {
      try {
        const cachedRecommended = await getCache(CACHE_KEYS.RECOMMENDED_TOPICS);
        const cachedMain = await getCache(CACHE_KEYS.MAIN_TOPICS);

        if (cachedRecommended) {
          const recData = cachedRecommended.result?.content || (Array.isArray(cachedRecommended.result) ? cachedRecommended.result : []);
          setRecommendedTopics(recData);
        }

        if (cachedMain) {
          const mainData = cachedMain.result?.content || [];
          // Filter cached main topics by cached recommended
          const recommendedIds = (cachedRecommended?.result?.content || (Array.isArray(cachedRecommended?.result) ? cachedRecommended.result : [])).map(t => t.id);
          const filteredMain = mainData.filter(t => !recommendedIds.includes(t.id));
          
          setMainTopics(filteredMain);
          setLoading(false); // Hide loading since we have cached data
        }
      } catch (err) {
        // Lỗi đọc cache, bỏ qua và tải từ server
      }
    };

    const loadUserData = async () => {
      try {
        const profileData = await loadProfile();
        setUserProfile(profileData);
        
        const summaryData = await fetchSummary();
        setSummary(summaryData.result || summaryData);

        const now = new Date();
        const streakData = await fetchStreakCalendar(now.getMonth() + 1, now.getFullYear());
        setStreakCalendar(streakData.result || streakData);
      } catch (err) {
        Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể tải dữ liệu người dùng.' });
      }
    };

    loadFromCache();
    loadUserData();
    loadMainTopics(); // Also trigger background refresh
  }, []);

  const loadMainTopics = async (isRefreshing = false) => {
    const currentPage = isRefreshing ? 1 : page;
    
    if (currentPage <= 0) return;
    const isFirstPage = currentPage === 1;
    
    // Only show full loading if we don't have data and it's not a refresh
    if (isFirstPage && mainTopics.length === 0 && !isRefreshing) {
      setLoading(true);
    }

    try {
      let currentRecommendations = recommendedTopics;

      // Fetch recommendations only on first page/refresh
      if (isFirstPage && !q) {
        try {
          const recRes = await fetchRecommendedTopics();
          const recData = recRes.result?.content || (Array.isArray(recRes.result) ? recRes.result : []);
          setRecommendedTopics(recData);
          currentRecommendations = recData;
        } catch (err) {
          // Lỗi tải gợi ý, bỏ qua và tiếp tục tải danh sách chính
        }
      }

      const res = await fetchAllMainTopics(currentPage, q);
      let newData = res.result?.content || [];

      // Filter out topics already in recommended list
      if (currentRecommendations.length > 0) {
        const recommendedIds = currentRecommendations.map(t => t.id);
        newData = newData.filter(t => !recommendedIds.includes(t.id));
      }

      if (isFirstPage) {
        setMainTopics(newData);
      } else {
        setMainTopics((prev) => [...prev, ...newData]);
      }

      if (res.result?.last === true) setPage(0);
      setError(null);
    } catch (ex) {
      // Only set error if we don't have any data to show
      if (mainTopics.length === 0) {
        setError("Failed to load topics. Please try again.");
      }
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
      // Explicitly clear cache keys on Pull-to-Refresh as requested
      await removeCache(CACHE_KEYS.MAIN_TOPICS);
      await removeCache(CACHE_KEYS.RECOMMENDED_TOPICS);
    } catch (e) {
      // Lỗi xóa cache khi refresh, bỏ qua
    }

    // Refresh user data too
    try {
      const profileData = await loadProfile();
      setUserProfile(profileData);
      
      const summaryData = await fetchSummary();
      setSummary(summaryData.result || summaryData);
    } catch (err) {
      // Lỗi refresh dữ liệu người dùng, bỏ qua
    }

    loadMainTopics(true);
  };

  useEffect(() => {
    // Skip the very first mount call since it's handled in the cache useEffect
    if (page > 1 || q !== "") {
      const timer = setTimeout(() => {
        if (q) setRecommendedTopics([]);
        loadMainTopics();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [q, page]);

  const loadMore = () => {
    if (!loading && page > 0) setPage(page + 1);
  };

  const search = (value, callback) => {
    setPage(1);
    setMainTopics([]);
    callback(value);
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
      refreshing={refreshing}
      onRefresh={onRefresh}
      loading={loading}
      page={page}
      nav={nav}
      error={error}
      retry={() => {
        setPage(1);
        loadMainTopics();
      }}
    />
  );
};

export default Home;

import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../Screen/HomeScreen";
import { fetchAllMainTopics } from "../../configs/LoadData";

const Home = () => {
  const [mainTopics, setMainTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const nav = useNavigation();

  const loadMainTopics = async () => {
    if (page <= 0) return;
    const isFirstPage = page === 1;
    if (isFirstPage) setLoading(true);

    try {
      const res = await fetchAllMainTopics(page, q);
      const newData = res.result.content;

      if (isFirstPage) {
        setMainTopics(newData);
      } else {
        setMainTopics((prev) => [...prev, ...newData]);
      }

      if (res.result.last === true) setPage(0);
    } catch (ex) {
      console.error(ex);
      setError("Failed to load topics. Please try again.");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setError(null);
    loadMainTopics();
  };

  useEffect(() => {
    loadMainTopics();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMainTopics();
    }, 500);
    return () => clearTimeout(timer);
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
      retry={loadMainTopics}
    />
  );
};

export default Home;

import { useEffect, useState } from "react";
import { fetchAllQuiz } from "../../configs/LoadData";
import QuizScreen from "../Screen/QuizScreen";

const Quiz = () => {
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("audio");
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const loadQuiz = async () => {
    if (page <= 0) return;
    const isFirstPage = page === 1;
    if (isFirstPage) setLoading(true);

    try {
      const res = await fetchAllQuiz(page);
      const newData = res.result.content;

      if (isFirstPage) {
        setQuizList(newData);
      } else {
        setQuizList((prev) => [...prev, ...newData]);
      }

      if (res.result.last) {
        setPage(0); // hết trang
      }
    } catch (ex) {
      console.error(ex);
      setError("Failed to load quiz. Please try again.");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setError(null);
    loadQuiz();
  };

  useEffect(() => {
    loadQuiz();
  }, [page]);

  const loadMore = () => {
    if (!loading && page > 0) setPage((prev) => prev + 1);
  };

  const audioQuizzes = quizList.filter((quiz) => quiz.type === "AUDIO");
  const textQuizzes = quizList.filter((quiz) => quiz.type === "TEXT");
  const currentQuizzes = activeTab === "audio" ? audioQuizzes : textQuizzes;

  // 🔹 Trả về QuizScreen và truyền props
  return (
    <QuizScreen
      currentQuizzes={currentQuizzes}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      loading={loading}
      error={error}
      refreshing={refreshing}
      onRefresh={onRefresh}
      loadMore={loadMore}
    />
  );
};

export default Quiz;

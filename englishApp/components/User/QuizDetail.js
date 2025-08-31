import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Audio } from "expo-av";
import { fetchQuizDetail } from "../../configs/LoadData";
import QuizDetailScreen from "../Screen/QuizDetailScreen";

const QuizDetail = ({ route, navigation }) => {
  const { quizId } = route.params;
  const [quizDetail, setQuizDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const loadQuizDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchQuizDetail(quizId);
      setQuizDetail(res.result);
    } catch (ex) {
      console.error(ex);
      setError("Không thể tải chi tiết bài quiz. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const loadSound = async () => {
    try {
      let url = quizDetail.text;
      const { sound } = await Audio.Sound.createAsync({ uri: url });
      setSound(sound);
      setIsPlaying(true);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) setIsPlaying(false);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleAnswerSelect = (answerId) => {
    if (showResult) return;
    setSelectedAnswer(answerId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      Alert.alert("Thông báo", "Vui lòng chọn một đáp án trước khi tiếp tục.");
      return;
    }

    const selectedAnswerObj = quizDetail.answers.find(
      (a) => a.id === selectedAnswer
    );
    setShowResult(true);

    if (selectedAnswerObj?.isCorrect) {
      setSnackbarMessage("🎉 Chính xác! Bạn đã chọn đúng đáp án.");
    } else {
      setSnackbarMessage("❌ Sai rồi! Hãy xem đáp án đúng được đánh dấu.");
    }
    setShowSnackbar(true);
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsPlaying(false);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    loadQuizDetail();
  }, [quizId]);

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  return (
    <QuizDetailScreen
      quizDetail={quizDetail}
      loading={loading}
      error={error}
      selectedAnswer={selectedAnswer}
      showResult={showResult}
      isPlaying={isPlaying}
      showSnackbar={showSnackbar}
      snackbarMessage={snackbarMessage}
      onReload={loadQuizDetail}
      onAnswerSelect={handleAnswerSelect}
      onSubmitAnswer={handleSubmitAnswer}
      onTryAgain={handleTryAgain}
      onGoBack={handleGoBack}
      onDismissSnackbar={() => setShowSnackbar(false)}
      loadSound={loadSound}
    />
  );
};

export default QuizDetail;

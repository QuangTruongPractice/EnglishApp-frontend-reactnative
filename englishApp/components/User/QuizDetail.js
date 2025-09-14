import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Audio } from "expo-av";
import { fetchQuizDetail, doQuiz } from "../../configs/LoadData";
import QuizDetailScreen from "../Screen/QuizDetailScreen";
import { useNavigation } from "@react-navigation/native";

const QuizDetail = ({ route, navigation }) => {
  const { quizId } = route.params;
  const [quizDetail, setQuizDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [sound, setSound] = useState();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const nav = useNavigation();

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
      await sound.playAsync();
    } catch (e) {
      console.error(e);
    }
  };

  const loadSoundCorrect = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: "https://www.myinstants.com/media/sounds/duolingo-correct.mp3",
      });
      setSound(sound);
      await sound.playAsync();
    } catch (e) {
      console.error(e);
    }
  };

  const loadSoundWrong = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: "https://www.myinstants.com/media/sounds/duolingo-wrong.mp3",
      });
      setSound(sound);
      await sound.playAsync();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAnswerSelect = (answerId) => {
    if (showResult) return;
    setSelectedAnswer(answerId);
  };

  const handleSubmitAnswer = async () => {
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
      loadSoundCorrect();
    } else {
      setSnackbarMessage("❌ Sai rồi! Hãy xem đáp án đúng được đánh dấu.");
      loadSoundWrong();
    }
    setShowSnackbar(true);
    await doQuiz(quizId);
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  const getCorrectAnswerId = () => {
    if (!quizDetail?.answers) return null;
    const correctAnswer = quizDetail.answers.find(answer => answer.isCorrect);
    return correctAnswer?.id || null;
  };

  const checkIsAnswerCorrect = () => {
    if (!selectedAnswer || !quizDetail?.answers) return false;
    const selectedAnswerObj = quizDetail.answers.find(a => a.id === selectedAnswer);
    return selectedAnswerObj?.isCorrect || false;
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
      showSnackbar={showSnackbar}
      snackbarMessage={snackbarMessage}
      correctAnswerId={getCorrectAnswerId()}
      isAnswerCorrect={checkIsAnswerCorrect()}
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
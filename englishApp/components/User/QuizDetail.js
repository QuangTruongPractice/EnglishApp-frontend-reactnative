import { useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";
import { Audio } from "expo-av";
import { fetchQuizDetail, doQuiz } from "../../configs/LoadData";
import QuizDetailScreen from "../Screen/QuizDetailScreen";
import Toast from "react-native-toast-message";

const QuizDetail = ({ route, navigation }) => {
  const { quizId } = route.params;
  const [quizDetail, setQuizDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [sound, setSound] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // States for specific types
  const [fillValue, setFillValue] = useState(null);
  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);
  const [matches, setMatches] = useState([]); // {leftId, rightId}

  const loadQuizDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchQuizDetail(quizId);
      if (res.code === 1000) {
        setQuizDetail(res.result);
        // Reset states for new quiz
        setSelectedAnswer(null);
        setShowResult(false);
        setFillValue(null);
        setLeftSelected(null);
        setRightSelected(null);
        setMatches([]);
        setIsAnswerCorrect(false);
      } else {
        setError("Không thể tải chi tiết câu hỏi.");
      }
    } catch (ex) {
      setError("Không thể tải chi tiết bài quiz. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const playFeedbackSound = async (isCorrect) => {
    try {
      if (sound) await sound.unloadAsync();
      const uri = isCorrect
        ? "https://res.cloudinary.com/dabb0yavq/video/upload/v1712415147/correct-6033_zqqx9w.mp3"
        : "https://res.cloudinary.com/dabb0yavq/video/upload/v1712415147/wrong-47985_y2v3m6.mp3";

      const { sound: newSound } = await Audio.Sound.createAsync({ uri });
      setSound(newSound);
      await newSound.playAsync();
    } catch (e) {
      // Ignore audio errors
    }
  };

  const playQuizAudio = async () => {
    if (!quizDetail?.text || quizDetail.type !== 'AUDIO') return;
    try {
      if (sound) await sound.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: quizDetail.text });
      setSound(newSound);
      await newSound.playAsync();
    } catch (e) {
      Toast.show({ type: "error", text1: "Không thể phát âm thanh." });
    }
  };

  const handleMcPress = (answerId) => {
    if (showResult) return;
    const answer = quizDetail.answers.find(a => a.id === answerId);
    setSelectedAnswer(answerId);
    const correct = answer?.isCorrect || false;
    setIsAnswerCorrect(correct);
    setShowResult(true);
    playFeedbackSound(correct);
    doQuiz(quizId);
  };

  const handleFillPress = (word) => {
    if (showResult) return;
    setFillValue(word);
    const correctAns = quizDetail.answers.find(a => a.isCorrect);
    const correct = word === correctAns?.answer;
    setIsAnswerCorrect(correct);
    setShowResult(true);
    playFeedbackSound(correct);
    doQuiz(quizId);
  };

  const handleMatchLeft = (id) => {
    if (showResult || matches.some(m => m.leftId === id)) return;
    setLeftSelected(id);
    if (rightSelected) checkMatch(id, rightSelected);
  };

  const handleMatchRight = (id) => {
    if (showResult || matches.some(m => m.rightId === id)) return;
    setRightSelected(id);
    if (leftSelected) checkMatch(leftSelected, id);
  };

  const checkMatch = (leftId, rightId) => {
    const isCorrect = leftId === rightId;
    if (isCorrect) {
      const newMatches = [...matches, { leftId, rightId }];
      setMatches(newMatches);
      setLeftSelected(null);
      setRightSelected(null);

      if (newMatches.length === quizDetail.left_items.length) {
        setIsAnswerCorrect(true);
        setShowResult(true);
        playFeedbackSound(true);
        doQuiz(quizId);
      }
    } else {
      setLeftSelected(null);
      setRightSelected(null);
      // Optional: Shaky effect or toast
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setFillValue(null);
    setLeftSelected(null);
    setRightSelected(null);
    setMatches([]);
    setIsAnswerCorrect(false);
  };

  const handleGoBack = () => navigation.goBack();

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
      quiz={quizDetail}
      loading={loading}
      error={error}
      onReload={loadQuizDetail}
      onGoBack={handleGoBack}
      onTryAgain={handleTryAgain}
      // MC / TEXT types
      selectedAnswer={selectedAnswer}
      handleMcPress={handleMcPress}
      // Fill type
      fillValue={fillValue}
      handleFillPress={handleFillPress}
      // Match type
      leftSelected={leftSelected}
      rightSelected={rightSelected}
      matches={matches}
      handleMatchLeft={handleMatchLeft}
      handleMatchRight={handleMatchRight}
      // Result
      showResult={showResult}
      isAnswerCorrect={isAnswerCorrect}
      // Audio
      playQuizAudio={playQuizAudio}
    />
  );
};

export default QuizDetail;

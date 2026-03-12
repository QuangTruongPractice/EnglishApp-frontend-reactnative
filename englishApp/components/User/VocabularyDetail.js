import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import VocabularyDetailScreen from "../Screen/VocabularyDetailScreen";
import { fetchVocabularyDetail, generateQuiz, submitQuiz, toggleVocabularySave } from "../../configs/LoadData";
import { ScoringApis, endpoints } from "../../configs/Apis";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const VocabularyDetail = ({ route }) => {
  const { vocabularyId } = route.params;
  const [vocabulary, setVocabulary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState();
  const nav = useNavigation();

  // Quiz State
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizMeaningId, setQuizMeaningId] = useState(null);

  // Practice / Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingMeaningId, setRecordingMeaningId] = useState(null);
  const [practiceLoading, setPracticeLoading] = useState(false);
  const [practiceResult, setPracticeResult] = useState(null);
  const [showPracticeModal, setShowPracticeModal] = useState(false);

  const recordingRef = useRef(null);
  const isPreparingRef = useRef(false);
  const stopRequestedRef = useRef(false);

  const loadVocabulary = async () => {
    try {
      setLoading(true);
      const response = await fetchVocabularyDetail(vocabularyId);
      const data = response.result;
      setVocabulary(data);
    } catch (e) {
      // console.error(e);
      setError("Failed to load vocabulary details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    nav.goBack();
  };

  const handleToggleSave = async () => {
    try {
      const res = await toggleVocabularySave(vocabularyId);
      if (res.code === 1000) {
        setVocabulary(prev => ({
          ...prev,
          isSave: !prev.isSave
        }));
        Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: !vocabulary.isSave ? 'Đã lưu vào bộ sưu tập' : 'Đã xóa khỏi bộ sưu tập',
          position: 'top',
          topOffset: 60,
        });
      }
    } catch (err) {
      // console.error("Error toggling save:", err);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể thực hiện thao tác. Vui lòng thử lại.',
        position: 'top',
        topOffset: 60,
      });
    }
  };

  const loadSound = async () => {
    if (!vocabulary.audioUrl) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: vocabulary.audioUrl });
      setSound(sound);
      await sound.playAsync();
    } catch (err) {
      // console.error("Error playing sound:", err);
    }
  };

  const handleStartQuiz = async (meanId) => {
    try {
      setQuizData(null);
      setSelectedAnswer(null);
      setShowQuizResult(false);
      setShowQuizModal(true);

      setQuizMeaningId(meanId);
      const res = await generateQuiz(meanId);
      setQuizData(res.result);
    } catch (err) {
      // console.error("Error generating quiz:", err);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể khởi tạo bài tập. Vui lòng thử lại.'
      });
      setShowQuizModal(false);
    }
  };

  // ===== PRACTICE / RECORDING =====

  const startRecording = async (meaningId) => {
    if (isPreparingRef.current) return;

    try {
      isPreparingRef.current = true;
      stopRequestedRef.current = false;

      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'info',
          text1: 'Thông báo',
          text2: 'Vui lòng cấp quyền micro để sử dụng tính năng này.'
        });
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = newRecording;

      if (stopRequestedRef.current) {
        await stopAndSendRecording(newRecording, meaningId);
      } else {
        setIsRecording(true);
        setRecordingMeaningId(meaningId);
      }
    } catch (err) {
      // console.error("Error starting recording:", err);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể khởi động micro.'
      });
    } finally {
      isPreparingRef.current = false;
    }
  };

  const stopAndSendRecording = async (rec, meaningId) => {
    try {
      setIsRecording(false);
      setRecordingMeaningId(null);
      if (!rec) return;

      const status = await rec.getStatusAsync();
      if (status.canRecord) {
        await rec.stopAndUnloadAsync();
        const uri = rec.getURI();
        if (uri) {
          await sendPronunciation(uri, meaningId);
        }
      }
    } catch (e) {
      // console.error("Error stopping recording:", e);
    } finally {
      recordingRef.current = null;
      stopRequestedRef.current = false;
    }
  };

  const sendPronunciation = async (audioUri, meaningId) => {
    const meaning = vocabulary.meanings?.find(m => m.id === meaningId);
    if (!meaning?.example) {
      Toast.show({
        type: 'info',
        text1: 'Thông báo',
        text2: 'Nghĩa này chưa có câu ví dụ để chấm điểm.'
      });
      return;
    }

    setPracticeLoading(true);
    setShowPracticeModal(true);
    setPracticeResult(null);

    try {
      const formData = new FormData();
      formData.append('audio', {
        uri: audioUri,
        name: 'recording.m4a',
        type: 'audio/m4a',
      });
      formData.append('expected_text', meaning.example);

      const response = await ScoringApis.post(endpoints['get-score'], formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPracticeResult({
        score: response.data?.overall_score ?? response.data?.score ?? response.data?.pronunciation_score ?? 0,
        example: meaning.example,
        data: response.data,
      });
    } catch (err) {
      // console.error("Error scoring pronunciation:", err);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể chấm điểm phát âm. Vui lòng thử lại.'
      });
      setShowPracticeModal(false);
    } finally {
      setPracticeLoading(false);
    }
  };

  const handlePractice = async (meaningId) => {
    // If currently recording the same meaning → stop and send
    if (isRecording && recordingMeaningId === meaningId) {
      if (isPreparingRef.current) {
        stopRequestedRef.current = true;
        setIsRecording(false);
        setRecordingMeaningId(null);
        return;
      }
      if (recordingRef.current) {
        await stopAndSendRecording(recordingRef.current, meaningId);
      }
      return;
    }

    // If recording a different meaning → stop the old one first
    if (isRecording && recordingRef.current) {
      try {
        setIsRecording(false);
        setRecordingMeaningId(null);
        const status = await recordingRef.current.getStatusAsync();
        if (status.canRecord) {
          await recordingRef.current.stopAndUnloadAsync();
        }
      } catch (e) {
        // Ignore cleanup errors
      }
      recordingRef.current = null;
    }

    // Start new recording
    await startRecording(meaningId);
  };

  // ===== QUIZ =====

  const playQuizSoundEffect = async (isCorrect) => {
    try {
      const uri = isCorrect
        ? "https://www.myinstants.com/media/sounds/duolingo-correct.mp3"
        : "https://www.myinstants.com/media/sounds/duolingo-wrong.mp3";
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (e) {
      // console.error(e);
    }
  };

  const checkAnswer = () => {
    if (!selectedAnswer || !quizData) return;

    const selectedAnsObj = quizData.answers.find(a => a.id === selectedAnswer);
    setShowQuizResult(true);

    if (selectedAnsObj?.isCorrect) {
      playQuizSoundEffect(true);
      Toast.show({
        type: 'success',
        text1: 'Chính xác! 🎉',
        position: 'top',
        topOffset: 60,
      });
    } else {
      playQuizSoundEffect(false);
      Toast.show({
        type: 'error',
        text1: 'Sai rồi! ❌',
        text2: 'Hãy xem đáp án đúng nhé.',
        position: 'top',
        topOffset: 60,
      });
    }

    // Gửi kết quả về server
    if (quizMeaningId) {
      submitQuiz(quizMeaningId, selectedAnsObj?.isCorrect).catch(() => {
        // console.error("Lỗi khi gửi kết quả trắc nghiệm:", err);
      });
    }
  };

  const playQuestionAudio = async () => {
    if (!quizData?.text || quizData.type !== 'AUDIO') return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: quizData.text });
      await sound.playAsync();
    } catch (e) {
      // console.error(e);
    }
  };

  // ===== CLEANUP =====

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (vocabularyId) {
      loadVocabulary();
    }
  }, [vocabularyId]);

  // Cleanup recording on unmount
  useEffect(() => {
    return () => {
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync().catch(() => { });
      }
    };
  }, []);

  return (
    <VocabularyDetailScreen
      vocabulary={vocabulary}
      loading={loading}
      error={error}
      loadVocabulary={loadVocabulary}
      loadSound={loadSound}
      onGoBack={handleGoBack}
      onToggleSave={handleToggleSave}
      onStartQuiz={handleStartQuiz}
      onPractice={handlePractice}
      quizData={quizData}
      showQuizModal={showQuizModal}
      setShowQuizModal={setShowQuizModal}
      selectedAnswer={selectedAnswer}
      setSelectedAnswer={setSelectedAnswer}
      showQuizResult={showQuizResult}
      checkAnswer={checkAnswer}
      quizSound={playQuestionAudio}
      // Practice Props
      isRecording={isRecording}
      recordingMeaningId={recordingMeaningId}
      practiceLoading={practiceLoading}
      practiceResult={practiceResult}
      showPracticeModal={showPracticeModal}
      setShowPracticeModal={setShowPracticeModal}
    />
  );
};

export default VocabularyDetail;

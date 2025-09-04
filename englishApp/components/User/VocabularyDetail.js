import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import VocabularyDetailScreen from "../Screen/VocabularyDetailScreen";
import { fetchVocabularyDetail, viewFlashcard, practicePronunciation } from "../../configs/LoadData";

const VocabularyDetail = ({ route }) => {
  const { vocabularyId } = route.params;
  const [vocabulary, setVocabulary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnswer, setShowAnswer] = useState(true);
  const [sound, setSound] = useState();
  const [recording, setRecording] = useState(null);
  const [pronunciationResult, setPronunciationResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const hasViewedFlashcard = useRef(false);
  const hasPracticedPronunciation = useRef(false);
  const currentVocabularyId = useRef(null);

  const loadVocabulary = async () => {
    try {
      setLoading(true);
      const response = await fetchVocabularyDetail(vocabularyId);
      const data = response.result;
      setVocabulary(data);
      
      if (currentVocabularyId.current !== vocabularyId) {
        hasViewedFlashcard.current = false;
        hasPracticedPronunciation.current = false;
        currentVocabularyId.current = vocabularyId;
      }
    } catch (e) {
      console.error(e);
      setError("Failed to load vocabulary details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadSound = async () => {
    let url = vocabulary.audioUrl;
    const { sound } = await Audio.Sound.createAsync({ uri: url });
    setSound(sound);
    await sound.playAsync();
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Lỗi khi thu âm:", err);
    }
  };

  const stopRecording = async () => {
    setIsProcessing(true);

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    const formData = new FormData();
    formData.append("audio_file", {
      uri,
      type: "audio/wav",
      name: "recording.wav",
    });
    formData.append("expected_text", vocabulary.example);

    try {
      const res = await fetch(
        "https://satyr-dashing-officially.ngrok-free.app/score-pronunciation",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const data = await res.json();
      setPronunciationResult(data);
      setShowResultModal(true);
      
      if (!hasPracticedPronunciation.current) {
        await practicePronunciation(vocabularyId);
        hasPracticedPronunciation.current = true;
      }
    } catch (e) {
      console.error("❌ Lỗi gửi file:", e);
      setError("Không thể đánh giá phát âm. Vui lòng thử lại.");
    } finally {
      setRecording(null);
      setIsProcessing(false);
    }
  };



  const handleFlashcardInteraction = async (showAnswerValue) => {
    setShowAnswer(showAnswerValue);
    
    if (!hasViewedFlashcard.current) {
      console.info(vocabularyId);
      await viewFlashcard(vocabularyId);
      hasViewedFlashcard.current = true;
    }
  };

  const closeResultModal = () => {
    setShowResultModal(false);
  };

  const resetPronunciationResult = () => {
    setShowResultModal(false);
    setPronunciationResult(null);
  };
  
  const getScoreColor = (score) => {
    if (score >= 80) return "#10B981";
    if (score >= 60) return "#F59E0B";
    return "#EF4444";
  };

  const getScoreText = (score) => {
    if (score >= 80) return "Xuất sắc";
    if (score >= 60) return "Tốt";
    if (score >= 40) return "Khá";
    return "Cần cải thiện";
  };

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

  return (
    <VocabularyDetailScreen
      vocabulary={vocabulary}
      loading={loading}
      error={error}
      showAnswer={showAnswer}
      recording={recording}
      pronunciationResult={pronunciationResult}
      showResultModal={showResultModal}
      isProcessing={isProcessing}
      loadVocabulary={loadVocabulary}
      loadSound={loadSound}
      startRecording={startRecording}
      stopRecording={stopRecording}
      handleFlashcardInteraction={handleFlashcardInteraction}
      closeResultModal={closeResultModal}
      resetPronunciationResult={resetPronunciationResult}
      getScoreColor={getScoreColor}
      getScoreText={getScoreText}
    />
  );
};

export default VocabularyDetail;
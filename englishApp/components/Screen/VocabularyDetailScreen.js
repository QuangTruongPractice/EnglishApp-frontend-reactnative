import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import styles from "../../styles/VocabularyDetailStyles";

const VocabularyDetailScreen = ({
  vocabulary,
  loading,
  error,
  showAnswer,
  recording,
  pronunciationResult,
  showResultModal,
  isProcessing,
  loadVocabulary,
  loadSound,
  startRecording,
  stopRecording,
  handleFlashcardInteraction,
  closeResultModal,
  resetPronunciationResult,
  getScoreColor,
  getScoreText,
}) => {

  // Pronunciation result modal
  const renderPronunciationResult = () => {
    if (!pronunciationResult) return null;

    return (
      <Modal
        visible={showResultModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeResultModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Kết Quả Đánh Giá Phát Âm</Text>
            <IconButton icon="close" onPress={closeResultModal} />
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Overall Score */}
            <Card style={styles.scoreCard}>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>Điểm Tổng</Text>
                <Text
                  style={[
                    styles.totalScore,
                    { color: getScoreColor(pronunciationResult.total_score) },
                  ]}
                >
                  {pronunciationResult.total_score}/100
                </Text>
                <Text
                  style={[
                    styles.scoreStatus,
                    { color: getScoreColor(pronunciationResult.total_score) },
                  ]}
                >
                  {getScoreText(pronunciationResult.total_score)}
                </Text>
              </View>
            </Card>

            {/* Detailed Scores */}
            <View style={styles.detailScores}>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreRowLabel}>Độ chính xác</Text>
                <View style={styles.scoreRowValue}>
                  <Text
                    style={[
                      styles.scoreNumber,
                      { color: getScoreColor(pronunciationResult.accuracy) },
                    ]}
                  >
                    {pronunciationResult.accuracy}%
                  </Text>
                </View>
              </View>

              <View style={styles.scoreRow}>
                <Text style={styles.scoreRowLabel}>Độ trưng bày</Text>
                <View style={styles.scoreRowValue}>
                  <Text
                    style={[
                      styles.scoreNumber,
                      { color: getScoreColor(pronunciationResult.fluency) },
                    ]}
                  >
                    {pronunciationResult.fluency}%
                  </Text>
                </View>
              </View>
            </View>

            {/* Expected vs Actual */}
            <Card style={styles.comparisonCard}>
              <Text style={styles.comparisonTitle}>So Sánh</Text>

              <View style={styles.textComparison}>
                <Text style={styles.expectedLabel}>Câu mẫu:</Text>
                <Text style={styles.expectedText}>
                  {pronunciationResult.expected}
                </Text>
              </View>

              <View style={styles.textComparison}>
                <Text style={styles.actualLabel}>Bạn đã nói:</Text>
                <Text style={styles.actualText}>
                  {pronunciationResult.transcription}
                </Text>
              </View>
            </Card>

            {/* Feedback */}
            {pronunciationResult.feedback &&
              pronunciationResult.feedback.length > 0 && (
                <Card style={styles.feedbackCard}>
                  <Text style={styles.feedbackTitle}>💡 Gợi Ý Cải Thiện</Text>
                  {pronunciationResult.feedback.map((feedback, index) => (
                    <View key={index} style={styles.feedbackItem}>
                      <Text style={styles.feedbackBullet}>•</Text>
                      <Text style={styles.feedbackText}>{feedback}</Text>
                    </View>
                  ))}
                </Card>
              )}
          </ScrollView>

          <View style={styles.modalActions}>
            <Button
              mode="contained"
              style={styles.tryAgainButton}
              onPress={resetPronunciationResult}
            >
              Thử Lại
            </Button>
            <Button
              mode="outlined"
              style={styles.continueButton}
              onPress={closeResultModal}
            >
              Tiếp Tục
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  // Flashcard content
  const renderFlashcard = () => {
    if (!showAnswer) {
      // Question Side
      return (
        <TouchableOpacity onPress={() => handleFlashcardInteraction(true)}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Định nghĩa</Text>
            <Text style={styles.definition}>{vocabulary.definition}</Text>
            <Text style={styles.vietnamese}>{vocabulary.vnDefinition}</Text>

            {vocabulary.example && (
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>Ví dụ</Text>
                <Text style={styles.example}>{vocabulary.example}</Text>
                {vocabulary.vnExample && (
                  <Text style={styles.exampleVi}>{vocabulary.vnExample}</Text>
                )}
              </View>
            )}

            <TouchableOpacity style={styles.previousButton}>
              <Text style={styles.previousText}>← Nhấn để xem mặt trước</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }

    // Answer Side
    return (
      <TouchableOpacity onPress={() => handleFlashcardInteraction(false)}>
        <View style={styles.answerCard}>
          <Text style={styles.answerWord}>{vocabulary.word}</Text>
          <Text style={styles.pronunciation}>
            {`/ ${vocabulary.phonetic} /`}
          </Text>
          <Text style={styles.translation}>{vocabulary.vnWord}</Text>

          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextText}>→ Nhấn để xem mặt sau</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading vocabularies...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button onPress={loadVocabulary}>Retry</Button>
      </View>
    );
  }

  // Main render
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Flashcard Phát Âm</Text>
        <IconButton 
          icon="refresh" 
          onPress={() => handleFlashcardInteraction(true)} 
        />
      </View>

      {/* Category Tags */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTag}>
          {vocabulary.wordTypes?.[0]?.type}
        </Text>
        <Text style={styles.categorySubtag}>
          {vocabulary.subTopics?.[0]?.name}
        </Text>
      </View>

      {/* Flashcard */}
      <Card style={styles.mainCard}>
        {renderFlashcard()}
      </Card>

      {/* Audio Section */}
      <View style={styles.audioContainer}>
        <Text style={styles.audioTitle}>🔊 Phát âm mẫu</Text>
        <Button 
          mode="contained" 
          style={styles.playButton} 
          onPress={loadSound}
        >
          ▶ Nghe phát âm
        </Button>
      </View>

      {/* Practice Section */}
      <View style={styles.practiceContainer}>
        <Text style={styles.practiceTitle}>🎤 Luyện phát âm</Text>
        <Text style={styles.practiceSubtitle}>
          Hãy nói: "{vocabulary.example}"
        </Text>
        <Button
          mode="contained"
          style={styles.recordButton}
          buttonColor={recording ? "#EF4444" : "#22C55E"}
          onPress={recording ? stopRecording : startRecording}
          disabled={isProcessing}
        >
          {isProcessing
            ? "Đang xử lý..."
            : recording
            ? "⏹ Dừng & Gửi"
            : "🎤 Bắt đầu nói"}
        </Button>

        {isProcessing && (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="small" color="#3B82F6" />
            <Text style={styles.processingText}>Đang đánh giá phát âm...</Text>
          </View>
        )}
      </View>

      {renderPronunciationResult()}
    </View>
  );
};

export default VocabularyDetailScreen;
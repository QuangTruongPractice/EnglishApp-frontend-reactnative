import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";
import { Button, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
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
  onGoBack,
}) => {
  const renderPronunciationResult = () => {
    if (!pronunciationResult) return null;

    return (
      <Modal
        visible={showResultModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeResultModal}
      >
        <SafeAreaView style={styles.modalSafeArea}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🎯 Kết Quả Đánh Giá Phát Âm</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeResultModal}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              {/* Overall Score */}
              <Card style={styles.scoreCard}>
                <Card.Content style={styles.scoreContainer}>
                  <Text style={styles.scoreLabel}>Điểm Tổng Thể</Text>
                  <View style={styles.scoreCircle}>
                    <Text style={[styles.totalScore, { color: getScoreColor(pronunciationResult.total_score) }]}>
                      {pronunciationResult.total_score}
                    </Text>
                    <Text style={styles.scoreOutOf}>/100</Text>
                  </View>
                  <Text style={[styles.scoreStatus, { color: getScoreColor(pronunciationResult.total_score) }]}>
                    {getScoreText(pronunciationResult.total_score)}
                  </Text>
                </Card.Content>
              </Card>

              <View style={styles.detailScores}>
                <Card style={styles.scoreRow}>
                  <Card.Content style={styles.scoreRowContent}>
                    <View style={styles.scoreRowLeft}>
                      <Text style={styles.scoreRowIcon}>🎯</Text>
                      <Text style={styles.scoreRowLabel}>Độ chính xác</Text>
                    </View>
                    <Text style={[styles.scoreNumber, { color: getScoreColor(pronunciationResult.accuracy) }]}>
                      {pronunciationResult.accuracy}%
                    </Text>
                  </Card.Content>
                </Card>

                <Card style={styles.scoreRow}>
                  <Card.Content style={styles.scoreRowContent}>
                    <View style={styles.scoreRowLeft}>
                      <Text style={styles.scoreRowIcon}>🌊</Text>
                      <Text style={styles.scoreRowLabel}>Độ thuần thục</Text>
                    </View>
                    <Text style={[styles.scoreNumber, { color: getScoreColor(pronunciationResult.fluency) }]}>
                      {pronunciationResult.fluency}%
                    </Text>
                  </Card.Content>
                </Card>
              </View>

              {/* Expected vs Actual */}
              <Card style={styles.comparisonCard}>
                <Card.Content>
                  <Text style={styles.comparisonTitle}>📝 So Sánh Kết Quả</Text>

                  <View style={styles.textComparison}>
                    <Text style={styles.expectedLabel}>✅ Câu mẫu:</Text>
                    <View style={styles.expectedTextContainer}>
                      <Text style={styles.expectedText}>
                        {pronunciationResult.expected_text}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.textComparison}>
                    <Text style={styles.actualLabel}>🎤 Bạn đã nói:</Text>
                    <View style={styles.actualTextContainer}>
                      <Text style={styles.actualText}>
                        {pronunciationResult.transcription}
                      </Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>

              {/* Feedback */}
              {pronunciationResult.pronunciation_feedback &&
                pronunciationResult.pronunciation_feedback.length > 0 && (
                  <Card style={styles.feedbackCard}>
                    <Card.Content>
                      <Text style={styles.feedbackTitle}>💡 Gợi Ý Cải Thiện</Text>
                      {pronunciationResult.pronunciation_feedback.map((feedback, index) => (
                        <View key={index} style={styles.feedbackItem}>
                          <Text style={styles.feedbackBullet}>•</Text>
                          <Text style={styles.feedbackText}>{feedback}</Text>
                        </View>
                      ))}
                    </Card.Content>
                  </Card>
                )}
            </ScrollView>

            <View style={styles.modalActions}>
              <Button
                mode="contained"
                style={styles.tryAgainButton}
                buttonColor="#F45B69"
                onPress={resetPronunciationResult}
              >
                🔄 Thử Lại
              </Button>

              <Button
                mode="outlined"
                style={styles.continueButton}
                textColor="white"
                onPress={closeResultModal}
              >
                ➡️ Tiếp Tục
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  const renderFlashcard = () => {
    if (!showAnswer) {
      return (
        <TouchableOpacity
          onPress={() => handleFlashcardInteraction(true)}
          activeOpacity={0.9}
        >
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>📖 Định nghĩa</Text>
              <View style={styles.cardDecoration} />
            </View>

            <Text style={styles.definition}>{vocabulary.definition}</Text>
            <Text style={styles.vietnamese}>{vocabulary.vnDefinition}</Text>

            {vocabulary.example && (
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>💬 Ví dụ</Text>
                <Text style={styles.example}>{vocabulary.example}</Text>
                {vocabulary.vnExample && (
                  <Text style={styles.exampleVi}>{vocabulary.vnExample}</Text>
                )}
              </View>
            )}

            <View style={styles.flipHint}>
              <Text style={styles.flipHintText}>👆 Nhấn để xem từ vựng</Text>
              <View style={styles.flipIndicator} />
            </View>
          </Card.Content>
        </TouchableOpacity>
      );
    }

    // Answer Side
    return (
      <TouchableOpacity
        onPress={() => handleFlashcardInteraction(false)}
        activeOpacity={0.9}
      >
        <Card.Content style={styles.answerCard}>
          <View style={styles.answerDecoration} />
          <Text style={styles.answerWord}>{vocabulary.word}</Text>
          <Text style={styles.pronunciation}>{vocabulary.phonetic}</Text>
          <Text style={styles.translation}>{vocabulary.vnWord}</Text>

          <View style={styles.flipHint}>
            <Text style={styles.flipHintTextWhite}>👆 Nhấn để xem định nghĩa</Text>
            <View style={styles.flipIndicatorWhite} />
          </View>
        </Card.Content>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Card style={styles.loadingCard}>
            <Card.Content style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#F45B69" />
              <Text style={styles.loadingText}>Đang tải từ vựng...</Text>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Card style={styles.errorCard}>
            <Card.Content style={styles.errorContainer}>
              <Text style={styles.errorIcon}>😞</Text>
              <Text style={styles.errorText}>{error}</Text>
              <Button
                mode="contained"
                buttonColor="#F45B69"
                onPress={loadVocabulary}
              >
                🔄 Thử lại
              </Button>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onGoBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitleMain}>{vocabulary?.word || "Vocabulary Details"}</Text>
        <View style={styles.headerSpacer} />
      </View>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Category Tags */}
          <View style={styles.categoryContainer}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>
                {vocabulary.wordTypes?.[0]?.type}
              </Text>
            </View>

            <View style={styles.categorySubtag}>
              <Text style={styles.categorySubtagText}>
                {vocabulary.subTopics?.[0]?.name}
              </Text>
            </View>
          </View>

          {/* Flashcard */}
          <Card style={[styles.mainCard, showAnswer ? styles.answerCardStyle : styles.questionCardStyle]}>
            {renderFlashcard()}
          </Card>

          {/* Audio Section */}
          <Card style={styles.sectionCard}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🔊</Text>
                <Text style={styles.audioTitle}>Phát âm mẫu</Text>
              </View>

              <Button
                mode="contained"
                buttonColor="#4ECDC4"
                style={styles.playButton}
                onPress={loadSound}
              >
                ▶️ Nghe phát âm
              </Button>
            </Card.Content>
          </Card>

          {/* Practice Section */}
          <Card style={styles.sectionCard}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🎤</Text>
                <Text style={styles.practiceTitle}>Luyện phát âm</Text>
              </View>

              <Text style={styles.practiceSubtitle}>
                Hãy nói: {'"'}<Text style={styles.practiceExample}>{vocabulary.example}</Text>{'"'}
              </Text>

              <Button
                mode="contained"
                buttonColor={recording ? "#EF4444" : "#22C55E"}
                style={styles.recordButton}
                onPress={recording ? stopRecording : startRecording}
                disabled={isProcessing}
              >
                {isProcessing
                  ? "⏳ Đang xử lý..."
                  : recording
                    ? "⏹️ Dừng & Gửi"
                    : "🎤 Bắt đầu nói"}
              </Button>

              {isProcessing && (
                <View style={styles.processingContainer}>
                  <ActivityIndicator size="small" color="#F45B69" />
                  <Text style={styles.processingText}>Đang đánh giá phát âm của bạn...</Text>
                </View>
              )}
            </Card.Content>
          </Card>
        </ScrollView>

        {renderPronunciationResult()}
      </View>
    </SafeAreaView>
  );
};

export default VocabularyDetailScreen;
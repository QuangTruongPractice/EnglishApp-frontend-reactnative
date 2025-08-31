import { View, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Card,
  Button,
  Surface,
  Text,
  IconButton,
  Chip,
  ProgressBar,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import styles from "../../styles/QuizDetailStyles";
import { useEffect } from "react";

const QuizDetailScreen = ({
  quizDetail,
  loading,
  error,
  selectedAnswer,
  showResult,
  isPlaying,
  snackbarMessage,
  onReload,
  onAnswerSelect,
  onSubmitAnswer,
  onTryAgain,
  onGoBack,
  loadSound,
}) => {
  const renderLoadingState = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#6366F1" />
      <Text style={styles.loadingText}>Đang tải câu hỏi...</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.centerContainer}>
      <IconButton icon="alert-circle" size={48} iconColor="#EF4444" />
      <Text style={styles.errorTitle}>Có lỗi xảy ra</Text>
      <Text style={styles.errorMessage}>{error}</Text>
      <Button mode="contained" onPress={onReload} style={styles.retryButton}>
        Thử lại
      </Button>
    </View>
  );

  useEffect(() => {
    if (showResult && snackbarMessage) {
      Toast.show({
        type: snackbarMessage.includes("Chính xác") ? "success" : "error",
        text1: snackbarMessage,
        position: "top",
        visibilityTime: 2000,
      });
    }
  }, [showResult, snackbarMessage]);

  if (loading) return renderLoadingState();
  if (error) return renderErrorState();
  if (!quizDetail) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.headerCard} mode="elevated">
          <Card.Content style={styles.headerContent}>
            <Chip
              icon={quizDetail.type === "AUDIO" ? "headphones" : "text"}
              style={
                quizDetail.type === "AUDIO"
                  ? styles.audioTypeChip
                  : styles.textTypeChip
              }
              textStyle={
                quizDetail.type === "AUDIO"
                  ? styles.audioTypeText
                  : styles.textTypeText
              }
            >
              {quizDetail.type === "AUDIO"
                ? "Câu hỏi âm thanh"
                : "Câu hỏi văn bản"}
            </Chip>
            <Text variant="titleLarge" style={styles.questionTitle}>
              {quizDetail.question}
            </Text>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Tiến độ: {showResult ? "100" : "0"}%
              </Text>
              <ProgressBar
                progress={showResult ? 1 : 0}
                color={quizDetail.type === "AUDIO" ? "#9333EA" : "#059669"}
                style={styles.progressBar}
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.contentCard} mode="elevated">
          <Card.Content>
            {quizDetail.type === "AUDIO" ? (
              <Surface style={styles.audioContainer} elevation={2}>
                <View style={styles.audioPlayer}>
                  <IconButton
                    icon="volume-high"
                    iconColor="#9333EA"
                    size={32}
                    onPress={loadSound}
                  />
                  <View style={styles.audioDetails}>
                    <Text style={styles.audioTitle}>Nhấn để nghe câu hỏi</Text>
                    <Text style={styles.audioSubtitle}>
                      {isPlaying ? "Đang phát..." : "Sẵn sàng phát"}
                    </Text>
                  </View>
                  <Button
                    mode="contained"
                    onPress={loadSound}
                    style={styles.playButton}
                    icon={isPlaying ? "pause" : "play"}
                    loading={isPlaying}
                  >
                    {isPlaying ? "Đang phát..." : "Phát"}
                  </Button>
                </View>
              </Surface>
            ) : (
              <Surface style={styles.textContainer} elevation={2}>
                <Text style={styles.textQuestion}>{quizDetail.text}</Text>
                <Text style={styles.textInstruction}>
                  Chọn nghĩa tiếng Việt phù hợp
                </Text>
              </Surface>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.answersCard} mode="elevated">
          <Card.Content>
            <Text variant="titleLarge" style={styles.answersTitle}>
              Chọn đáp án:
            </Text>
            <View style={styles.answersContainer}>
              {quizDetail.answers?.map((answer, index) => {
                const isSelected = selectedAnswer === answer.id;
                return (
                  <Card
                    key={answer.id}
                    style={[
                      styles.answerCard,
                      isSelected && styles.selectedAnswerCard,
                    ]}
                    mode="outlined"
                    onPress={() => onAnswerSelect(answer.id)}
                    disabled={showResult}
                  >
                    <Card.Content style={styles.answerContent}>
                      <Text
                        style={[
                          styles.answerText,
                          isSelected && styles.selectedAnswerText,
                        ]}
                      >
                        {String.fromCharCode(65 + index)}. {answer.answer}
                      </Text>
                    </Card.Content>
                  </Card>
                );
              })}
            </View>

            <View style={styles.actionContainer}>
              {!showResult ? (
                <Button
                  mode="contained"
                  onPress={onSubmitAnswer}
                  disabled={!selectedAnswer}
                  style={styles.submitButton}
                  icon="check"
                >
                  Xác nhận đáp án
                </Button>
              ) : (
                <View style={styles.resultActions}>
                  <Button
                    mode="outlined"
                    onPress={onTryAgain}
                    style={styles.tryAgainButton}
                    icon="refresh"
                  >
                    Làm lại
                  </Button>
                  <Button
                    mode="contained"
                    onPress={onGoBack}
                    style={styles.backButton}
                    icon="arrow-left"
                  >
                    Quay lại
                  </Button>
                </View>
              )}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizDetailScreen;

import { FlatList, View, RefreshControl } from "react-native";
import {
  Card,
  Title,
  Button,
  Chip,
  ActivityIndicator,
  Surface,
  Text,
  IconButton,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/QuizStyles";

const QuizScreen = ({
  currentQuizzes,
  activeTab,
  setActiveTab,
  loading,
  error,
  refreshing,
  onRefresh,
  loadMore,
}) => {
  const nav = useNavigation();

  const handleQuizPress = (quizId) => {
    nav.navigate("QuizDetail", { quizId });
  };

  const renderQuizCard = (quiz, index) => (
    <Card key={quiz.id} style={styles.quizCard} mode="elevated">
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.questionInfo}>
            <Chip
              icon={quiz.type === "AUDIO" ? "headphones" : "text"}
              style={[
                styles.typeChip,
                quiz.type === "AUDIO" ? styles.audioChip : styles.textChip,
              ]}
              textStyle={[
                styles.chipText,
                quiz.type === "AUDIO"
                  ? styles.audioChipText
                  : styles.textChipText,
              ]}
              compact
            >
              {quiz.type === "AUDIO" ? "Âm thanh" : "Văn bản"}
            </Chip>
            <Text style={styles.questionNumber}>Câu {index + 1}</Text>
          </View>
        </View>

        <Title style={styles.questionTitle}>{quiz.question}</Title>

        {quiz.type === "TEXT" && (
          <Surface style={styles.textContent} elevation={1}>
            <Text style={styles.textQuestion}>{quiz.text}</Text>
          </Surface>
        )}

        {quiz.type === "AUDIO" && (
          <Surface style={styles.audioContent} elevation={1}>
            <View style={styles.audioInfo}>
              <IconButton icon="volume-high" iconColor="#9333EA" size={24} />
              <Text style={styles.audioLabel}>Nhấn để nghe câu hỏi</Text>
            </View>
          </Surface>
        )}

        <View style={styles.answerPreview}>
          <Text style={styles.answerLabel}>
            {quiz.answers?.length || 4} lựa chọn
          </Text>
          <View style={styles.answerDots}>
            {(quiz.answers || Array(4).fill({})).slice(0, 4).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.answerDot,
                  quiz.type === "AUDIO" ? styles.audioDot : styles.textDot,
                ]}
              />
            ))}
          </View>
        </View>
      </Card.Content>

      <Card.Actions style={styles.cardActions}>
        <Button
          mode="contained"
          onPress={() => handleQuizPress(quiz.id)}
          style={[
            styles.startButton,
            quiz.type === "AUDIO" ? styles.audioButton : styles.textButton,
          ]}
          labelStyle={styles.buttonLabel}
        >
          Bắt đầu
        </Button>
      </Card.Actions>
    </Card>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <IconButton
        icon={activeTab === "audio" ? "headphones-off" : "text-box-remove"}
        size={48}
        iconColor="#9CA3AF"
      />
      <Text style={styles.emptyTitle}>
        Không có câu hỏi {activeTab === "audio" ? "âm thanh" : "văn bản"}
      </Text>
      <Text style={styles.emptySubtitle}>
        Hãy thử chuyển sang tab khác hoặc làm mới danh sách
      </Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <IconButton icon="alert-circle" size={48} iconColor="#EF4444" />
      <Text style={styles.errorTitle}>Có lỗi xảy ra</Text>
      <Text style={styles.errorMessage}>{error}</Text>
      <Button
        mode="contained"
        onPress={onRefresh}
        style={styles.retryButton}
        loading={loading}
      >
        Thử lại
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs */}
      <Surface style={styles.tabContainer} elevation={2}>
        <View style={styles.tabButtonContainer}>
          <Button
            mode={activeTab === "audio" ? "contained" : "outlined"}
            onPress={() => setActiveTab("audio")}
            style={[
              styles.tabButton,
              activeTab === "audio" ? styles.audioTabActive : styles.tabInactive,
            ]}
            labelStyle={[
              styles.tabLabel,
              activeTab === "audio"
                ? styles.tabLabelActive
                : styles.tabLabelInactive,
            ]}
            icon="headphones"
            compact
          >
            Audio
          </Button>

          <Button
            mode={activeTab === "text" ? "contained" : "outlined"}
            onPress={() => setActiveTab("text")}
            style={[
              styles.tabButton,
              activeTab === "text" ? styles.textTabActive : styles.tabInactive,
            ]}
            labelStyle={[
              styles.tabLabel,
              activeTab === "text"
                ? styles.tabLabelActive
                : styles.tabLabelInactive,
            ]}
            icon="text"
            compact
          >
            Text
          </Button>
        </View>
      </Surface>

      {/* Content */}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Đang tải quiz...</Text>
        </View>
      ) : error ? (
        renderErrorState()
      ) : currentQuizzes.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={currentQuizzes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => renderQuizCard(item, index)}
          ListHeaderComponent={
            <View style={styles.statsContainer}>
              <Surface style={styles.statCard} elevation={1}>
                <Text style={styles.statNumber}>{currentQuizzes.length}</Text>
                <Text style={styles.statLabel}>
                  Câu hỏi {activeTab === "audio" ? "Audio" : "Text"}
                </Text>
              </Surface>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          contentContainerStyle={styles.scrollContent}
        />
      )}
    </SafeAreaView>
  );
};

export default QuizScreen;

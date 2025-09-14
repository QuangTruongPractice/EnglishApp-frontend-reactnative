import { View, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import {
  Card,
  Text,
  ProgressBar,
  Chip,
  Button,
  ActivityIndicator,
  Surface,
  Divider,
  IconButton,
  SegmentedButtons,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/ProgressStyles";

const ProgressScreen = ({
  videoProgress,
  vocabularyProgress,
  loading,
  error,
  refreshing,
  activeTab,
  setActiveTab,
  onRefresh,
  formatDate,
  formatDuration,
  handleVideoPress,
  handleAudioPress,
  completedVideos,
  totalVideos,
  completedVocabulary,
  totalVocabulary,
  nav,
  retry,
}) => {
  const VideoProgressCard = ({ item, onVideoPress, formatDate, formatDuration }) => {
    return (
      <TouchableOpacity
        onPress={() => nav.navigate("VideoDetail", { videoId: item.video.id })}
        activeOpacity={0.7}
      >
        <Card key={item.id} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.videoHeader}>
              <View style={styles.videoInfo}>
                <Text variant="titleMedium" style={styles.videoTitle}>
                  {item.video.title}
                </Text>
                <Text variant="bodySmall" style={styles.videoMeta}>
                  {formatDuration(item.video.duration)} •{" "}
                  {item.video.segmentsCount} đoạn
                </Text>
              </View>
              {item.isCompleted && (
                <Chip
                  icon="check-circle"
                  textStyle={styles.completedChipText}
                  style={styles.completedChip}
                >
                  Hoàn thành
                </Chip>
              )}
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text variant="bodySmall">Tiến độ</Text>
                <Text variant="bodySmall">{item.progressPercentage}%</Text>
              </View>
              <ProgressBar
                progress={item.progressPercentage / 100}
                color={item.isCompleted ? "#4CAF50" : "#2196F3"}
                style={styles.progressBar}
              />
            </View>

            <View style={styles.videoFooter}>
              <Text variant="bodySmall" style={styles.dateText}>
                {formatDate(item.updatedAt)}
              </Text>
              <Button
                mode="contained"
                icon="play"
                compact
                onPress={() => nav.navigate("VideoDetail", { videoId: item.video.id })}
                style={styles.videoButton}
              >
                Xem video
              </Button>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const VocabularyProgressCard = ({ item, onAudioPress, formatDate }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          nav.navigate("VocabularyDetail", { vocabularyId: item.vocabulary.id })
        }
        activeOpacity={0.7}
      >
        <Card key={item.id} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            {/* English Section */}
            <View style={styles.vocabularySection}>
              <View style={styles.vocabularyHeader}>
                <View style={styles.vocabularyWordInfo}>
                  <Text variant="titleLarge" style={styles.vocabularyWord}>
                    {item.vocabulary.word}
                  </Text>
                  <Text variant="bodySmall" style={styles.vocabularyPhonetic}>
                    {item.vocabulary.phonetic}
                  </Text>
                </View>
                <View style={styles.vocabularyActions}>
                  <IconButton
                    icon="volume-high"
                    size={20}
                    iconColor="#2196F3"
                    onPress={() => onAudioPress?.(item.vocabulary.audioUrl)}
                  />
                  <Chip
                    textStyle={styles.statusChipText}
                    style={[
                      styles.statusChip,
                      item.status === "COMPLETED"
                        ? styles.statusChipCompleted
                        : styles.statusChipInProgress,
                    ]}
                  >
                    {item.status === "COMPLETED" ? "Hoàn thành" : "Đang học"}
                  </Chip>
                </View>
              </View>

              <Text variant="bodyMedium" style={styles.definitionText}>
                {item.vocabulary.definition}
              </Text>
              <Text variant="bodySmall" style={styles.exampleText}>
                "{item.vocabulary.example}"
              </Text>
            </View>

            <Divider style={styles.divider} />

            {/* Vietnamese Section */}
            <View style={styles.vocabularySection}>
              <Text variant="titleMedium" style={styles.vietnameseTitle}>
                {item.vocabulary.vnWord}
              </Text>
              <Text variant="bodyMedium" style={styles.definitionText}>
                {item.vocabulary.vnDefinition}
              </Text>
              <Text variant="bodySmall" style={styles.exampleText}>
                "{item.vocabulary.vnExample}"
              </Text>
            </View>

            {/* Tags */}
            <View style={styles.tagsContainer}>
              {item.vocabulary.wordTypes.map((type) => (
                <Chip
                  key={type.id}
                  compact
                  style={styles.wordTypeChip}
                  textStyle={styles.chipText}
                >
                  {type.type}
                </Chip>
              ))}
              {item.vocabulary.subTopics.map((topic) => (
                <Chip
                  key={topic.id}
                  compact
                  style={styles.topicChip}
                  textStyle={styles.chipText}
                >
                  {topic.name}
                </Chip>
              ))}
            </View>

            <Text variant="bodySmall" style={styles.updateDate}>
              Cập nhật: {formatDate(item.updatedAt)}
            </Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Đang tải tiến độ học tập...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.errorContainer}>
          <Text variant="headlineSmall" style={styles.errorText}>
            {error}
          </Text>
          <Button mode="contained" onPress={retry}>
            Thử lại
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <Surface style={styles.headerSurface}>
          <Text variant="headlineMedium" style={styles.headerTitle}>
            Tiến độ học tập
          </Text>
          <Text variant="bodyMedium" style={styles.headerSubtitle}>
            Theo dõi quá trình học từ vựng và video của bạn
          </Text>
        </Surface>

        {/* Tab Navigation */}
        <SegmentedButtons
          value={activeTab}
          onValueChange={setActiveTab}
          buttons={[
            {
              value: "video",
              label: `Video (${totalVideos})`,
              icon: "play-circle",
            },
            {
              value: "vocabulary",
              label: `Từ vựng (${totalVocabulary})`,
              icon: "book-open-page-variant",
            },
          ]}
          style={styles.tabNavigation}
        />

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCardLeft}>
            <Card.Content style={styles.summaryCardContent}>
              <Text variant="headlineSmall" style={styles.summaryNumberBlue}>
                {activeTab === "video"
                  ? `${completedVideos}/${totalVideos}`
                  : `${completedVocabulary}/${totalVocabulary}`}
              </Text>
              <Text variant="bodySmall">
                {activeTab === "video"
                  ? "Video hoàn thành"
                  : "Từ vựng hoàn thành"}
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.summaryCardRight}>
            <Card.Content style={styles.summaryCardContent}>
              <Text variant="headlineSmall" style={styles.summaryNumberGreen}>
                {activeTab === "video"
                  ? `${Math.round((completedVideos / totalVideos) * 100) || 0}%`
                  : `${
                      Math.round(
                        (completedVocabulary / totalVocabulary) * 100
                      ) || 0
                    }%`}
              </Text>
              <Text variant="bodySmall">Tỷ lệ hoàn thành</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Video Tab Content */}
        {activeTab === "video" && (
          <>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              📹 Tiến độ Video
            </Text>
            {videoProgress?.length === 0 ? (
              <Card>
                <Card.Content style={styles.emptyStateContainer}>
                  <Text variant="bodyMedium" style={styles.emptyStateText}>
                    Bạn chưa xem video nào
                  </Text>
                </Card.Content>
              </Card>
            ) : (
              videoProgress?.map((item) => (
                <VideoProgressCard
                  key={item.id}
                  item={item}
                  onVideoPress={handleVideoPress}
                  formatDate={formatDate}
                  formatDuration={formatDuration}
                />
              ))
            )}
          </>
        )}

        {/* Vocabulary Tab Content */}
        {activeTab === "vocabulary" && (
          <>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              📚 Tiến độ Từ vựng
            </Text>
            {vocabularyProgress?.length === 0 ? (
              <Card>
                <Card.Content style={styles.emptyStateContainer}>
                  <Text variant="bodyMedium" style={styles.emptyStateText}>
                    Bạn chưa học từ vựng nào
                  </Text>
                </Card.Content>
              </Card>
            ) : (
              vocabularyProgress?.map((item) => (
                <VocabularyProgressCard
                  key={item.id}
                  item={item}
                  onAudioPress={handleAudioPress}
                  formatDate={formatDate}
                />
              ))
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgressScreen;
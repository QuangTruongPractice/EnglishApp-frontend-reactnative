import { View, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import {
  Card,
  Text,
  ProgressBar,
  Chip,
  Button,
  ActivityIndicator,
  Surface,
  IconButton,
  SegmentedButtons,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/ProgressStyles";

const ProgressScreen = ({
  videoProgress,
  vocabularyProgress,
  vocaCounts,
  activeVocaStatus,
  setActiveVocaStatus,
  loading,
  error,
  refreshing,
  activeTab,
  setActiveTab,
  onRefresh,
  formatDate,
  formatDuration,
  handleVideoPress,
  completedVideos,
  totalVideos,
  completedVocabulary,
  totalVocabulary,
  nav,
  retry,
}) => {
  const VideoProgressCard = ({ item, formatDate, formatDuration }) => {
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

  const VocabularyProgressCard = ({ item }) => {
    // Handle both nested structure (if any) and flat structure provided by the user
    const data = item.vocabulary || item;

    return (
      <TouchableOpacity
        onPress={() =>
          nav.navigate("VocabularyDetail", { vocabularyId: data.id })
        }
        activeOpacity={0.7}
        style={styles.vocaCard}
      >
        <View style={styles.vocaIconContainer}>
          <IconButton icon="star" iconColor="#10B981" size={24} style={{ margin: 0 }} />
        </View>

        <View style={styles.vocaInfoContainer}>
          <View style={styles.vocaMainLine}>
            <Text style={styles.vocaWord}>{data.word}</Text>
            {data.isSave && (
              <Ionicons name="bookmark" size={16} color="#6366f1" style={{ marginLeft: 6, marginRight: 2 }} />
            )}
            {data.phonetic && (
              <Text style={styles.vocaPhonetic}>{data.phonetic}</Text>
            )}
            {data.level && (
              <View style={styles.vocaLevelBadge}>
                <Text style={styles.vocaLevelText}>{data.level}</Text>
              </View>
            )}
          </View>
          <View style={styles.vocaSecondLine}>
            {data.wordTypes && data.wordTypes.length > 0 && (
              <Text style={styles.vocaType}>
                {data.wordTypes.map((t) => typeof t === 'string' ? t : t.type).join(", ")}
              </Text>
            )}
            {(data.vnWord || data.translation) && (
              <Text style={styles.vocaTranslation}>
                {data.wordTypes && data.wordTypes.length > 0 ? " · " : ""}
                {data.vnWord || data.translation}
              </Text>
            )}
          </View>
        </View>
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
                  : `${Math.round(
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
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterContainer}
            >
              {[
                { label: "Tất cả", value: "ALL" },
                { label: "Đang học", value: "LEARNING" },
                { label: "Thành thạo", value: "MASTERED" },
              ].map((filter) => (
                <TouchableOpacity
                  key={filter.value}
                  onPress={() => setActiveVocaStatus(filter.value)}
                  style={[
                    styles.filterChip,
                    activeVocaStatus === filter.value && styles.filterChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      activeVocaStatus === filter.value && styles.filterChipTextActive,
                    ]}
                  >
                    {filter.label}
                  </Text>
                  <Text
                    style={[
                      styles.filterChipCount,
                      activeVocaStatus === filter.value && styles.filterChipCountActive,
                    ]}
                  >
                    {vocaCounts[filter.value]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text variant="titleLarge" style={styles.sectionTitle}>
              📚 Danh sách từ vựng
            </Text>
            {vocabularyProgress?.length === 0 ? (
              <Card>
                <Card.Content style={styles.emptyStateContainer}>
                  <Text variant="bodyMedium" style={styles.emptyStateText}>
                    Không có từ vựng nào trong danh mục này
                  </Text>
                </Card.Content>
              </Card>
            ) : (
              vocabularyProgress?.map((item) => (
                <VocabularyProgressCard
                  key={item.id}
                  item={item}
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
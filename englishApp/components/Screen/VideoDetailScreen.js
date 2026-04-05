import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Card, Chip, IconButton } from "react-native-paper";
import YoutubePlayer from "react-native-youtube-iframe";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Loading from "../layout/Loading";
import styles from "../../styles/VideoDetailStyles";

const VideoDetailScreen = ({
  video,
  subtitles,
  error,
  loading,
  selectedSubtitle,
  translatedTexts,
  translatingIds,
  playing,
  handleGoBack,
  loadData,
  handleSubtitleClick,
  translateText,
  formatTime,
  handleStateChange,
  playerRef,
  videoId,
  initialTime,
}) => {
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Loading />
          <Text style={styles.loadingText}>Loading topic details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadData}>
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!video) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContent}>
          <Text style={styles.noVideoText}>Không tìm thấy video</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusInfo = (progress, isCompleted) => {
    if (isCompleted) {
      return { text: "Hoàn thành", bgColor: "#e8f5e9", textColor: "#2e7d32" };
    }
    if (progress > 0) {
      return { text: "Đang học", bgColor: "#e3f2fd", textColor: "#1565c0" };
    }
    return { text: "Mới", bgColor: "#e8f5e9", textColor: "#2e7d32" };
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const statusInfo = video ? getStatusInfo(video.progressPercentage, video.isCompleted) : null;
  const progress = video?.progressPercentage || 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitleMain}>{video?.title || "Topic Details"}</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView style={styles.container}>
        <Card style={styles.videoCard}>
          <Card.Content>
            <View style={styles.videoPlayerContainer}>
              <YoutubePlayer
                ref={playerRef}
                height={220} // Approximate 16:9 for most devices
                play={playing}
                videoId={videoId}
                onChangeState={handleStateChange}
                initialPlayerParams={{
                  start: Math.round(initialTime),
                  rel: 0,
                  modestbranding: 1,
                }}
              />
            </View>

            <Text variant="titleLarge" style={styles.videoTitle}>
              {video.title}
            </Text>

            <View style={styles.videoInfo}>
              <View style={styles.infoItem}>
                <IconButton icon="clock-outline" size={16} />
                <Text style={styles.infoText}>
                  {formatTime(video.duration)}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <IconButton icon="web" size={16} />
                <Text style={styles.infoText}>
                  {video.language.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.badgesRow}>
              <View style={styles.badgeSegments}>
                <Text style={styles.badgeSegmentsText}>{video.segmentsCount || subtitles?.length || 0} segments</Text>
              </View>
              <View style={[styles.badgeStatus, { backgroundColor: statusInfo?.bgColor }]}>
                <Text style={[styles.badgeStatusText, { color: statusInfo?.textColor }]}>
                  {statusInfo?.text}
                </Text>
              </View>
              <Text style={styles.dateText}>{formatDate(video.createdAt)}</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </Card.Content>
        </Card>

        {/* Subtitles Card */}
        <Card style={styles.subtitlesCard}>
          <View style={styles.subtitlesHeader}>
            <IconButton icon="closed-caption" iconColor="white" />
            <Text style={styles.subtitlesHeaderText}>
              Phụ Đề - Nhấn để dịch và chuyển đến thời điểm
            </Text>
          </View>

          <View style={styles.subtitlesContainer}>
            <ScrollView
              style={styles.subtitlesList}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >
              {subtitles.map((subtitle) => (
                <SubtitleItem
                  key={subtitle.segmentId}
                  subtitle={subtitle}
                  selectedSubtitle={selectedSubtitle}
                  translatedTexts={translatedTexts}
                  translatingIds={translatingIds}
                  onSubtitleClick={handleSubtitleClick}
                  onTranslateText={translateText}
                  formatTime={formatTime}
                />
              ))}
            </ScrollView>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const SubtitleItem = ({
  subtitle,
  selectedSubtitle,
  translatedTexts,
  translatingIds,
  onSubtitleClick,
  onTranslateText,
  formatTime,
}) => {
  const isSelected = selectedSubtitle?.segmentId === subtitle.segmentId;
  const isTranslating = translatingIds.has(subtitle.segmentId);
  const translatedText = translatedTexts[subtitle.segmentId];

  return (
    <TouchableOpacity
      onPress={() => onSubtitleClick(subtitle)}
      style={[styles.subtitleItem, isSelected && styles.selectedSubtitle]}
    >
      <View style={styles.subtitleContent}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {formatTime(subtitle.startTime)} - {formatTime(subtitle.endTime)}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text variant="bodyMedium" style={styles.subtitleText}>
            {subtitle.originalText}
          </Text>

          {translatedText && (
            <Text variant="bodyMedium" style={styles.translatedText}>
              {translatedText}
            </Text>
          )}

          {isTranslating && (
            <Text style={styles.translatingText}>Đang dịch...</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.translateButton}
          onPress={() => onTranslateText(subtitle)}
          disabled={isTranslating}
        >
          <IconButton
            icon={translatedText ? "check-circle" : "translate"}
            size={24}
            iconColor={translatedText ? "#e53935" : "#7e2222"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default VideoDetailScreen;

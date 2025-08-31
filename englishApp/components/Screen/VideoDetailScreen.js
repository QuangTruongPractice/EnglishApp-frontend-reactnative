import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph, Chip, IconButton } from "react-native-paper";
import { WebView } from "react-native-webview";
import styles from "../../styles/VideoDetailStyles";

const VideoDetailScreen = ({
  // Data props
  video,
  subtitles,
  error,
  loading,
  selectedSubtitle,
  translatedTexts,
  translatingIds,
  
  // Function props
  loadData,
  handleSubtitleClick,
  translateText,
  formatTime,
  handleWebViewMessage,
  
  // Ref props
  webViewRef,
  
  // Generated content
  youtubeHTML,
}) => {
  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadData}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // No video state
  if (!video) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.noVideoText}>Không tìm thấy video</Text>
      </View>
    );
  }

  // Main render
  return (
    <ScrollView style={styles.container}>
      {/* Video Card */}
      <Card style={styles.videoCard}>
        <Card.Content>
          <View style={styles.videoPlayerContainer}>
            <WebView
              ref={webViewRef}
              style={styles.videoPlayer}
              source={{ html: youtubeHTML }}
              onMessage={handleWebViewMessage}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              allowsFullscreenVideo={true}
              mediaPlaybackRequiresUserAction={false}
            />
          </View>

          <Title style={styles.videoTitle}>{video.title}</Title>

          <View style={styles.videoInfo}>
            <View style={styles.infoItem}>
              <IconButton icon="clock-outline" size={16} />
              <Text style={styles.infoText}>{formatTime(video.duration)}</Text>
            </View>
            <View style={styles.infoItem}>
              <IconButton icon="web" size={16} />
              <Text style={styles.infoText}>
                {video.language.toUpperCase()}
              </Text>
            </View>
            <Chip mode="flat" style={styles.statusChip}>
              {video.status}
            </Chip>
          </View>
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
  );
};

// Subtitle Item Component
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
      style={[
        styles.subtitleItem,
        isSelected && styles.selectedSubtitle,
      ]}
    >
      <View style={styles.subtitleContent}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {formatTime(subtitle.startTime)} - {formatTime(subtitle.endTime)}
          </Text>
        </View>
        
        <View style={styles.textContainer}>
          <Paragraph style={styles.subtitleText}>
            {subtitle.originalText}
          </Paragraph>
          
          {translatedText && (
            <Paragraph style={styles.translatedText}>
              {translatedText}
            </Paragraph>
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
            iconColor={translatedText ? "#4caf50" : "#26a69a"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default VideoDetailScreen;
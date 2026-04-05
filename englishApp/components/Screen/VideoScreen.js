import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SharedHeader from "../layout/SharedHeader";
import styles from "../../styles/VideoStyles";
import Loading from "../layout/Loading";

const VideoScreen = ({
  videos,
  userProfile,
  summary,
  loading,
  error,
  q,
  refreshing,
  onRefresh,
  onRetry,
  onSearch,
  onLoadMore,
}) => {
  const nav = useNavigation();

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const getStatusInfo = (progress, isCompleted) => {
    if (isCompleted) {
      return { text: "Hoàn thành", bgColor: "#e8f5e9", textColor: "#2e7d32" };
    }
    if (progress > 0) {
      return { text: "Đang học", bgColor: "#e3f2fd", textColor: "#1565c0" };
    }
    return { text: "Mới", bgColor: "#e8f5e9", textColor: "#2e7d32" };
  };

  const renderVideoItem = ({ item }) => {
    const statusInfo = getStatusInfo(item.progressPercentage, item.isCompleted);
    const progress = item.progressPercentage || 0;

    return (
      <TouchableOpacity
        style={styles.videoCard}
        onPress={() => nav.navigate("VideoDetail", { videoId: item.id })}
        activeOpacity={0.8}
      >
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg` }}
            style={styles.thumbnail}
          />
          <View style={styles.playIconOverlay}>
            <View style={styles.playButton}>
              <Ionicons name="play" size={24} color="#fff" style={{ marginLeft: 3 }} />
            </View>
          </View>
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{formatDuration(item.duration)}</Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <View style={styles.badgesRow}>
            <View style={styles.badgeSegments}>
              <Text style={styles.badgeSegmentsText}>{item.segmentsCount} segments</Text>
            </View>
            <View style={[styles.badgeStatus, { backgroundColor: statusInfo.bgColor }]}>
              <Text style={[styles.badgeStatusText, { color: statusInfo.textColor }]}>
                {statusInfo.text}
              </Text>
            </View>
            <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && videos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
        <Text style={styles.loadingText}>Đang tải videos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <SharedHeader 
          greetingText="Học qua nội dung thực tế" 
          nameText="Video Học Tiếng Anh" 
          userProfile={userProfile} 
          summary={summary}
        />

        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Tìm Videos..."
            onChangeText={onSearch}
            value={q}
            style={styles.searchBar}
            iconColor="#f45b69"
          />
        </View>

        {error && videos.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button
              mode="contained"
              onPress={onRetry}
              buttonColor="#f45b69"
              style={styles.retryButton}
            >
              Thử lại
            </Button>
          </View>
        ) : (
          <FlatList
            data={videos}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            onEndReachedThreshold={0.5}
            onEndReached={onLoadMore}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#f45b69"]}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default VideoScreen;

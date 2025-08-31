import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/VideoStyles";
import Loading from "../layout/Loading";

const VideoScreen = ({
  videos,
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

  const renderVideoItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => nav.navigate("VideoDetail", { videoId: item.id })}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View
          style={[
            styles.leftBorder,
            { backgroundColor: index % 2 === 0 ? "#f45b69" : "#4a90e2" },
          ]}
        />
        <View style={styles.contentArea}>
          <View style={styles.topRow}>
            <Text style={styles.videoTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={styles.indexBadge}>
              <Text style={styles.indexText}>{index + 1}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.infoText}>{item.duration}s</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="film-outline" size={16} color="#666" />
              <Text style={styles.infoText}>{item.segmentsCount} segments</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="language-outline" size={16} color="#666" />
              <Text style={styles.infoText}>{item.language?.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
        <Text style={styles.loadingText}>Đang tải videos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button
          mode="contained"
          onPress={onRetry}
          buttonColor="#f45b69"
          style={styles.retryButton}
        >
          Retry
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Tìm Videos..."
          onChangeText={onSearch}
          value={q}
          style={styles.searchBar}
        />
        <FlatList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.2}
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
      </View>
    </SafeAreaView>
  );
};

export default VideoScreen;

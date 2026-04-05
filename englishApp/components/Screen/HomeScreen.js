import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Card, Button, Searchbar, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import SharedHeader from "../layout/SharedHeader";
import Loading from "../layout/Loading";
import styles from "../../styles/HomeStyles";

const RECOMMENDED_COLORS = ["#A52A2A", "#1E40AF", "#6D28D9", "#047857"]; // Red, Blue, Purple, Green

const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0][0].toUpperCase();
};

const HomeScreen = ({
  mainTopics,
  recommendedTopics = [],
  userProfile,
  summary,
  q,
  setQ,
  search,
  loadMore,
  refreshing,
  onRefresh,
  loading,
  page,
  nav,
  error,
  retry,
}) => {
  const userName = userProfile?.fullName || userProfile?.username || "Learner";
  const initials = getInitials(userName);

  const getProgressColor = (pct) => {
    if (pct >= 100) return "#d32f2f"; // Red for completed
    if (pct === 0) return "#e0e0e0"; // Gray for 0%
    return "#3b82f6"; // Blue for in progress
  };

  const renderTopicItem = ({ item }) => {
    const progress = item.user_progress || {};
    const pct = progress.pct || 0;
    const isCompleted = pct >= 100;
    const progressColor = getProgressColor(pct);

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => nav.navigate("TopicDetail", { topicId: item.id })}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.cardIcon} />
            ) : (
              <IconButton icon="book" size={24} iconColor="#b83535" style={{margin: 0}}/>
            )}
          </View>
          <Text variant="titleMedium" style={styles.cardTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text variant="bodySmall" style={styles.cardSubtitle}>
            {progress.meanings_total || item.subTopicsCount * 10} nghĩa · {item.subTopicsCount || 0} chủ đề nhỏ
          </Text>
          
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${pct}%`, backgroundColor: progressColor }]} />
          </View>
          <Text style={isCompleted ? styles.progressTextCompleted : styles.progressText}>
            {isCompleted ? "Hoàn thành ✓" : `${pct}%`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderRecommendedItem = ({ item, index }) => {
    const progress = item.user_progress || {};
    const pct = progress.pct || 0;
    const bgColor = RECOMMENDED_COLORS[index % RECOMMENDED_COLORS.length];

    return (
      <View style={[styles.recommendedCard, { backgroundColor: bgColor, overflow: 'hidden' }]}>
        {/* Decor circles */}
        <View style={styles.recommendedDecorativeCircle1} />
        <View style={styles.recommendedDecorativeCircle2} />
        
        <TouchableOpacity
          onPress={() => nav.navigate("TopicDetail", { topicId: item.id })}
          activeOpacity={0.8}
          style={{ flex: 1, zIndex: 1 }}
        >
          <View style={styles.recommendedBadge}>
            <Text style={styles.recommendedBadgeText}>
              ★ PHÙ HỢP NHẤT
            </Text>
          </View>
          
          <View style={styles.recommendedIconContainer}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.recommendedIcon} />
            ) : (
              <Text style={{fontSize: 24}}>📚</Text>
            )}
          </View>
          
          <Text variant="titleLarge" style={styles.recommendedTitle} numberOfLines={1}>
            {item.name}
          </Text>
          
          <Text variant="bodySmall" style={styles.recommendedSubtitle}>
            {item.subTopicsCount || 0} chủ đề nhỏ
          </Text>
          
          <View style={styles.recommendedProgressWrapper}>
            <View style={styles.recommendedProgressBarContainer}>
              <View style={[styles.recommendedProgressBarFill, { width: `${pct}%` }]} />
            </View>
            <Text style={styles.recommendedProgressText}>
              {pct}% · {progress.meanings_learned || 0}/{progress.meanings_total || item.subTopicsCount * 10} nghĩa
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const HeaderComponent = () => (
    <View style={{ backgroundColor: "#fcf9f9", zIndex: 0 }}>
      <SharedHeader 
        greetingText="Chào buổi sáng ☀️" 
        nameText={userName} 
        userProfile={userProfile} 
        summary={summary}
      />

      {/* Shortcuts */}
      <View style={styles.shortcutsWrapper}>
        <TouchableOpacity
          style={styles.shortcutCard}
          activeOpacity={0.8}
          onPress={() => nav.navigate("LeaderBoard")}
        >
          <View style={{flexDirection: "row", alignItems: "center", flex: 1, paddingRight: 4}}>
            <View style={styles.shortcutIconContainerLeaderboard}>
              <Text style={{fontSize: 16}}>🏆</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.shortcutTitle} numberOfLines={1}>Bảng xếp hạng</Text>
              <Text style={styles.shortcutSubtitle} numberOfLines={1}>Hạng #{summary?.weeklyRank || "-"} tuần này</Text>
            </View>
          </View>
          <Text style={{color: "#cbd5e1", fontSize: 18}}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shortcutCard}
          activeOpacity={0.8}
          onPress={() => nav.navigate("SaveVocabulary")}
        >
          <View style={{flexDirection: "row", alignItems: "center", flex: 1, paddingRight: 4}}>
             <View style={styles.shortcutIconContainerSaved}>
              <Text style={{fontSize: 16}}>🔖</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.shortcutTitle} numberOfLines={1}>Từ đã lưu</Text>
              <Text style={styles.shortcutSubtitle} numberOfLines={1}>{summary?.savedVocabularyCount || 0} từ yêu thích</Text>
            </View>
          </View>
           <Text style={{color: "#cbd5e1", fontSize: 18}}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Lesson Card */}
      <TouchableOpacity 
        style={styles.dailyLessonWrapper}
        activeOpacity={0.9}
        onPress={() => nav.navigate("DailySession")}
      >
        <View style={styles.dailyBadge}>
          <Text>🚀</Text>
          <Text style={styles.dailyBadgeText}>MỤC TIÊU HÔM NAY</Text>
        </View>
        
        <View style={styles.dailyTitleRow}>
          <View style={styles.dailyTitleIconContainer}>
            <Text style={styles.dailyTitleIcon}>📋</Text>
          </View>
          <Text style={styles.dailyTitle}>Bắt đầu ngày mới</Text>
        </View>
        
        <Text style={styles.dailySubtitle}>15 từ vựng mới · 15 phút luyện tập</Text>
        
        <Text style={styles.dailyDescription}>
          Duy trì streak của bạn bằng cách hoàn thành bài học hôm nay.
        </Text>

        <View style={styles.dailyButton}>
          <Text style={styles.dailyButtonText}>▶ Bắt đầu bài học</Text>
        </View>
      </TouchableOpacity>

      {/* Recommended Topics Horizontal List */}
      {recommendedTopics.length > 0 && !q && (
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Đề xuất cho bạn</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.sectionLink}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recommendedTopics}
            keyExtractor={(item) => `rec-${item.id}`}
            contentContainerStyle={styles.horizontalList}
            renderItem={renderRecommendedItem}
          />
        </View>
      )}

      {mainTopics.length > 0 && (
        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Tất cả chủ đề</Text>
        </View>
      )}
    </View>
  );

  if (loading && page === 1) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: "#f9a9a9" }]}>
        <Loading />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button mode="contained" onPress={retry} buttonColor="#b83535">Thử lại</Button>
          </View>
        ) : (
          <FlatList
            data={mainTopics}
            renderItem={renderTopicItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            ListHeaderComponent={HeaderComponent}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            onEndReached={loadMore}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#b83535"]}
              />
            }
            ListFooterComponent={loading && page > 1 ? <Loading /> : null}
            ListEmptyComponent={!loading && mainTopics.length === 0 && recommendedTopics.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không tìm thấy chủ đề nào</Text>
              </View>
            ) : null}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

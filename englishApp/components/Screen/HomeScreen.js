import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { Card, Button, Searchbar, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../layout/Loading";
import styles from "../../styles/HomeStyles";

const HomeScreen = ({
  mainTopics,
  recommendedTopics = [],
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
  const renderTopicItem = ({ item }) => (
    <Card style={styles.card} elevation={2}>
      <TouchableOpacity
        onPress={() => nav.navigate("TopicDetail", { topicId: item.id })}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image || "https://res.cloudinary.com/dabb0yavq/image/upload/v1755275281/logo_png_oknyol.png" }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {item.subTopicsCount || 0} subtopics
          </Text>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );

  const HeaderComponent = () => (
    <View>
      {/* Shortcuts Section */}
      <View style={styles.shortcutContainer}>
        {/* Daily Practice */}
        <TouchableOpacity
          style={styles.dailyPracticeButton}
          activeOpacity={0.9}
          onPress={() => nav.navigate("DailySession")}
        >
          <View style={styles.dailyPracticeTextContainer}>
            <Text style={styles.dailyPracticeTitle}>
              Học tập hàng ngày 🚀
            </Text>
            <Text style={styles.dailyPracticeSubtitle}>
              Hoàn thành mục tiêu hôm nay!
            </Text>
          </View>
          <IconButton icon="play-circle" iconColor="#fff" size={32} style={{ margin: 0 }} />
        </TouchableOpacity>

        {/* Saved Vocabulary */}
        <TouchableOpacity
          style={styles.savedVocaButton}
          activeOpacity={0.8}
          onPress={() => nav.navigate("SaveVocabulary")}
        >
          <IconButton icon="bookmark" iconColor="#6366f1" size={28} style={{ margin: 0 }} />
          <Text style={styles.savedVocaText}>Từ vựng đã lưu</Text>
        </TouchableOpacity>
      </View>

      {/* Recommended Topics */}
      {recommendedTopics.length > 0 && !q && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Chủ đề đề xuất cho bạn</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {recommendedTopics.map((item) => (
              <View key={`rec-${item.id}`} style={{ width: '48%', marginBottom: 16 }}>
                {renderTopicItem({ item })}
              </View>
            ))}
          </View>
        </View>
      )}

      {mainTopics.length > 0 && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Các chủ đề khác</Text>
        </View>
      )}
    </View>
  );

  if (loading && page === 1) {
    return (
      <View style={styles.centerContainer}>
        <Loading />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Tìm Topics..."
            onChangeText={(t) => search(t, setQ)}
            value={q}
            style={[styles.searchBar, styles.searchBarWithIcon]}
          />
          <IconButton
            icon="trophy"
            size={24}
            iconColor="#f45b69"
            style={styles.leaderboardIcon}
            onPress={() => nav.navigate("LeaderBoard")}
          />
        </View>

        {error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button mode="contained" onPress={retry} buttonColor="#f45b69">Thử lại</Button>
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
                colors={["#f45b69"]}
              />
            }
            ListFooterComponent={loading && page > 1 ? <Loading /> : null}
            ListEmptyComponent={!loading && mainTopics.length === 0 && recommendedTopics.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không có dữ liệu</Text>
              </View>
            ) : null}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
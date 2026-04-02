import { useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/TopicDetailStyles";
import { LinearGradient } from 'expo-linear-gradient';
import Loading from "../layout/Loading";
import { formatDate } from "../../utils/formatters";
import { CARD_COLORS } from "../../constants/theme";

const TopicDetailScreen = ({
  loading,
  error,
  topicInfo,
  subTopics,
  refreshing,
  onRefresh,
  reload,
  onGoBack,
}) => {
  const nav = useNavigation();

  const renderSubTopicItem = useCallback(({ item, index }) => {
    const cardColor = CARD_COLORS[index % CARD_COLORS.length];

    return (
      <TouchableOpacity
        key={`subtopic-${item.id}`}
        style={[styles.subTopicCard, { backgroundColor: cardColor }]}
        onPress={() => nav.navigate("SubTopicDetail", { subTopicId: item.id })}
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel={`Subtopic: ${item.name}`}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
          style={styles.cardContent}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.subTopicName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.indexBadge}>
              <Text style={styles.indexText}>#{index + 1}</Text>
            </View>
          </View>

          <View style={styles.cardStats}>
            <View style={styles.statItem}>
              <Ionicons name="calendar-outline" size={16} color="#fff" />
              <Text style={styles.statText}>{formatDate(item.createdAt)}</Text>
            </View>

            {item.vocabularyCount && (
              <View style={styles.statItem}>
                <Ionicons name="book-outline" size={16} color="#fff" />
                <Text style={styles.statText}>{item.vocabularyCount} words</Text>
              </View>
            )}
          </View>

          <View style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore</Text>
            <Ionicons name="arrow-forward" size={16} color="#1a1a1a" style={styles.exploreIcon} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }, [nav]);

  const listHeader = useMemo(() => (
    <View style={styles.heroSection}>
      {topicInfo?.image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: topicInfo.image || "https://res.cloudinary.com/dabb0yavq/image/upload/v1755275281/logo_png_oknyol.png" }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
            style={styles.gradientOverlay}
          />
        </View>
      )}

      <View style={[StyleSheet.absoluteFill, { justifyContent: 'flex-end' }]}>
        <View style={styles.heroContent}>
          <Text
            style={styles.heroTitle}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {topicInfo?.name || "Topic"}
          </Text>

          <View style={styles.heroStats}>
            <View style={styles.statBadge}>
              <Ionicons name="layers-outline" size={18} color="#fff" />
              <Text style={styles.heroStatText}>
                {topicInfo?.subTopicsCount || subTopics.length} Subtopics
              </Text>
            </View>

            <View style={styles.statBadge}>
              <Ionicons name="time-outline" size={18} color="#fff" />
              <Text style={styles.heroStatText}>
                Last updated {formatDate(topicInfo?.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  ), [topicInfo, subTopics.length]);

  const listEmpty = useMemo(() => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyContent}>
        <Ionicons name="library-outline" size={64} color="#ccc" />
        <Text style={styles.emptyTitle}>No Subtopics Available</Text>
        <Text style={styles.emptyText}>
          This topic doesn&apos;t have any subtopics yet.
        </Text>
      </View>
    </View>
  ), []);

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
        <View style={styles.errorContainer}>
          <View style={styles.errorContent}>
            <Ionicons name="cloud-offline-outline" size={80} color="#fff" />
            <Text style={styles.errorTitle}>Something went wrong</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={reload}>
              <View style={styles.retryButtonContent}>
                <Ionicons name="refresh" size={20} color="#fff" />
                <Text style={styles.retryButtonText}>Try Again</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onGoBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitleMain} numberOfLines={1}>
            {topicInfo?.name}
          </Text>
        </View>
        
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={subTopics}
        keyExtractor={(item) => `subtopic-${item.id}`}
        renderItem={renderSubTopicItem}
        ListHeaderComponent={listHeader}
        ListFooterComponent={<View style={{ height: 40 }} />}
        ListEmptyComponent={listEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        ListHeaderComponentStyle={{ marginBottom: 0 }}
        style={{ flex: 1 }}
        CellRendererComponent={({ children, ...props }) => {
          return <View {...props}>{children}</View>
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#F45B69FF"]}
            tintColor="#F45B69FF"
          />
        }
      />
    </SafeAreaView>
  );
};

export default TopicDetailScreen;

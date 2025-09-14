import {
  View,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/TopicDetailStyles";
import Loading from "../layout/Loading";

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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderSubTopicItem = (item, index) => {
    const colors = [
      "#F45B69FF",
      "#FF7B72FF", 
      "#FF9E80FF", 
      "#FFB6B9FF", 
      "#D7263DFF", 
      "#FFA69EFF", 
    ];
    
    const cardColor = colors[index % colors.length];

    return (
      <TouchableOpacity
        key={`subtopic-${item.id}`}
        style={[styles.subTopicCard, { backgroundColor: cardColor }]}
        onPress={() => nav.navigate("SubTopicDetail", { subTopicId: item.id })}
        activeOpacity={0.8}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.subTopicName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.indexBadge}>
              <Text style={styles.indexText}>{index + 1}</Text>
            </View>
          </View>

          <View style={styles.cardStats}>
            <View style={styles.statItem}>
              <Ionicons name="calendar" size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.statText}>{formatDate(item.createdAt)}</Text>
            </View>

            {item.vocabularyCount && (
              <View style={styles.statItem}>
                <Ionicons name="book" size={14} color="rgba(255,255,255,0.8)" />
                <Text style={styles.statText}>{item.vocabularyCount} words</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() =>
              nav.navigate("SubTopicDetail", { subTopicId: item.id })
            }
          >
            <Text style={styles.exploreButtonText}>Explore Now</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

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
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitleMain}>{topicInfo?.name || "Topic Details"}</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#F45B69FF"]}
            tintColor="#F45B69FF"
          />
        }
      >
        <View style={styles.heroSection}>
          {topicInfo?.image && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: topicInfo.image }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <View style={styles.imageOverlay} />
            </View>
          )}

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{topicInfo?.name || "Topic"}</Text>
            
            <View style={styles.heroStats}>
              <View style={styles.statBadge}>
                <Ionicons name="folder" size={16} color="#F45B69FF" />
                <Text style={styles.heroStatText}>
                  {topicInfo?.subTopicsCount || subTopics.length} Subtopics
                </Text>
              </View>

              <View style={styles.statBadge}>
                <Ionicons name="calendar" size={16} color="#F45B69FF" />
                <Text style={styles.heroStatText}>
                  {formatDate(topicInfo?.createdAt)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {subTopics.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyContent}>
                <Ionicons name="library-outline" size={64} color="#ccc" />
                <Text style={styles.emptyTitle}>No Subtopics Available</Text>
                <Text style={styles.emptyText}>
                  This topic doesn't have any subtopics yet.
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.subtopicsSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Subtopics</Text>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionCount}>{subTopics.length}</Text>
                </View>
              </View>

              <View style={styles.subtopicsList}>
                {subTopics.map((item, index) => renderSubTopicItem(item, index))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopicDetailScreen;
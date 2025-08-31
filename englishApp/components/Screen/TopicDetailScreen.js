import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  RefreshControl,
} from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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

  const renderSubTopicItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.subTopicCard}
      onPress={() => nav.navigate("SubTopicDetail", { subTopicId: item.id })}
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
            <Text style={styles.subTopicName}>{item.name}</Text>
            <View style={styles.indexBadge}>
              <Text style={styles.indexText}>{index + 1}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.infoText}>{formatDate(item.createdAt)}</Text>
            </View>

            {item.vocabularyCount && (
              <View style={styles.infoItem}>
                <Ionicons name="book-outline" size={16} color="#666" />
                <Text style={styles.infoText}>{item.vocabularyCount} words</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              nav.navigate("SubTopicDetail", { subTopicId: item.id })
            }
          >
            <Text style={styles.viewButtonText}>Explore Vocabulary</Text>
            <Ionicons name="chevron-forward" size={16} color="#f45b69" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Loading />
          <Text style={styles.loadingText}>Loading topic details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#f45b69" />
          <Text style={styles.errorText}>{error}</Text>
          <Button
            mode="contained"
            onPress={reload}
            buttonColor="#f45b69"
            style={styles.retryButton}
          >
            Retry
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topicInfoSection}>
          {topicInfo?.image && (
            <Image
              source={{ uri: topicInfo.image }}
              style={styles.topicImage}
              resizeMode="cover"
            />
          )}

          <View style={styles.topicInfoContent}>
            <Text style={styles.mainTitle}>{topicInfo?.name || "Topic"}</Text>

            <View style={styles.topicStats}>
              <View style={styles.statItem}>
                <Ionicons name="folder-outline" size={18} color="#f45b69" />
                <Text style={styles.statText}>
                  {topicInfo?.subTopicsCount || subTopics.length} Subtopics
                </Text>
              </View>

              <View style={styles.statItem}>
                <Ionicons name="calendar-outline" size={18} color="#666" />
                <Text style={styles.statText}>
                  Created {formatDate(topicInfo?.createdAt)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {subTopics.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No subtopics available</Text>
            <Text style={styles.emptySubtext}>
              This topic doesn't have any subtopics yet.
            </Text>
          </View>
        ) : (
          <View style={styles.listSection}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Subtopics</Text>
              <Text style={styles.listCount}>{subTopics.length} available</Text>
            </View>

            <FlatList
              data={subTopics}
              renderItem={renderSubTopicItem}
              keyExtractor={(item) => `subtopic-${item.id}`}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#f45b69"]}
                />
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TopicDetailScreen;

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/SubTopicDetailStyles";
import Loading from "../layout/Loading";

const SubTopicDetailScreen = ({
  loading,
  error,
  subTopicInfo,
  vocabularies,
  refreshing,
  onRefresh,
  onRetry,
  onNavigateVocabulary,
}) => {
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Loading />
        <Text style={styles.loadingText}>Loading vocabularies...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={onRetry} style={styles.retryButton}>
          Retry
        </Button>
      </View>
    );
  }

  const renderVocabularyItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.subTopicCard}
      onPress={() => onNavigateVocabulary(item.id)}
      activeOpacity={0.7}
    >
      <View key={index} style={styles.vocabularyCard}>
        <View style={styles.leftBorder} />
        <View style={styles.vocabularyContent}>
          <Text style={styles.vocabularyWord}>
            {item.word}
            {item.wordTypes && item.wordTypes.length > 0 && (
              <Text style={styles.wordType}>
                {" (" +
                  item.wordTypes
                    .map((type) => type.type.toLowerCase().charAt(0))
                    .join(", ") +
                  ")"}
              </Text>
            )}
          </Text>
          <Text style={styles.vocabularyDefinition}>{item.definition}</Text>
          {item.example && (
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleText}>"{item.example}"</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#f45b69"]}
        />
      }
    >
      <View style={styles.topicInfoSection}>
        <Text style={styles.mainTitle}>{subTopicInfo?.name}</Text>
        <View style={styles.vocabularyCountContainer}>
          <Ionicons name="book-outline" size={16} color="#4A90E2" />
          <Text style={styles.vocabularyCountText}>
            {vocabularies.length} vocabulary words
          </Text>
        </View>
      </View>

      <View style={styles.vocabularySection}>
        <Text style={styles.sectionTitle}>Vocabulary</Text>

        {vocabularies.length > 0 ? (
          vocabularies.map((item, index) =>
            renderVocabularyItem({ item, index })
          )
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No vocabulary found</Text>
            <Text style={styles.emptySubtext}>
              Vocabulary words will appear here when available.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SubTopicDetailScreen;

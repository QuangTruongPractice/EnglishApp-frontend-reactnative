import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
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
  onGoBack,
}) => {

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderVocabularyItem = (item, index) => {
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
        key={`vocabulary-${item.id}`}
        style={[styles.vocabularyCard, { borderLeftColor: cardColor }]}
        onPress={() => onNavigateVocabulary(item.id)}
        activeOpacity={0.8}
      >
        <View style={[styles.leftBorder, { backgroundColor: cardColor }]} />
        <View style={styles.vocabularyContent}>
          <View style={styles.vocabularyHeader}>
            <View style={styles.wordContainer}>
              <Text style={styles.vocabularyWord}>{item.word}</Text>
              {item.type && (
                <View
                  style={[styles.typeBadge, { backgroundColor: cardColor }]}
                >
                  <Text style={styles.typeText}>{item.type}</Text>
                </View>
              )}
            </View>
            <View style={styles.indexContainer}>
              <Text style={styles.indexNumber}>{index + 1}</Text>
            </View>
          </View>

          {item.definition && (
            <Text style={styles.vocabularyDefinition} numberOfLines={2}>
              {item.definition}
            </Text>
          )}

          {item.example && (
            <View style={styles.exampleContainer}>
              <Ionicons name="quote" size={14} color="#666" />
              <Text style={styles.exampleText} numberOfLines={1}>
                {item.example}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.learnButton, { backgroundColor: cardColor }]}
            onPress={() => onNavigateVocabulary(item.id)}
          >
            <Text style={styles.learnButtonText}>Learn More</Text>
            <Ionicons name="arrow-forward" size={14} color="#fff" />
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
          <Text style={styles.loadingText}>Loading vocabularies...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <View style={styles.errorContent}>
            <Ionicons name="book-outline" size={80} color="#fff" />
            <Text style={styles.errorTitle}>Unable to Load</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
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
        <Text style={styles.headerTitleMain}>
          {subTopicInfo?.name || "Subtopic Details"}
        </Text>
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
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              {subTopicInfo?.name || "Subtopic"}
            </Text>

            <View style={styles.heroStats}>
              <View style={styles.statBadge}>
                <Ionicons name="book" size={16} color="#F45B69FF" />
                <Text style={styles.heroStatText}>
                  {subTopicInfo?.vocabularyCount || vocabularies.length} Words
                </Text>
              </View>

              <View style={styles.statBadge}>
                <Ionicons name="calendar" size={16} color="#F45B69FF" />
                <Text style={styles.heroStatText}>
                  {formatDate(subTopicInfo?.createdAt)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {vocabularies.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyContent}>
                <Ionicons name="book-outline" size={64} color="#ccc" />
                <Text style={styles.emptyTitle}>No Vocabularies Available</Text>
                <Text style={styles.emptyText}>
                  This subtopic doesn't have any vocabularies yet.
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.vocabulariesSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Vocabularies</Text>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionCount}>{vocabularies.length}</Text>
                </View>
              </View>

              <View style={styles.vocabulariesList}>
                {vocabularies.map((item, index) =>
                  renderVocabularyItem(item, index)
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubTopicDetailScreen;

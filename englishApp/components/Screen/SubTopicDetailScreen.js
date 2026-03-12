import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  TextInput,
} from "react-native";
import { useState, useMemo, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/SubTopicDetailStyles";
import Loading from "../layout/Loading";
import { formatDate } from "../../utils/formatters";
import { CARD_COLORS } from "../../constants/theme";

const SubTopicDetailScreen = ({
  loading,
  error,
  subTopicInfo,
  vocabularies,
  refreshing,
  onRefresh,
  onRetry,
  onToggleSave,
  onNavigateVocabulary,
  onGoBack,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVocabularies = useMemo(() => 
    vocabularies.filter(v => 
      v.word?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      v.definition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vnWord?.toLowerCase().includes(searchQuery.toLowerCase())
    ), [vocabularies, searchQuery]
  );

  const renderVocabularyItem = useCallback(({ item, index }) => {
    const cardColor = CARD_COLORS[index % CARD_COLORS.length];

    return (
      <TouchableOpacity
        key={`vocabulary-${item.id}`}
        style={styles.vocabularyCard}
        onPress={() => onNavigateVocabulary(item.id)}
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel={`Vocabulary: ${item.word}`}
      >
        <View style={styles.cardContent}>
          <View style={styles.vocabularyHeader}>
            <View style={styles.wordMainInfo}>
              <Text
                style={styles.vocabularyWord}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
              >
                {item.word}
              </Text>
              {item.phonetic && (
                <Text style={styles.vocabularyPhonetic} numberOfLines={1}>
                  {item.phonetic}
                </Text>
              )}
              <View style={styles.badgeRow}>
                {item.level && (
                  <View style={[styles.levelBadge, { backgroundColor: cardColor }]}>
                    <Text style={styles.levelText}>{item.level}</Text>
                  </View>
                )}
                <View style={styles.indexContainer}>
                  <Text style={styles.indexNumber}>#{index + 1}</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => onToggleSave(item.id)}
            >
              <Ionicons
                name={item.isSave ? "bookmark" : "bookmark-outline"}
                size={22}
                color={item.isSave ? cardColor : "#94a3b8"}
              />
            </TouchableOpacity>
          </View>

          {item.definition && (
            <Text style={styles.vocabularyDefinition} numberOfLines={2}>
              {item.definition}
            </Text>
          )}

          {item.example && (
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleText} numberOfLines={2}>
                &quot;{item.example}&quot;
              </Text>
            </View>
          )}

          <View style={[styles.learnButton, { backgroundColor: cardColor }]}>
            <Text style={styles.learnButtonText}>Learn More</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [onNavigateVocabulary, onToggleSave]);

  const listHeader = useMemo(() => (
    <View>
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text
            style={styles.heroTitle}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {subTopicInfo?.name || "Subtopic"}
          </Text>

          <View style={styles.heroStats}>
            <View style={styles.statBadge}>
              <Ionicons name="documents-outline" size={18} color="#475569" />
              <Text style={styles.heroStatText}>
                {subTopicInfo?.vocabularyCount || vocabularies.length} Words
              </Text>
            </View>

            <View style={styles.statBadge}>
              <Ionicons name="calendar-outline" size={18} color="#475569" />
              <Text style={styles.heroStatText}>
                {formatDate(subTopicInfo?.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#64748b" />
          <TextInput
            placeholder="Search words..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchText}
            placeholderTextColor="#94a3b8"
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Vocabulary List</Text>
        <View style={styles.sectionBadge}>
          <Text style={styles.sectionCount}>{filteredVocabularies.length} Items</Text>
        </View>
      </View>
    </View>
  ), [subTopicInfo, vocabularies, searchQuery, filteredVocabularies.length]);

  const listEmpty = useMemo(() => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyContent}>
        <Ionicons name="search-outline" size={64} color="#e2e8f0" />
        <Text style={styles.emptyTitle}>
          {searchQuery ? "No matches found" : "Empty list"}
        </Text>
        <Text style={styles.emptyText}>
          {searchQuery 
            ? `Couldn't find any results for "${searchQuery}"`
            : "This subtopic doesn&apos;t have any vocabulary yet."}
        </Text>
      </View>
    </View>
  ), [searchQuery]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Loading />
          <Text style={styles.loadingText}>Just a moment...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <View style={styles.errorContent}>
            <Ionicons name="warning-outline" size={80} color="#ef4444" />
            <Text style={styles.errorTitle}>Oops! Load failed</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
              <Text style={styles.retryButtonText}>Retry Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
          <Ionicons name="chevron-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitleMain} numberOfLines={1}>
            {subTopicInfo?.name}
          </Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={filteredVocabularies}
        keyExtractor={(item) => `vocabulary-${item.id}`}
        renderItem={renderVocabularyItem}
        ListHeaderComponent={listHeader}
        ListFooterComponent={<View style={{ height: 40 }} />}
        ListEmptyComponent={listEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        paddingHorizontal={20}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
          />
        }
      />
    </SafeAreaView>
  );
};

export default SubTopicDetailScreen;

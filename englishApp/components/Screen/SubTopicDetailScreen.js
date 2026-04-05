import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Platform,
  ScrollView,
} from "react-native";
import { useState, useMemo, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/SubTopicDetailStyles";
import Loading from "../layout/Loading";
import { formatDate } from "../../utils/formatters";

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
  const [filterLevel, setFilterLevel] = useState("All"); // "All" or "A1", "A2", etc.

  // Extract levels for filter chips
  const availableLevels = useMemo(() => {
    const levels = new Set(vocabularies.map(v => v.level).filter(Boolean));
    return ["All", ...Array.from(levels).sort()];
  }, [vocabularies]);

  const filteredVocabularies = useMemo(() => {
    if (filterLevel === "All") return vocabularies;
    return vocabularies.filter(v => v.level === filterLevel);
  }, [vocabularies, filterLevel]);

  // Extract progress from API safely
  const progressData = useMemo(() => {
    const raw = subTopicInfo?.user_progress;
    if (!raw) return { learned: 0, total: 1, pct: 0, status: "not_started" };
    return {
      learned: raw.meanings_learned ?? raw.meaningsLearned ?? 0,
      total: raw.meanings_total ?? raw.meaningsTotal ?? 1,
      pct: raw.pct ?? 0,
      status: raw.status ?? "not_started",
    };
  }, [subTopicInfo]);

  const renderVocabularyItem = useCallback(({ item, index }) => {
    return (
      <TouchableOpacity
        key={`vocabulary-${item.id}`}
        style={styles.vocabularyCard}
        onPress={() => onNavigateVocabulary(item.id)}
        activeOpacity={0.8}
        accessibilityRole="button"
      >
        <View style={styles.cardContent}>
          {/* Word & Phonetic */}
          <View style={styles.wordMainInfo}>
            <Text style={styles.vocabularyWord} numberOfLines={1}>
              {item.word}
            </Text>
            {item.phonetic && (
              <Text style={styles.vocabularyPhonetic} numberOfLines={1}>
                {item.phonetic}
              </Text>
            )}
          </View>
          
          {/* Level Badge aligned center-right */}
          <View style={styles.cardRight}>
            {item.level && (
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{item.level}</Text>
              </View>
            )}
            {/* Omitted the status mark per user request */}
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [onNavigateVocabulary]);

  const listHeader = useMemo(() => {
    const remaining = Math.max(0, progressData.total - progressData.learned);
    const isPerfect = progressData.pct >= 100;

    return (
      <View style={styles.headerBlock}>
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.heroTopActions}>
            <TouchableOpacity style={styles.backButton} onPress={onGoBack} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={20} color="#fff" />
              <Text style={styles.backButtonText} numberOfLines={1}>
                Social Basics › Chủ đề nhỏ
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.heroTopicBadge}>
            <Ionicons name="book" size={14} color="#fff" style={{ marginRight: 4 }} />
            <Text style={styles.heroTopicBadgeText}>CHỦ ĐỀ NHỎ • #{subTopicInfo?.id || 1}</Text>
          </View>
          <Text style={styles.heroTitle} numberOfLines={2}>
            {subTopicInfo?.name || "Subtopic"}
          </Text>
          <Text style={styles.heroSubtitle}>
            {subTopicInfo?.vocabularyCount || vocabularies.length} từ vựng • Tạo ngày {formatDate(subTopicInfo?.createdAt)}
          </Text>
        </View>

        {/* Dynamic Completed Banner */}
        {isPerfect && (
          <View style={styles.completedBanner}>
            <View style={styles.bannerIconBox}>
              <Text style={styles.bannerEmoji}>🎉</Text>
            </View>
            <View style={styles.bannerTextCol}>
              <Text style={styles.bannerTitle}>Hoàn thành 100%</Text>
              <Text style={styles.bannerSubtitle}>Bạn đã học xong tất cả từ trong chủ đề này!</Text>
            </View>
          </View>
        )}

        {/* PROGRESS CARD */}
        <View style={styles.progressCard}>
          <View style={styles.progressRowTop}>
            <Text style={styles.progressLabel}>Tiến độ học</Text>
            <View style={styles.fractionBox}>
              <Text style={styles.fractionHighlight}>{progressData.learned}</Text>
              <Text style={styles.fractionTotal}> / {progressData.total} nghĩa</Text>
            </View>
          </View>
          
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressData.pct}%` }]} />
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <Text style={styles.statVal}>{progressData.learned}</Text>
              <Text style={styles.statLabel}>ĐÃ HỌC</Text>
            </View>
            <View style={styles.statDiv} />
            <View style={styles.statCol}>
              <Text style={styles.statVal}>{remaining}</Text>
              <Text style={styles.statLabel}>CÒN LẠI</Text>
            </View>
            <View style={styles.statDiv} />
            <View style={styles.statCol}>
              <Text style={styles.statVal}>{progressData.pct.toFixed(0)}%</Text>
              <Text style={styles.statLabel}>HOÀN THÀNH</Text>
            </View>
          </View>
          {/* Note: Interactive CTA buttons intentionally removed per user request */}
        </View>

        {/* VOCABULARY LIST HEADER WITH FILTERS */}
        <View style={styles.listHeaderSection}>
          <Text style={styles.listTitle}>Danh sách từ vựng</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {availableLevels.map(level => {
              const isActive = filterLevel === level;
              const displayName = level === "All" ? "Tất cả" : level;
              return (
                <TouchableOpacity
                  key={level}
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                  onPress={() => setFilterLevel(level)}
                >
                  <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                    {displayName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }, [subTopicInfo, vocabularies, progressData, onGoBack, availableLevels, filterLevel]);

  const listEmpty = useMemo(() => (
    <View style={styles.emptyContainer}>
      <Ionicons name="documents-outline" size={64} color="#cbd5e1" />
      <Text style={styles.emptyTitle}>Chưa có dữ liệu</Text>
      <Text style={styles.emptyText}>
        {filterLevel !== "All" ? `Không tìm thấy từ vựng nào thuộc cấp độ ${filterLevel}.` : "Subtopic này chưa có danh sách từ vựng."}
      </Text>
    </View>
  ), [filterLevel]);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Loading />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={64} color="#f43f5e" />
          <Text style={styles.errorTitle}>Lấy dữ liệu thất bại</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
            <Text style={styles.retryBtnText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={filteredVocabularies}
        keyExtractor={(item) => `vocabulary-${item.id}`}
        renderItem={renderVocabularyItem}
        ListHeaderComponent={listHeader}
        ListFooterComponent={<View style={{ height: 60 }} />}
        ListEmptyComponent={listEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        bounces={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#b83535"]}
          />
        }
      />
    </View>
  );
};

export default SubTopicDetailScreen;

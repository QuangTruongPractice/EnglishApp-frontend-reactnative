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
import { LinearGradient } from "expo-linear-gradient";
import Loading from "../layout/Loading";
import { formatDate } from "../../utils/formatters";
import styles from "../../styles/TopicDetailStyles";

// ===== Custom Circular Progress Ring =====
const CircularProgressRing = ({ percentage, size = 48, strokeWidth = 4, statusColor }) => {
  const radius = (size - strokeWidth) / 2;
  const pct = Math.min(Math.max(percentage, 0), 100);
  const angle = (pct / 100) * 360;
  
  let currentAngle = -90; // Start at top
  const renderSegment = () => {
    if (pct === 0) return null;
    const segmentElements = [];
    
    if (angle <= 180) {
      segmentElements.push(
        <View
          key="seg-a"
          style={{
            position: "absolute", width: size, height: size,
            transform: [{ rotate: `${currentAngle}deg` }]
          }}
        >
          <View style={{ position: "absolute", width: size, height: size / 2, overflow: "hidden" }}>
            <View style={{
              width: size, height: size, borderRadius: size / 2,
              borderWidth: strokeWidth, borderColor: "transparent",
              borderTopColor: statusColor,
              borderRightColor: angle > 90 ? statusColor : "transparent",
            }} />
          </View>
        </View>
      );
    } else {
      segmentElements.push(
        <View
          key="seg-a1"
          style={{
            position: "absolute", width: size, height: size,
            transform: [{ rotate: `${currentAngle}deg` }]
          }}
        >
          <View style={{ position: "absolute", width: size, height: size / 2, overflow: "hidden" }}>
            <View style={{
              width: size, height: size, borderRadius: size / 2,
              borderWidth: strokeWidth, borderColor: "transparent",
              borderTopColor: statusColor, borderRightColor: statusColor,
            }} />
          </View>
        </View>
      );
      segmentElements.push(
        <View
          key="seg-a2"
          style={{
            position: "absolute", width: size, height: size,
            transform: [{ rotate: `${currentAngle + 180}deg` }]
          }}
        >
          <View style={{ position: "absolute", width: size, height: size / 2, overflow: "hidden" }}>
            <View style={{
              width: size, height: size, borderRadius: size / 2,
              borderWidth: strokeWidth, borderColor: "transparent",
              borderTopColor: statusColor,
              borderRightColor: (angle - 180) > 90 ? statusColor : "transparent",
            }} />
          </View>
        </View>
      );
    }
    return segmentElements;
  };

  return (
    <View style={{ width: size, height: size, position: "relative" }}>
      {/* Background ring */}
      <View style={{
        width: size, height: size, borderRadius: size / 2,
        borderWidth: strokeWidth, borderColor: "#e2e8f0", position: "absolute"
      }} />
      {/* Progress ring */}
      {renderSegment()}
    </View>
  );
};


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

  // Helper to extract progress safely handling camelCase vs snake_case
  const extractProgressData = (progressRaw) => {
    if (!progressRaw) {
      return { learned: 0, total: 0, pct: 0, status: "not_started" };
    }
    return {
      learned: progressRaw.meanings_learned ?? progressRaw.meaningsLearned ?? 0,
      total: progressRaw.meanings_total ?? progressRaw.meaningsTotal ?? 1,
      pct: progressRaw.pct ?? 0,
      status: progressRaw.status ?? "not_started",
    };
  };

  const getStatusInfo = (pct) => {
    if (pct >= 90) return { text: "✓ Hoàn thành", color: "#22c55e", bgColor: "#dcfce7" };
    if (pct > 0) return { text: "Đang học", color: "#f43f5e", bgColor: "#ffe4e6" };
    return { text: "Mới", color: "#6b7280", bgColor: "#f3f4f6" };
  };

  const renderSubTopicItem = useCallback(({ item, index }) => {
    const progressData = extractProgressData(item.user_progress || item.userProgress);
    const statusInfo = getStatusInfo(progressData.pct);

    return (
      <TouchableOpacity
        key={`subtopic-${item.id}`}
        style={styles.subTopicCard}
        onPress={() => nav.navigate("SubTopicDetail", { subTopicId: item.id })}
        activeOpacity={0.8}
      >
        <View style={styles.subTopicRow}>
          {/* Left: Progress Ring + Number */}
          <View style={styles.ringContainer}>
            <CircularProgressRing 
              percentage={progressData.pct} 
              size={56} 
              strokeWidth={4} 
              statusColor={statusInfo.color} 
            />
            <View style={styles.ringInner}>
              <Text style={styles.ringNumber}>{index + 1}</Text>
            </View>
          </View>

          {/* Middle: Title & Bar */}
          <View style={styles.subTopicMain}>
            <Text style={styles.subTopicTitle} numberOfLines={2}>{item.name}</Text>
            <View style={styles.progressBarWrapper}>
              <View style={[styles.progressBarFill, { width: `${progressData.pct}%`, backgroundColor: statusInfo.color }]} />
            </View>
          </View>

          {/* Right: Badge & Fraction */}
          <View style={styles.subTopicRight}>
            <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
              <Text style={[styles.statusBadgeText, { color: statusInfo.color }]}>{statusInfo.text}</Text>
            </View>
            <View style={styles.fractionRow}>
              <Text style={styles.fractionLearned}>{progressData.learned}</Text>
              <Text style={styles.fractionTotal}>/{progressData.total}</Text>
              <Ionicons name="chevron-forward" size={16} color="#cbd5e1" style={{ marginLeft: 4 }} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [nav]);

  const listHeader = useMemo(() => {
    const mainProgressData = extractProgressData(topicInfo?.user_progress || topicInfo?.userProgress);
    const remaining = Math.max(0, mainProgressData.total - mainProgressData.learned);

    return (
      <View style={styles.headerBlock}>
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          {topicInfo?.image && (
            <View style={styles.imageContainer}>
             <Image
                source={{ uri: topicInfo.image }}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </View>
          )}
          {/* Gradient overlay top-down to make text always readable */}
          <LinearGradient
            colors={['rgba(80,0,0,0.85)', 'rgba(80,0,0,0.95)', 'rgba(40,0,0,1)']}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.heroContent}>
            <View style={styles.heroTopActions}>
              <TouchableOpacity style={styles.backButton} onPress={onGoBack} activeOpacity={0.7}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.heroTopicBadge}>
              <Text style={styles.heroTopicBadgeText}>📚 CHỦ ĐỀ</Text>
            </View>
            <Text style={styles.heroTitle} numberOfLines={2}>
              {topicInfo?.name || "Topic"}
            </Text>
            <Text style={styles.heroSubtitle}>
              {topicInfo?.subTopicsCount || subTopics.length} chủ đề nhỏ • {mainProgressData.total} nghĩa • Tạo ngày {formatDate(topicInfo?.createdAt)}
            </Text>
          </View>
        </View>

        {/* PROGRESS CARD (Overlaps hero) */}
        <View style={styles.mainProgressCard}>
          <View style={styles.mainProgressRow}>
            <Text style={styles.mainProgressLabel}>Tiến độ tổng thể</Text>
            <Text style={styles.mainProgressPct}>{mainProgressData.pct.toFixed(1)}%</Text>
          </View>
          
          <View style={styles.mainProgressBarBox}>
            <View style={[styles.mainProgressBarFill, { width: `${mainProgressData.pct}%` }]} />
          </View>

          <View style={styles.mainStatsRow}>
            <View style={styles.mainStatBox}>
              <Text style={styles.mainStatValue}>{mainProgressData.learned}</Text>
              <Text style={styles.mainStatLabel}>ĐÃ HỌC</Text>
            </View>
            <View style={styles.mainStatDiv} />
            <View style={styles.mainStatBox}>
              <Text style={styles.mainStatValue}>{remaining}</Text>
              <Text style={styles.mainStatLabel}>CÒN LẠI</Text>
            </View>
            <View style={styles.mainStatDiv} />
            <View style={styles.mainStatBox}>
              <Text style={styles.mainStatValue}>{mainProgressData.total}</Text>
              <Text style={styles.mainStatLabel}>TỔNG NGHĨA</Text>
            </View>
          </View>

          {/* CTA Button removed as requested */}
        </View>

        {/* SUBTOPIC HEADER */}
        <View style={styles.subTopicSectionHeader}>
          <Text style={styles.subTopicSectionTitle}>Chủ đề nhỏ</Text>
          <View style={styles.subTopicCountBadge}>
            <Text style={styles.subTopicCountText}>{subTopics.length} chủ đề</Text>
          </View>
        </View>
      </View>
    );
  }, [topicInfo, subTopics.length, onGoBack]);

  const listEmpty = useMemo(() => (
    <View style={styles.emptyContainer}>
      <Ionicons name="folder-open-outline" size={64} color="#cbd5e1" />
      <Text style={styles.emptyTitle}>Chưa có chủ đề nhỏ</Text>
      <Text style={styles.emptyText}>
        Topic này hiện chưa có dữ liệu subtopics.
      </Text>
    </View>
  ), []);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Loading />
          <Text style={styles.loadingText}>Đang tải chủ đề...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={64} color="#f43f5e" />
          <Text style={styles.errorTitle}>Đã xảy ra lỗi</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={reload}>
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={subTopics}
        keyExtractor={(item) => `subtopic-${item.id}`}
        renderItem={renderSubTopicItem}
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

export default TopicDetailScreen;

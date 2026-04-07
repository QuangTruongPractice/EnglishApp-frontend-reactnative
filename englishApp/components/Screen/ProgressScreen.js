import React from "react";
import { View, ScrollView, RefreshControl, TouchableOpacity, Image, Text } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import SharedHeader from "../layout/SharedHeader";
import { styles } from "../../styles/ProgressStyles";

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTH_NAMES_VI = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

// Build calendar grid for a given month/year
const buildCalendarGrid = (month, year) => {
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();

  // getDay() returns 0=Sun, we want 0=Mon
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const grid = [];
  let week = new Array(startDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      grid.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    grid.push(week);
  }

  return grid;
};

// Helper for relative time
const getRelativeTime = (dateStr) => {
  if (!dateStr) return "";
  const now = new Date();
  const target = new Date(dateStr);
  const diffMs = target - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "hôm nay";
  if (diffDays === 1) return "1 ngày";
  return `${diffDays} ngày`;
};

// ===== Donut Chart Component (pure RN, no SVG) =====
const DonutChart = ({ total, segments, size = 76, strokeWidth = 7 }) => {
  // segments = [{ value, color }]
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Calculate angles
  const totalValue = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  let currentAngle = -90; // Start from top

  const renderSegment = (segment, index) => {
    const angle = (segment.value / totalValue) * 360;
    if (segment.value === 0) return null;

    // For each segment, create a colored arc using two overlapping half-circles
    const startAngle = currentAngle;
    const endAngle = startAngle + angle;
    currentAngle = endAngle;

    // We use a simple approach: rotated half-circle masks
    const segmentElements = [];
    const segmentAngle = angle;

    if (segmentAngle <= 180) {
      segmentElements.push(
        <View
          key={`seg-${index}`}
          style={{
            position: "absolute",
            width: size,
            height: size,
            transform: [{ rotate: `${startAngle}deg` }],
          }}
        >
          <View
            style={{
              position: "absolute",
              width: size,
              height: size / 2,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: "transparent",
                borderTopColor: segment.color,
                borderRightColor: segmentAngle > 90 ? segment.color : "transparent",
              }}
            />
          </View>
        </View>
      );
    } else {
      // For segments > 180 degrees, split into two halves
      segmentElements.push(
        <View
          key={`seg-${index}-a`}
          style={{
            position: "absolute",
            width: size,
            height: size,
            transform: [{ rotate: `${startAngle}deg` }],
          }}
        >
          <View
            style={{
              position: "absolute",
              width: size,
              height: size / 2,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: "transparent",
                borderTopColor: segment.color,
                borderRightColor: segment.color,
              }}
            />
          </View>
        </View>
      );
      segmentElements.push(
        <View
          key={`seg-${index}-b`}
          style={{
            position: "absolute",
            width: size,
            height: size,
            transform: [{ rotate: `${startAngle + 180}deg` }],
          }}
        >
          <View
            style={{
              position: "absolute",
              width: size,
              height: size / 2,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: "transparent",
                borderTopColor: segment.color,
                borderRightColor: (segmentAngle - 180) > 90 ? segment.color : "transparent",
              }}
            />
          </View>
        </View>
      );
    }

    return segmentElements;
  };

  // Reset currentAngle for rendering
  currentAngle = -90;

  return (
    <View style={{ width: size, height: size, position: "relative" }}>
      {/* Background ring */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: "#e5e7eb",
          position: "absolute",
        }}
      />
      {/* Segments */}
      {segments.map((seg, i) => (
        <React.Fragment key={`donut-seg-${i}`}>
          {renderSegment(seg, i)}
        </React.Fragment>
      ))}
      {/* Center label */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.vocabCircleNumber}>{total}</Text>
        <Text style={styles.vocabCircleLabel}>TỪ</Text>
      </View>
    </View>
  );
};

const ProgressScreen = ({
  videoProgress,
  vocabularyProgress,
  vocaCounts,
  activeVocaStatus,
  setActiveVocaStatus,
  streakCalendar,
  summary,
  userProfile,
  calendarMonth,
  calendarYear,
  goToPrevMonth,
  goToNextMonth,
  loading,
  error,
  refreshing,
  onRefresh,
  formatDate,
  formatDuration,
  nav,
  retry,
  loadMoreVideo,
  loadMoreVoca,
  isFetchingNextVideoPage,
  isFetchingNextVocaPage,
}) => {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const studiedDates = streakCalendar?.studiedDates || [];
  const currentStreak = streakCalendar?.currentStreak || summary?.streak || 0;
  const calendarGrid = buildCalendarGrid(calendarMonth, calendarYear);

  // Helper: check if a date was studied
  const isStudied = (day) => {
    const dateStr = `${calendarYear}-${String(calendarMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return studiedDates.includes(dateStr);
  };

  // Helper: check if a date is today
  const isToday = (day) => {
    const dateStr = `${calendarYear}-${String(calendarMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return dateStr === todayStr;
  };

  // Helper: check if a date is in the past
  const isPast = (day) => {
    const date = new Date(calendarYear, calendarMonth - 1, day);
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayDate;
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 100; // Tăng lên 100 để load mượt hơn trước khi chạm đáy
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  // Get day cell style
  const getDayCellStyle = (day) => {
    if (!day) return [styles.calendarDayCell, styles.calendarDayEmpty];
    if (isToday(day)) {
      return [styles.calendarDayCell, styles.calendarDayToday];
    }
    if (isStudied(day)) {
      return [styles.calendarDayCell, styles.calendarDayStudied];
    }
    if (isPast(day)) {
      return [styles.calendarDayCell, styles.calendarDayMissed];
    }
    return [styles.calendarDayCell, styles.calendarDayNormal];
  };

  // Get day text style
  const getDayTextStyle = (day) => {
    if (!day) return styles.calendarDayText;
    if (isToday(day)) return [styles.calendarDayText, styles.calendarDayTextToday];
    if (isStudied(day)) return [styles.calendarDayText, styles.calendarDayTextStudied];
    if (isPast(day)) return [styles.calendarDayText, styles.calendarDayTextMissed];
    return [styles.calendarDayText, styles.calendarDayTextNormal];
  };

  // ===== Video Card (like VideoScreen) =====
  const VideoProgressCard = ({ item }) => {
    const progress = item.progressPercentage || 0;
    const isCompleted = item.isCompleted;
    const statusInfo = isCompleted
      ? { text: "Hoàn thành", bgColor: "#22c55e" }
      : progress > 0
      ? { text: "▶ Đang xem", bgColor: "#b83535" }
      : { text: "Mới", bgColor: "#6b7280" };

    return (
      <TouchableOpacity
        onPress={() => nav.navigate("VideoDetail", { videoId: item.video?.id || item.id })}
        activeOpacity={0.8}
        style={styles.videoProgressCard}
      >
        <View style={styles.thumbnailContainer}>
          <Image
            source={{
              uri: `https://img.youtube.com/vi/${item.video?.videoId || item.videoId}/hqdefault.jpg`,
            }}
            style={styles.thumbnail}
          />
          <View style={styles.playIconOverlay}>
            <View style={styles.playButton}>
              <Ionicons name="play" size={24} color="#fff" style={{ marginLeft: 3 }} />
            </View>
          </View>
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>
              {formatDuration(item.video?.duration || item.duration)}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
            <Text style={styles.statusBadgeText}>{statusInfo.text}</Text>
          </View>
        </View>

        <View style={styles.videoCardContent}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {item.video?.title || item.title}
          </Text>
          <Text style={styles.videoMeta}>
            {item.video?.segmentsCount || item.segmentsCount || 0} phân đoạn
            {"    "}Xem lần cuối {formatDate(item.updatedAt)}
          </Text>
          <View style={styles.videoProgressBarContainer}>
            <View style={[styles.videoProgressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // ===== Vocabulary Item =====
  const VocabularyItem = ({ item }) => {
    const data = item.vocabulary || item;
    const nextReviewText = item.nextReviewAt
      ? `Ôn lại sau ${getRelativeTime(item.nextReviewAt)}`
      : "";

    const statusColors = {
      NOT_STARTED: "#94a3b8",
      LEARNING: "#f97316",
      REVIEWING: "#3b82f6",
      MASTERED: "#22c55e",
    };
    const borderColor = statusColors[item.status] || "#f97316";

    return (
      <TouchableOpacity
        onPress={() => nav.navigate("VocabularyDetail", { vocabularyId: data.id })}
        activeOpacity={0.7}
        style={styles.vocaCard}
      >
        {/* Left colored border indicator */}
        <View style={[styles.vocaLeftBorder, { backgroundColor: borderColor }]} />

        <View style={styles.vocaInfoContainer}>
          {/* Row 1: word + phonetic */}
          <View style={styles.vocaTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.vocaWord}>{data.word}</Text>
              {data.phonetic && (
                <Text style={styles.vocaPhonetic}>{data.phonetic}</Text>
              )}
            </View>
            {/* Level badge */}
            {data.level && (
              <View style={styles.vocaLevelBadge}>
                <Text style={styles.vocaLevelText}>{data.level}</Text>
              </View>
            )}
          </View>
          {/* Row 2: next review */}
          {nextReviewText ? (
            <Text style={styles.vocaNextReview}>{nextReviewText}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  // ===== Loading State =====
  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b83535" />
          <Text style={styles.loadingText}>Đang tải tiến độ học tập...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ===== Error State =====
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button mode="contained" onPress={retry} buttonColor="#b83535">
            Thử lại
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  // ===== Vocab Tabs =====
  const vocabTabs = [
    { label: "Tất cả", value: "ALL", count: vocaCounts.ALL },
    { label: "Cần ôn tập", value: "NOT_STARTED", count: vocaCounts.NOT_STARTED },
    { label: "Đang học", value: "LEARNING", count: vocaCounts.LEARNING },
    { label: "Hoàn thành", value: "MASTERED", count: vocaCounts.MASTERED },
  ];

  // Donut chart segments (Not Started + Learning + Mastered)
  const donutSegments = [
    { value: vocaCounts.NOT_STARTED, color: "#94a3b8" },
    { value: vocaCounts.LEARNING, color: "#f97316" },
    { value: vocaCounts.MASTERED, color: "#22c55e" },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#b83535"]} />
          }
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              if (loadMoreVideo) loadMoreVideo();
            }
          }}
          scrollEventThrottle={400}
        >
          {/* ===== SHARED HEADER ===== */}
          <SharedHeader
            greetingText="Tiến trình học"
            nameText={`Tháng ${calendarMonth}, ${calendarYear}`}
            userProfile={userProfile}
            summary={summary}
          />

          {/* ===== STREAK CALENDAR ===== */}
          <View style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Text style={{ fontSize: 20 }}>🔥</Text>
                <Text style={styles.sectionTitle}>Streak Calendar</Text>
              </View>
              <Text style={styles.sectionSubtitle}>
                {currentStreak} ngày streak
              </Text>
            </View>

            <View style={styles.calendarCard}>
              {/* Month/Year Header */}
              <View style={styles.calendarHeader}>
                <Text style={styles.calendarMonthYearText}>
                  THÁNG {calendarMonth} {calendarYear}
                </Text>
                <View style={styles.calendarNavRow}>
                  <TouchableOpacity onPress={goToPrevMonth} style={styles.calendarNavButton}>
                    <Text style={styles.calendarNavText}>‹</Text>
                  </TouchableOpacity>
                  <Text style={styles.calendarNavMonthText}>
                    {MONTH_NAMES_VI[calendarMonth - 1]}
                  </Text>
                  <TouchableOpacity onPress={goToNextMonth} style={styles.calendarNavButton}>
                    <Text style={styles.calendarNavText}>›</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Week Day Headers */}
              <View style={styles.calendarWeekDaysRow}>
                {WEEK_DAYS.map((day, i) => (
                  <Text key={`weekday-${i}`} style={styles.calendarWeekDayText}>{day}</Text>
                ))}
              </View>

              {/* Calendar Grid */}
              {calendarGrid.map((week, weekIdx) => (
                <View key={`week-${weekIdx}`} style={styles.calendarRow}>
                  {week.map((day, dayIdx) => (
                    <View key={`day-${weekIdx}-${dayIdx}`} style={getDayCellStyle(day)}>
                      {day && <Text style={getDayTextStyle(day)}>{day}</Text>}
                    </View>
                  ))}
                </View>
              ))}

              {/* Legend */}
              <View style={styles.calendarLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, styles.legendDotStudied]} />
                  <Text style={styles.legendText}>Đã học</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, styles.legendDotMissed]} />
                  <Text style={styles.legendText}>Bỏ lỡ</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, styles.legendDotToday]} />
                  <Text style={styles.legendText}>Hôm nay</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ===== VOCABULARY PROGRESS ===== */}
          <View style={styles.vocabSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Text style={{ fontSize: 20 }}>📚</Text>
                <Text style={styles.sectionTitle}>Từ vựng đang học</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.sectionLink}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.vocabCard}>
              {/* Tabs */}
              <View style={styles.vocabTabsContainer}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.vocabTabsScroll}
                >
                  {vocabTabs.map((tab) => (
                    <TouchableOpacity
                      key={tab.value}
                      onPress={() => setActiveVocaStatus(tab.value)}
                      style={[
                        styles.vocabTab,
                        activeVocaStatus === tab.value && styles.vocabTabActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.vocabTabText,
                          activeVocaStatus === tab.value && styles.vocabTabTextActive,
                        ]}
                      >
                        {tab.label} ({tab.count})
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Vocabulary List - max 4 visible, scroll inside */}
              {vocabularyProgress?.length === 0 ? (
                <View style={styles.emptyStateContainer}>
                  <Text style={styles.emptyStateText}>
                    Không có từ vựng nào trong danh mục này
                  </Text>
                </View>
              ) : (
                <ScrollView
                  style={styles.vocabListScroll}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                  onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                      if (loadMoreVoca) loadMoreVoca();
                    }
                  }}
                  scrollEventThrottle={400}
                >
                  {vocabularyProgress?.map((item, index) => (
                    <VocabularyItem key={`voca-${item.meaningId}-${index}`} item={item} />
                  ))}
                  {isFetchingNextVocaPage && (
                    <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                      <ActivityIndicator size="small" color="#b83535" />
                    </View>
                  )}
                </ScrollView>
              )}
            </View>
          </View>

          {/* ===== VIDEO PROGRESS ===== */}
          <View style={styles.videoSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Text style={{ fontSize: 20 }}>🎬</Text>
                <Text style={styles.sectionTitle}>Video đang xem</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.sectionLink}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>

            {videoProgress?.length === 0 ? (
              <View style={[styles.vocabCard, styles.emptyStateContainer]}>
                <Text style={styles.emptyStateText}>
                  Bạn chưa xem video nào
                </Text>
              </View>
            ) : (
                <View>
                  {videoProgress?.map((item, index) => (
                  <VideoProgressCard key={`video-${item.id ?? index}`} item={item} />
                  ))}
                {isFetchingNextVideoPage && (
                  <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                    <ActivityIndicator size="small" color="#b83535" />
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProgressScreen;
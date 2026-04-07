import { StyleSheet } from "react-native";

const CELL_SIZE = 36; // Fixed size for consistent circles

export const styles = StyleSheet.create({
  // ===== Container =====
  safeArea: {
    flex: 1,
    backgroundColor: "#4a0d0d",
  },
  container: {
    flex: 1,
    backgroundColor: "#fcf9f9",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcf9f9",
  },
  loadingText: {
    marginTop: 16,
    color: "#b83535",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: "#b83535",
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
  },

  // ===== Section Headers =====
  sectionWrapper: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginLeft: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#b83535",
    fontWeight: "600",
  },
  sectionLink: {
    fontSize: 14,
    color: "#b83535",
    fontWeight: "600",
  },

  // ===== Streak Calendar =====
  calendarCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  calendarMonthYearText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    textTransform: "uppercase",
  },
  calendarNavRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarNavButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarNavText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
  },
  calendarNavMonthText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginHorizontal: 12,
  },

  // Calendar Grid
  calendarWeekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  calendarWeekDayText: {
    width: CELL_SIZE,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    color: "#9ca3af",
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 8,
  },
  calendarDayCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 18, // Fixed integer to avoid Android fractional radius square bug
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  calendarDayEmpty: {
    backgroundColor: "transparent",
  },
  calendarDayNormal: {
    backgroundColor: "transparent",
  },
  calendarDayStudied: {
    backgroundColor: "#dcfce7",
  },
  calendarDayMissed: {
    backgroundColor: "#fecaca",
  },
  calendarDayToday: {
    backgroundColor: "#166534",
  },
  calendarDayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  calendarDayTextNormal: {
    color: "#374151",
  },
  calendarDayTextToday: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  calendarDayTextStudied: {
    color: "#166534",
    fontWeight: "600",
  },
  calendarDayTextMissed: {
    color: "#b83535",
    fontWeight: "500",
  },

  // Legend
  calendarLegend: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 12,
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendDotStudied: {
    backgroundColor: "#4ade80",
  },
  legendDotMissed: {
    backgroundColor: "#f87171",
  },
  legendDotToday: {
    backgroundColor: "#166534",
  },
  legendText: {
    fontSize: 12,
    color: "#6b7280",
  },

  // ===== Vocabulary Progress Section =====
  vocabSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  vocabCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  vocabSummaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  vocabCircleContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  vocabCircleNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#b83535",
  },
  vocabCircleLabel: {
    fontSize: 10,
    color: "#9ca3af",
    fontWeight: "600",
    marginTop: -2,
  },
  vocabStatsColumn: {
    flex: 1,
    gap: 10,
  },
  vocabStatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vocabStatLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  vocabStatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  vocabStatDotLearning: {
    backgroundColor: "#f97316",
  },
  vocabStatDotMastered: {
    backgroundColor: "#22c55e",
  },
  vocabStatLabel: {
    fontSize: 14,
    color: "#4b5563",
  },
  vocabStatValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },

  // Vocab Tabs
  vocabTabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 4,
  },
  vocabTabsScroll: {
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  vocabTab: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    marginRight: 8,
  },
  vocabTabActive: {
    borderBottomColor: "#b83535",
  },
  vocabTabText: {
    fontSize: 13,
    color: "#9ca3af",
    fontWeight: "600",
  },
  vocabTabTextActive: {
    color: "#b83535",
  },

  // Vocab List ScrollView
  vocabListScroll: {
    maxHeight: 360,
  },

  // ===== Vocabulary List Items =====
  vocaCard: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  vocaLeftBorder: {
    width: 3,
    borderRadius: 2,
    marginRight: 12,
  },
  vocaInfoContainer: {
    flex: 1,
  },
  vocaTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  vocaWord: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 1,
  },
  vocaPhonetic: {
    fontSize: 13,
    color: "#9ca3af",
  },
  vocaLevelBadge: {
    backgroundColor: "#fef2f2",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  vocaLevelText: {
    fontSize: 12,
    color: "#b83535",
    fontWeight: "700",
  },
  vocaNextReview: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
    textAlign: "right",
  },

  // ===== Video Progress Section =====
  videoSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  videoProgressCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  thumbnailContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    position: "relative",
    backgroundColor: "#e1e4e8",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  playIconOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(150, 30, 30, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  durationBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  statusBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  videoCardContent: {
    padding: 14,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 6,
    lineHeight: 21,
  },
  videoMeta: {
    fontSize: 12,
    color: "#9ca3af",
  },
  videoProgressBarContainer: {
    height: 4,
    backgroundColor: "#f0eaeb",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 10,
  },
  videoProgressBarFill: {
    height: "100%",
    backgroundColor: "#b83535",
    borderRadius: 2,
  },

  // ===== Empty State =====
  emptyStateContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyStateText: {
    color: "#9ca3af",
    fontSize: 14,
  },
});
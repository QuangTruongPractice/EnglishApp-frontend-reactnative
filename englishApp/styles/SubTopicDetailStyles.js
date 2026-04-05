import { StyleSheet, Dimensions, Platform } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  // Global & States
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#fcf9f9",
  },
  scrollContentContainer: {
    paddingBottom: 40,
    backgroundColor: "#fcf9f9",
  },
  
  // Loading & Error
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    color: "#64748b",
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#b83535",
    borderRadius: 8,
  },
  retryBtnText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },

  // HERO SECTION
  headerBlock: {
    width: "100%",
  },
  heroSection: {
    width: "100%",
    backgroundColor: "#6e1c1c", // Dark red hero
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroTopActions: {
    marginBottom: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  backButtonText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 6,
  },
  heroTopicBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  heroTopicBadgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
  },
  heroSubtitle: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "500",
    opacity: 0.9,
  },

  // Completed Banner
  completedBanner: {
    flexDirection: "row",
    backgroundColor: "#166534", // Dark green
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  bannerIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  bannerEmoji: {
    fontSize: 24,
  },
  bannerTextCol: {
    flex: 1,
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  bannerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    lineHeight: 18,
  },

  // Progress Card
  progressCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 16, // Under the hero or banner
    padding: 24,
  },
  progressRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#475569",
  },
  fractionBox: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  fractionHighlight: {
    fontSize: 18,
    fontWeight: "800",
    color: "#22c55e", // Green
  },
  fractionTotal: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#dcfce7", // Light green bg
    borderRadius: 4,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#22c55e", // Green fill
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statCol: {
    flex: 1,
    alignItems: "center",
  },
  statVal: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94a3b8",
  },
  statDiv: {
    width: 1,
    height: 30,
    backgroundColor: "#e2e8f0",
  },

  // Vocabulary List Header
  listHeaderSection: {
    marginTop: 32,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1e293b",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: "#ffe4e6",
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
  },
  filterChipTextActive: {
    color: "#f43f5e",
  },

  // Vocabulary items
  vocabularyCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 20,
    overflow: "hidden", // Important so we can use a border radius clean card
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#22c55e", // Always Green for now since API doesn't have local word status
  },
  wordMainInfo: {
    flex: 1,
    paddingLeft: 8,
  },
  vocabularyWord: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  vocabularyPhonetic: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    color: "#64748b",
  },
  cardRight: {
    alignItems: "flex-end",
    marginLeft: 16,
  },
  levelBadge: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#475569",
    textTransform: "uppercase",
  },

  // Empty State
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#94a3b8",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
});

export default styles;

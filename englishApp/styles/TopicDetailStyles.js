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
    backgroundColor: "#f8fafc", // Light gray background for the list
  },
  scrollContentContainer: {
    paddingBottom: 40,
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
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#b83535",
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },

  // Header Block & Hero
  headerBlock: {
    width: "100%",
  },
  heroSection: {
    width: "100%",
    height: height * 0.35, // Adjust hero height
    position: "relative",
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    opacity: 0.8, // Slightly dim image to let gradient take over
  },
  heroContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30, // SafeArea roughly
    paddingBottom: 60, // Give room for overlapping progress card
    justifyContent: "flex-end",
  },
  heroTopActions: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  heroTopicBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  heroTopicBadgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "500",
  },

  // Main Progress Card (overlaps hero)
  mainProgressCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: -40, // Negative margin to overlap the hero section
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 5,
  },
  mainProgressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  mainProgressLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },
  mainProgressPct: {
    fontSize: 22,
    fontWeight: "800",
    color: "#b83535",
  },
  mainProgressBarBox: {
    height: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
    marginBottom: 20,
    overflow: "hidden",
  },
  mainProgressBarFill: {
    height: "100%",
    backgroundColor: "#b83535",
    borderRadius: 4,
  },
  mainStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  mainStatBox: {
    flex: 1,
    alignItems: "center",
  },
  mainStatValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  mainStatLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94a3b8",
  },
  mainStatDiv: {
    width: 1,
    height: 30,
    backgroundColor: "#e2e8f0",
  },

  // Subtopic Section Header
  subTopicSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  subTopicSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  subTopicCountBadge: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  subTopicCountText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
  },

  // Subtopic Items
  subTopicCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  subTopicRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ringContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  ringInner: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  ringNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  subTopicMain: {
    flex: 1,
    justifyContent: "center",
  },
  subTopicTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
    marginRight: 8,
  },
  progressBarWrapper: {
    height: 6,
    backgroundColor: "#f1f5f9",
    borderRadius: 3,
    width: "80%", // slightly shorter than full width
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  subTopicRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    minWidth: 80,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  fractionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  fractionLearned: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e293b",
  },
  fractionTotal: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94a3b8",
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
    color: "#475569",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
});

export default styles;

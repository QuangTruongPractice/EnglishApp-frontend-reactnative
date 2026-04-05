import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9a9a9", // Main background from base palette
  },
  container: {
    flex: 1,
    backgroundColor: "#fcf9f9", // Off-white warm tinted gray
  },
  // --- Header & Hero Section ---
  headerBackground: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: -20, // To pull content up over the curve
    zIndex: 1,
    overflow: 'hidden',
  },
  headerDecorativeCircle: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 220,
    height: 220,
    borderRadius: 175,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingWrapper: {
    paddingLeft: 12,
  },
  greetingText: {
    color: '#fde8e8',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  nameText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f9a9a9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#4a1010',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // --- Shortcuts (Bảng xếp hạng, Từ đã lưu) ---
  shortcutsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 2,
    gap: 12,
    marginTop: -4,
  },
  shortcutCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  shortcutIconContainerLeaderboard: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#fffbeb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  shortcutIconContainerSaved: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  shortcutTitle: {
    color: '#1f2937',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  shortcutSubtitle: {
    color: '#6b7280',
    fontSize: 10,
  },

  // --- Daily Lesson Card ---
  dailyLessonWrapper: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    elevation: 8,
    shadowColor: '#f9a9a9', // Soft pink shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  dailyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  dailyBadgeText: {
    color: '#2e7d32',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  dailyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dailyTitleIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dailyTitleIcon: {
    fontSize: 18,
  },
  dailyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  dailySubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  dailyDescription: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 20,
    lineHeight: 20,
  },
  dailyTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  dailyTag: {
    backgroundColor: '#f0eaeb', // Warm tinted gray
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dailyTagText: {
    color: '#444',
    fontSize: 12,
  },
  dailyTagMore: {
    backgroundColor: '#fde8e8',
  },
  dailyTagMoreText: {
    color: '#b83535',
    fontWeight: 'bold',
  },
  dailyButton: {
    backgroundColor: '#b83535', // CTA button base
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dailyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // --- Topic Sections & Lists ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  sectionLink: {
    fontSize: 14,
    color: "#b83535",
    fontWeight: "600",
  },
  listContainer: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  // --- Updated Topic Card Style ---
  card: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 12,
    elevation: 3,
    shadowColor: '#f9a9a9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fde8e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    width: 24,
    height: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#f0eaeb',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  progressTextCompleted: {
    color: '#d32f2f',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressText: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // --- Recommended horizontal list ---
  horizontalList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  recommendedCard: {
    width: 170,
    height: 185,
    marginRight: 12,
    borderRadius: 20,
    padding: 14,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  recommendedDecorativeCircle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  recommendedDecorativeCircle2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  recommendedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  recommendedBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  recommendedIconContainer: {
    marginBottom: 8,
  },
  recommendedIcon: {
    width: 40,
    height: 40,
  },
  recommendedTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
  },
  recommendedSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 8,
  },
  recommendedProgressWrapper: {
    marginTop: 'auto',
  },
  recommendedProgressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  recommendedProgressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  recommendedProgressText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
  },

  // --- Miscellaneous ---
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#b83535",
  },
  errorText: {
    fontSize: 16,
    color: "#b83535",
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});

export default styles;

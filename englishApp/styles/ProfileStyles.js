import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF9F9",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  
  // Header Section
  headerBackground: {
    paddingTop: 60,
    paddingHorizontal: 25,
    paddingBottom: 100,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    backgroundColor: "#9B2C2C",
    position: "relative",
    overflow: "hidden",
  },
  headerPattern: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  settingsButton: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 18,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.4)",
    backgroundColor: "#F45B69",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
  },
  statusDot: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#4CAF50",
    borderWidth: 3,
    borderColor: "#9B2C2C",
  },
  headerInfo: {
    flex: 1,
  },
  welcomeText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  userName: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 4,
  },
  userEmail: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    fontWeight: "500",
  },
  headerBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  badgeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 6,
  },

  // Stats Card
  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: -60,
    flexDirection: "row",
    paddingVertical: 20,
    shadowColor: "#9B2C2C",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(244, 91, 105, 0.05)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#F5F5F5",
  },
  statIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#F45B69",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // XP Progress Section
  section: {
    paddingHorizontal: 20,
    marginTop: 35,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#BBB",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  progressCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  levelBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelBadge: {
    backgroundColor: "rgba(244, 91, 105, 0.08)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 10,
  },
  levelBadgeText: {
    color: "#F45B69",
    fontSize: 12,
    fontWeight: "900",
  },
  levelTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#444",
  },
  nextLevelInfo: {
    alignItems: "flex-end",
  },
  nextLevelName: {
    fontSize: 11,
    fontWeight: "800",
    color: "#999",
    marginBottom: 2,
  },
  neededXp: {
    fontSize: 16,
    fontWeight: "900",
    color: "#F45B69",
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#F45B69",
  },
  targetLabelText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#999",
  },

  // Streak Card
  streakCard: {
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    minHeight: 110,
  },
  streakCardContent: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 12,
    fontWeight: "900",
    color: "rgba(255, 255, 255, 0.7)",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 5,
  },
  streakMainInfo: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 4,
  },
  streakDays: {
    fontSize: 36,
    fontWeight: "900",
    color: "#fff",
    marginRight: 8,
  },
  streakUnit: {
    fontSize: 16,
    fontWeight: "800",
    color: "rgba(255, 255, 255, 0.8)",
  },
  streakUpdate: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.6)",
  },
  streakRecordContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  recordTitle: {
    fontSize: 10,
    fontWeight: "900",
    color: "#FFD700",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  recordValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#fff",
  },

  // Goals Section
  goalCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  goalDisabled: {
    opacity: 0.5,
  },
  cooldownText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#F45B69",
    marginTop: -10,
    marginBottom: 15,
  },
  goalTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#333",
  },
  changeLink: {
    fontSize: 14,
    fontWeight: "800",
    color: "#F45B69",
  },
  minutesGrid: {
    flexDirection: "row",
    gap: 10,
  },
  minuteOption: {
    flex: 1,
    height: 70,
    borderRadius: 18,
    backgroundColor: "#FDF9F9",
    borderWidth: 2,
    borderColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  minuteOptionActive: {
    backgroundColor: "#FFF5F6",
    borderColor: "#F45B69",
  },
  minuteValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#333",
  },
  minuteLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#999",
    textTransform: "uppercase",
  },
  minuteValueActive: {
    color: "#F45B69",
  },
  minuteLabelActive: {
    color: "#F45B69",
  },

  // Learning Goals List
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#F5F5F5",
  },
  goalItemActive: {
    borderColor: "#F45B69",
    backgroundColor: "#FFF5F6",
  },
  goalIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  goalIconContainerActive: {
    backgroundColor: "#fff",
  },
  goalInfo: {
    flex: 1,
  },
  goalName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#333",
  },
  goalSubname: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
  },
  goalCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  goalCheckActive: {
    borderColor: "#F45B69",
    backgroundColor: "#F45B69",
  },

  // Personal Info Section
  infoList: {
    backgroundColor: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F9F9F9",
  },
  infoIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFF5F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#AAA",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#444",
  },
  editLink: {
    fontSize: 12,
    fontWeight: "700",
    color: "#BBB",
  },

  // Settings Section
  settingsList: {
    backgroundColor: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F9F9F9",
  },
  settingIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#444",
  },
  settingSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
  },

  // Footer
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 40,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#FEEBEB",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#F45B69",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  logoutText: {
    color: "#C53030",
    fontSize: 16,
    fontWeight: "900",
    marginLeft: 10,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDF9F9",
  }
});

export default styles;
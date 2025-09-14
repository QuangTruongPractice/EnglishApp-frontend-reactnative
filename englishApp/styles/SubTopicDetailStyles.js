import { StyleSheet, Dimensions} from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9ff",
  },

  // Loading States
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F45B69FF",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    textAlign: "center",
  },

  // Error States
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f45b69",
  },
  errorContent: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 30,
    width: "90%",
  },
  errorTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  errorText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 30,
  },
  retryButton: {
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  retryButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 12,
    gap: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F45B69FF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerTitleMain: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },

  // Container
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },

  heroSection: {
    backgroundColor: "#F45B69FF",
    paddingHorizontal: 24,
    paddingBottom: 30,
    justifyContent: "flex-end",
  },
  heroContent: {
    justifyContent: "flex-end",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    lineHeight: 34,
  },
  heroStats: {
    flexDirection: "row",
    gap: 12,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  heroStatText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
  },

  // Content Section
  contentSection: {
    flex: 1,
    backgroundColor: "#f8f9ff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 30,
    paddingHorizontal: 20,
    minHeight: height * 0.6,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyContent: {
    alignItems: "center",
    padding: 40,
    borderRadius: 20,
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },

  // Vocabularies Section
  vocabulariesSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  sectionBadge: {
    backgroundColor: "#F45B69FF",
    borderRadius: 15,
    minWidth: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  sectionCount: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // Vocabulary Cards
  vocabulariesList: {
    gap: 16,
  },
  vocabularyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: "row",
    borderLeftWidth: 4,
  },
  leftBorder: {
    width: 4,
  },
  vocabularyContent: {
    flex: 1,
    padding: 20,
  },
  vocabularyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  wordContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  vocabularyWord: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c3e50",
  },
  typeBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  typeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  indexContainer: {
    backgroundColor: "#f8f9ff",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  indexNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F45B69FF",
  },

  // Definition
  vocabularyDefinition: {
    fontSize: 15,
    color: "#6c757d",
    lineHeight: 22,
    marginBottom: 12,
  },

  // Example
  exampleContainer: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#e9ecef",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  exampleText: {
    flex: 1,
    fontSize: 14,
    color: "#6c757d",
    fontStyle: "italic",
    lineHeight: 20,
  },

  // Learn Button
  learnButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
    alignSelf: "flex-start",
  },
  learnButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

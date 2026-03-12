import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingText: {
    color: "#1a1a1a",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  errorContent: {
    alignItems: "center",
    backgroundColor: "#fef2f2",
    borderRadius: 24,
    padding: 32,
    width: "90%",
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  errorTitle: {
    color: "#991b1b",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  retryButton: {
    borderRadius: 16,
    backgroundColor: "#ef4444",
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  // Header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 10,
    borderRadius: 14,
    backgroundColor: "#f1f5f9",
  },
  headerTitleContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  headerTitleMain: {
    color: "#1a1a1a",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  headerSpacer: {
    width: 44,
  },

  // Container
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },

  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: "#fff",
  },
  heroTitle: {
    color: "#1a1a1a",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  heroStats: {
    flexDirection: "row",
    gap: 12,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
  },
  heroStatText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "700",
  },

  // Search Bar
  searchBarContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#64748b',
    fontWeight: '500',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
  },
  emptyContent: {
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a1a1a",
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
  },

  // Vocabulary
  vocabularySection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a1a1a",
  },
  sectionBadge: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  sectionCount: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "700",
  },

  // Cards
  vocabularyCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    padding: 24,
  },
  vocabularyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  wordMainInfo: {
    flex: 1,
  },
  vocabularyWord: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  vocabularyPhonetic: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
    fontWeight: '500',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  levelBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  levelText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "800",
    textTransform: 'uppercase',
  },
  saveButton: {
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 14,
  },

  vocabularyDefinition: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 24,
    fontWeight: '500',
    marginBottom: 16,
  },

  // Examples
  exampleContainer: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  exampleText: {
    fontSize: 14,
    color: "#475569",
    fontStyle: "italic",
    lineHeight: 22,
    fontWeight: '500',
  },

  // Learn
  learnButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 14,
    gap: 8,
    width: '100%',
  },
  learnButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});

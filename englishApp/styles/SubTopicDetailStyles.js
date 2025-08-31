import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 32,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    color: "#4A90E2",
    marginLeft: 4,
    fontWeight: "500",
  },
  topicInfoSection: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 12,
  },
  vocabularyCountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  vocabularyCountText: {
    fontSize: 14,
    color: "#4A90E2",
    marginLeft: 6,
    fontWeight: "500",
  },
  vocabularySection: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 16,
  },
  vocabularyCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: "row",
    overflow: "hidden",
  },
  leftBorder: {
    width: 4,
    backgroundColor: "#4A90E2",
  },
  vocabularyContent: {
    flex: 1,
    padding: 20,
  },
  vocabularyWord: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 8,
  },
  wordType: {
    fontSize: 18,
    fontWeight: "400",
    color: "#6c757d",
  },
  vocabularyDefinition: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 20,
    marginBottom: 12,
  },
  exampleContainer: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#e9ecef",
  },
  exampleText: {
    fontSize: 14,
    color: "#6c757d",
    fontStyle: "italic",
    lineHeight: 18,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6c757d",
  },
  errorText: {
    fontSize: 16,
    color: "#2c3e50",
    textAlign: "center",
    marginVertical: 16,
    lineHeight: 24,
  },
  retryButton: {
    marginTop: 8,
    backgroundColor: "#4A90E2",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default styles;
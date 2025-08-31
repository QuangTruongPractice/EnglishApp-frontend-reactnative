import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  checkmark: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#10B981",
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  categoryTag: {
    backgroundColor: "#8B5CF6",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 8,
  },
  categorySubtag: {
    color: "#8B5CF6",
    fontSize: 14,
    fontWeight: "500",
  },
  mainCard: {
    marginBottom: 16,
    elevation: 2,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },
  definition: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
    lineHeight: 24,
  },
  vietnamese: {
    fontSize: 16,
    color: "#3B82F6",
    marginBottom: 16,
    lineHeight: 24,
  },
  exampleContainer: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 8,
  },
  example: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
    fontStyle: "italic",
  },
  exampleVi: {
    fontSize: 14,
    color: "#059669",
    fontStyle: "italic",
  },
  previousButton: {
    alignItems: "center",
    padding: 8,
  },
  previousText: {
    color: "#6B7280",
    fontSize: 14,
  },
  answerCard: {
    padding: 40,
    alignItems: "center",
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
  },
  answerWord: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  pronunciation: {
    fontSize: 18,
    color: "white",
    marginBottom: 16,
  },
  translation: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
  nextButton: {
    alignItems: "center",
    padding: 8,
  },
  nextText: {
    color: "white",
    fontSize: 14,
  },
  audioContainer: {
    marginBottom: 16,
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 8,
  },
  playButton: {
    backgroundColor: "#3B82F6",
  },
  practiceContainer: {},
  practiceTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 4,
  },
  practiceSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  recordButton: {
    backgroundColor: "#22C55E",
  },
  processingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  processingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#6B7280",
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  scoreCard: {
    padding: 24,
    marginBottom: 16,
    elevation: 3,
  },
  scoreContainer: {
    alignItems: "center",
  },
  scoreLabel: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  totalScore: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 4,
  },
  scoreStatus: {
    fontSize: 18,
    fontWeight: "500",
  },
  detailScores: {
    marginBottom: 16,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB",
    marginBottom: 8,
    borderRadius: 8,
  },
  scoreRowLabel: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  scoreRowValue: {
    alignItems: "flex-end",
  },
  scoreNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  comparisonCard: {
    padding: 16,
    marginBottom: 16,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
  },
  textComparison: {
    marginBottom: 16,
  },
  expectedLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#059669",
    marginBottom: 4,
  },
  expectedText: {
    fontSize: 16,
    color: "#374151",
    backgroundColor: "#ECFDF5",
    padding: 12,
    borderRadius: 8,
    lineHeight: 22,
  },
  actualLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#DC2626",
    marginBottom: 4,
  },
  actualText: {
    fontSize: 16,
    color: "#374151",
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 8,
    lineHeight: 22,
  },
  feedbackCard: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#FEF3C7",
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#92400E",
    marginBottom: 12,
  },
  feedbackItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  feedbackBullet: {
    fontSize: 16,
    color: "#92400E",
    marginRight: 8,
    fontWeight: "bold",
  },
  feedbackText: {
    flex: 1,
    fontSize: 14,
    color: "#92400E",
    lineHeight: 20,
  },
  processingTime: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  tryAgainButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#3B82F6",
  },
  continueButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default styles;
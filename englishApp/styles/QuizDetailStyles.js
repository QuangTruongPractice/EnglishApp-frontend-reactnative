import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#FFFFFF",
    elevation: 4,
  },
  // Header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#c297f0ff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backHeaderButton: {
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#EF4444",
    marginTop: 16,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 24,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#6366F1",
    borderRadius: 10,
  },
  headerCard: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  headerContent: {
    padding: 20,
  },
  quizHeader: {
    marginBottom: 12,
  },
  audioTypeChip: {
    backgroundColor: "#F3E8FF",
  },
  textTypeChip: {
    backgroundColor: "#ECFDF5",
  },
  audioTypeText: {
    color: "#9333EA",
    fontWeight: "600",
  },
  textTypeText: {
    color: "#059669",
    fontWeight: "600",
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
    lineHeight: 28,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  contentCard: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  audioContainer: {
    backgroundColor: "#FAF5FF",
    borderRadius: 12,
    padding: 20,
  },
  playButton: {
    backgroundColor: "#9333EA",
    borderRadius: 10,
    marginTop: 8,
  },
  textContainer: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
  },
  textQuestion: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  textInstruction: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  answersCard: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  answersTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  answersContainer: {
    gap: 12,
  },
  answerCard: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  answerContent: {
    padding: 16,
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  answerChip: {
    backgroundColor: "#F3F4F6",
    minWidth: 32,
    height: 32,
  },
  answerChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  answerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    flex: 1,
  },
  selectedAnswerCard: {
    borderColor: "#9333EA",
    backgroundColor: "#F3E8FF",
  },

  selectedAnswerText: {
    fontWeight: "700",
    color: "#9333EA",
  },

  selectedAudioCard: {
    borderColor: "#9333EA",
    backgroundColor: "#FAF5FF",
  },
  selectedAudioText: {
    color: "#7C3AED",
  },
  selectedAudioChip: {
    backgroundColor: "#9333EA",
  },
  selectedAudioChipText: {
    color: "#FFFFFF",
  },
  selectedTextCard: {
    borderColor: "#059669",
    backgroundColor: "#F0FDF4",
  },
  selectedTextText: {
    color: "#047857",
  },
  selectedTextChip: {
    backgroundColor: "#059669",
  },
  selectedTextChipText: {
    color: "#FFFFFF",
  },

  correctCard: {
    borderColor: "#10B981",
    backgroundColor: "#ECFDF5",
  },
  correctContent: {
    backgroundColor: "transparent",
  },
  correctText: {
    color: "#047857",
  },
  correctChip: {
    backgroundColor: "#10B981",
  },
  correctChipText: {
    color: "#FFFFFF",
  },

  wrongCard: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  wrongContent: {
    backgroundColor: "transparent",
  },
  wrongText: {
    color: "#DC2626",
  },
  wrongChip: {
    backgroundColor: "#EF4444",
  },
  wrongChipText: {
    color: "#FFFFFF",
  },

  inactiveCard: {
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  inactiveText: {
    color: "#9CA3AF",
  },
  inactiveChip: {
    backgroundColor: "#E5E7EB",
  },
  inactiveChipText: {
    color: "#9CA3AF",
  },
  actionContainer: {
    marginTop: 24,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 4,
  },
  audioSubmitButton: {
    backgroundColor: "#9333EA",
  },
  audioContent: {
    backgroundColor: "#FAF5FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  audioInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  audioLabel: {
    fontSize: 16,
    color: "#6B7280",
    marginLeft: 8,
  },
  textSubmitButton: {
    backgroundColor: "#059669",
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 8,
  },
  resultActions: {
    flexDirection: "row",
    gap: 12,
  },
  tryAgainButton: {
    flex: 1,
    borderRadius: 12,
    borderColor: "#6B7280",
  },
  backButton: {
    flex: 1,
    backgroundColor: "#6366F1",
    borderRadius: 12,
  },
  snackbar: {
    backgroundColor: "#1F2937",
  },
});

export default styles;

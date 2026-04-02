import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D0A0A", // Dark maroon background
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    marginHorizontal: 15,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#F45B69",
    borderRadius: 3,
  },
  progressText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    opacity: 0.8,
  },
  phaseBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  phaseBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  
  // Progress Dots
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  dotActive: {
    backgroundColor: "#F45B69",
    width: 20,
  },
  dotDone: {
    backgroundColor: "rgba(244, 91, 105, 0.4)",
  },

  // Card styles
  card: {
    backgroundColor: "#fff",
    borderRadius: 32,
    marginHorizontal: 20,
    flex: 1,
    marginBottom: 30,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  cardImageContainer: {
    height: 240,
    width: "100%",
    backgroundColor: "#F45B69",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  audioButtonOverlay: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  cardContent: {
    padding: 24,
    flex: 1,
  },
  typeBadge: {
    backgroundColor: "rgba(244, 91, 105, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  typeText: {
    color: "#F45B69",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  wordTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  phonetic: {
    fontSize: 18,
    color: "#666",
    fontFamily: "System",
    marginBottom: 20,
  },
  definitionContainer: {
    marginBottom: 20,
  },
  definitionEn: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    lineHeight: 26,
    marginBottom: 4,
  },
  definitionVn: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
  exampleContainer: {
    backgroundColor: "rgba(244, 91, 105, 0.05)",
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#F45B69",
    marginBottom: 20,
  },
  exampleEn: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginBottom: 6,
  },
  exampleVn: {
    fontSize: 13,
    color: "#999",
  },
  highlight: {
    color: "#F45B69",
    fontWeight: "700",
  },
  synonymSection: {
    marginTop: "auto",
  },
  synonymTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#bbb",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  synonymContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  synonymChip: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  synonymText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
  },

  // Footer Buttons
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  buttonSecondary: {
    flex: 1,
    height: 56,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPrimary: {
    flex: 2,
    height: 56,
    backgroundColor: "#9B2C2C", // Darker red for button
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonTextPrimary: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginRight: 8,
  },
  buttonTextSecondary: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    opacity: 0.8,
  },

  // Quiz Styles
  quizContainer: {
    padding: 20,
  },
  quizQuestion: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 20,
    textAlign: "center",
  },
  quizOption: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#f0f0f0",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  optionIndex: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionIndexText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#999",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    flex: 1,
  },
  optionSelected: {
    borderColor: "#F45B69",
    backgroundColor: "rgba(244, 91, 105, 0.05)",
  },
  optionCorrect: {
    borderColor: "#10b981",
    backgroundColor: "#ecfdf5",
  },
  optionWrong: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  
  // Fill in the blank
  fillContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#eee",
  },
  fillText: {
    fontSize: 18,
    color: "#333",
    lineHeight: 28,
    textAlign: "center",
  },
  fillBlank: {
    borderBottomWidth: 2,
    borderBottomColor: "#F45B69",
    paddingHorizontal: 10,
    minWidth: 80,
    textAlign: "center",
    fontWeight: "800",
    color: "#F45B69",
  },
  wordBank: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  wordChip: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  wordChipText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
  },
  wordChipUsed: {
    opacity: 0.3,
    backgroundColor: "#f5f5f5",
  },

  // Match
  matchRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },
  matchColumn: {
    flex: 1,
    gap: 10,
  },
  matchCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#f0f0f0",
    minHeight: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  matchText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#444",
    textAlign: "center",
  },
  matchSelected: {
    borderColor: "#F45B69",
    backgroundColor: "rgba(244, 91, 105, 0.05)",
  },
  matchMatched: {
    borderColor: "#10b981",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    opacity: 0.5,
  },

  // Writing
  writingPrompt: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  writingInput: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    padding: 20,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#eee",
  },

  // Result
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  trophyContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  congratsText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)",
  },
  xpText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFD700",
    marginLeft: 10,
  },
});

export default styles;

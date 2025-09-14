import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Main Layout
  safeArea: {
    flex: 1,
    backgroundColor: '#F45B69',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF5F6',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F6',
    paddingHorizontal: 20,
  },
  // Header
 headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F45B69FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitleMain: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },

  // Loading & Error States
  loadingCard: {
    borderRadius: 20,
    elevation: 8,
    backgroundColor: 'white',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  errorCard: {
    borderRadius: 20,
    elevation: 8,
    backgroundColor: 'white',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },

  // Category Tags
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  categoryTag: {
    backgroundColor: '#F45B69',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    elevation: 3,
  },
  categoryTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  categorySubtag: {
    backgroundColor: 'rgba(244, 91, 105, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(244, 91, 105, 0.3)',
  },
  categorySubtagText: {
    color: '#F45B69',
    fontSize: 14,
    fontWeight: '500',
  },

  // Main Card
  mainCard: {
    marginBottom: 24,
    borderRadius: 20,
    elevation: 8,
  },
  questionCardStyle: {
    backgroundColor: 'white',
  },
  answerCardStyle: {
    backgroundColor: '#F45B69',
  },

  // Card Content - Question Side
  cardContent: {
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cardDecoration: {
    width: 40,
    height: 4,
    backgroundColor: '#F45B69',
    borderRadius: 2,
  },
  definition: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 12,
    lineHeight: 28,
    fontWeight: '400',
  },
  vietnamese: {
    fontSize: 18,
    color: '#F45B69',
    marginBottom: 20,
    lineHeight: 28,
    fontWeight: '500',
  },
  exampleContainer: {
    backgroundColor: '#F8FAFF',
    padding: 16,
    borderRadius: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4338CA',
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4338CA',
    marginBottom: 12,
  },
  example: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  exampleVi: {
    fontSize: 16,
    color: '#059669',
    fontStyle: 'italic',
    lineHeight: 24,
  },

  // Flip Hints
  flipHint: {
    alignItems: 'center',
    paddingTop: 16,
  },
  flipHintText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  flipHintTextWhite: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  flipIndicator: {
    width: 30,
    height: 3,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginTop: 8,
  },
  flipIndicatorWhite: {
    width: 30,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 2,
    marginTop: 8,
  },

  // Card Content - Answer Side
  answerCard: {
    padding: 40,
    alignItems: 'center',
    position: 'relative',
  },
  answerDecoration: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  answerWord: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  pronunciation: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    textAlign: 'center',
  },
  translation: {
    fontSize: 22,
    color: 'white',
    marginBottom: 24,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Section Cards
  sectionCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 5,
    backgroundColor: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  audioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  practiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  practiceSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 24,
  },
  practiceExample: {
    fontWeight: '600',
    color: '#F45B69',
    fontStyle: 'italic',
  },

  // Buttons
  playButton: {
    borderRadius: 12,
  },
  recordButton: {
    borderRadius: 12,
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(244, 91, 105, 0.1)',
    borderRadius: 10,
  },
  processingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },

  // Modal Styles
  modalSafeArea: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F45B69',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },

  // Score Card
  scoreCard: {
    marginBottom: 20,
    borderRadius: 20,
    elevation: 8,
    backgroundColor: 'white',
  },
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  scoreLabel: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 16,
    fontWeight: '500',
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#F45B69',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
  },
  totalScore: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreOutOf: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  scoreStatus: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Detailed Scores
  detailScores: {
    marginBottom: 20,
  },
  scoreRow: {
    marginBottom: 12,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'white',
  },
  scoreRowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreRowIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  scoreRowLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  scoreNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Comparison Card
  comparisonCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 5,
    backgroundColor: 'white',
  },
  comparisonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  textComparison: {
    marginBottom: 16,
  },
  expectedLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 8,
  },
  expectedTextContainer: {
    backgroundColor: '#ECFDF5',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  expectedText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  actualLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 8,
  },
  actualTextContainer: {
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  actualText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },

  // Feedback Card
  feedbackCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 5,
    backgroundColor: '#FFF9E6',
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D97706',
    marginBottom: 16,
  },
  feedbackItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  feedbackBullet: {
    fontSize: 16,
    color: '#D97706',
    marginRight: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  feedbackText: {
    flex: 1,
    fontSize: 15,
    color: '#92400E',
    lineHeight: 22,
  },

  // Modal Actions
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  tryAgainButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 12,
  },
  continueButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 12,
    borderColor: 'white',
  },
});

export default styles;
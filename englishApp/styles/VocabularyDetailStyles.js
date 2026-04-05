import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Main Layout
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#666',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#f5f5f7',
  },
  // Practice Header
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  progressBarContainer: {
    width: "100%",
    height: 6,
    backgroundColor: "#f1f5f9",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#b83535",
    borderRadius: 3,
  },
  stepIndicator: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748b",
    marginTop: 4,
    letterSpacing: 1,
  },

  // Word Section
  wordHero: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  levelBadge: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  levelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4AF37',
    marginRight: 6,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D4AF37',
  },
  mainWord: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    flexShrink: 1,
    // fontFamily: 'serif', // Fallback for specific serif look
  },
  phoneticContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  phoneticText: {
    fontSize: 22,
    color: '#666',
    marginRight: 15,
    fontFamily: 'monospace',
    flexShrink: 1,
  },
  playIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#b83535',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#b83535',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  // Tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
  },
  tagPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '700',
  },

  // Definitions Section
  sectionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  meaningCount: {
    fontSize: 13,
    color: '#888',
  },

  // Meaning Card
  meaningCard: {
    backgroundColor: '#f8f9fc',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f2f5',
  },
  meaningHeader: {
    marginBottom: 15,
  },
  meaningHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  indexCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2d3436',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  indexText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  typeBadge: {
    backgroundColor: '#ffeded',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    color: '#ef4444',
    fontSize: 11,
    fontWeight: '900',
  },
  vnWordText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flexShrink: 1,
    // fontFamily: 'serif',
  },

  // Definition Text
  defContainer: {
    marginBottom: 15,
  },
  defLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
  },
  defEn: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 22,
    marginBottom: 4,
  },
  defVn: {
    fontSize: 15,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 22,
  },

  // Example Block
  exampleBlock: {
    backgroundColor: '#2d343608',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#ef4444',
    marginBottom: 20,
  },
  exampleEn: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: 24,
    marginBottom: 6,
  },
  highlight: {
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  exampleVn: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },

  // Image Section
  imageGrid: {
    flexDirection: 'row',
    height: 180,
    gap: 10,
    marginBottom: 20,
  },
  mainImage: {
    flex: 2,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  sideImages: {
    flex: 1,
    gap: 10,
  },
  smallImage: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Synonyms Section
  synonymSection: {
    marginTop: 10,
  },
  synonymList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  synonymPill: {
    backgroundColor: '#2d343610',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2d343615',
  },
  synonymText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '600',
  },

  // States
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    padding: 20,
  },

  // Meaning Actions
  meaningActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
  },
  practiceBtn: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#f45b69',
  },
  practiceBtnText: {
    color: '#f45b69',
    fontWeight: '700',
    fontSize: 14,
  },
  startBtn: {
    backgroundColor: '#b83535',
  },
  startBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  doneBtn: {
    backgroundColor: "#ecfdf5",
    borderWidth: 1.5,
    borderColor: "#10b981",
  },
  doneBtnText: {
    color: "#10b981",
    fontWeight: "700",
    fontSize: 14,
  },

  // Practice Layout (Footer)
  practiceFooter: {
    padding: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    backgroundColor: '#fff',
  },
  nextBtn: {
    backgroundColor: "#b83535",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#b83535",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  disabledBtn: {
    backgroundColor: "#cbd5e1",
    shadowOpacity: 0,
    elevation: 0,
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // Completion Screen (Mirror from DailyPracticeStyles)
  completionContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: '#fff',
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ecfdf5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 12,
  },
  congratsDesc: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },

  // Modal Styles (for Quiz)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: '92%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  quizScroll: {
    flex: 1,
    padding: 20,
  },
  toastContainer: {
    zIndex: 9999,
  },

  // Recording Button States
  recordingBtn: {
    backgroundColor: '#fef2f2',
    borderWidth: 1.5,
    borderColor: '#ef4444',
  },
  recordingBtnText: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: 14,
  },

  // Practice Result Modal
  practiceModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  practiceModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  practiceModalHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#e2e8f0',
    marginBottom: 20,
  },
  practiceModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  scoreMessage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  scoreExample: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 24,
    lineHeight: 20,
  },
  practiceCloseBtn: {
    backgroundColor: '#b83535',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  practiceCloseBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  // ===== Pronunciation Analysis Modal (Light Theme) =====
  pronContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pronLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pronLoadingText: {
    marginTop: 16,
    color: '#64748b',
    fontSize: 15,
    fontWeight: '500',
  },
  pronScrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  // Header
  pronHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 40,
  },
  pronHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pronHeaderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    marginRight: 8,
  },
  pronHeaderLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1.5,
  },
  pronHeaderRight: {
    alignItems: 'flex-end',
  },
  pronProcessingLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  pronProcessingValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '800',
  },
  // Expected Text
  pronExpectedText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 24,
    lineHeight: 36,
  },
  // Score Circles Row
  pronScoresCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pronScoreCircleWrapper: {
    alignItems: 'center',
  },
  pronScoreRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  pronScoreRingInner: {
    alignItems: 'center',
  },
  pronScoreRingValue: {
    fontSize: 28,
    fontWeight: '900',
  },
  pronScoreRingSub: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
    marginTop: -2,
  },
  pronScoreRingLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1,
    marginTop: 10,
  },
  // Section Card
  pronSectionCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pronSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pronSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 1.5,
  },
  pronStepBadge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  pronStepBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b83535',
  },
  // Word Row
  pronWordRow: {
    marginBottom: 16,
  },
  pronWordInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pronWordText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  pronWordMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pronWordTime: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  pronWordPct: {
    fontSize: 15,
    fontWeight: '800',
  },
  pronBarTrack: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  pronBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  // Summary Row
  pronSummaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  pronSummaryBadgeCorrect: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  pronSummaryBadgeWrong: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  pronSummaryBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
  },
  // Phoneme Grid
  pronPhonemeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  pronPhonemeCell: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pronPhonemeCellText: {
    fontSize: 16,
    fontWeight: '700',
  },
  pronPhonemeIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  // Phoneme Comparison
  pronPhonemeComparison: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  pronComparisonLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1,
    marginBottom: 10,
  },
  pronPhonemeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  pronPhonemeMiniCell: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 32,
    alignItems: 'center',
  },
  pronPhonemeMiniText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  // Close Button
  pronCloseBtn: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  pronCloseBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});


export default styles;
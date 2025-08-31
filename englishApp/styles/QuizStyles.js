import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  tabContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tabButtonContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 8,
  },
  audioTabActive: {
    backgroundColor: '#9333EA',
  },
  textTabActive: {
    backgroundColor: '#059669',
  },
  tabInactive: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
  tabLabelInactive: {
    color: '#6B7280',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
  },
  audioBadge: {
    backgroundColor: '#EC4899',
  },
  textBadge: {
    backgroundColor: '#10B981',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  statsContainer: {
    marginBottom: 16,
  },
  statCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  quizCard: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeChip: {
    height: 28,
  },
  audioChip: {
    backgroundColor: '#F3E8FF',
  },
  textChip: {
    backgroundColor: '#ECFDF5',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  audioChipText: {
    color: '#9333EA',
  },
  textChipText: {
    color: '#059669',
  },
  questionNumber: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    lineHeight: 24,
  },
  textContent: {
    backgroundColor: '#F0FDF4',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  textQuestion: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  audioContent: {
    backgroundColor: '#FAF5FF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  audioInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  answerPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  answerLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  answerDots: {
    flexDirection: 'row',
    gap: 6,
  },
  answerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  audioDot: {
    backgroundColor: '#C084FC',
  },
  textDot: {
    backgroundColor: '#34D399',
  },
  cardActions: {
    padding: 16,
    paddingTop: 0,
  },
  startButton: {
    borderRadius: 10,
    flex: 1,
  },
  audioButton: {
    backgroundColor: '#9333EA',
  },
  textButton: {
    backgroundColor: '#059669',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EF4444',
    marginTop: 16,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#6366F1',
    borderRadius: 10,
  },
});

export default styles;
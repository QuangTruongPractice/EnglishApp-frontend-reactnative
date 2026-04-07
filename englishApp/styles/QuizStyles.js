import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf9f9',
  },
  // Header
  headerBackground: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },

  // Stats Card
  statsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
  },
  statItemLast: {
    borderRightWidth: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#9B2C2C',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
  },

  // List
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  // Quiz Card
  quizCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  
  // Specific Badge Colors
  badgeMC: { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
  textMC: { color: '#10b981' },
  badgeAUDIO: { backgroundColor: 'rgba(139, 92, 246, 0.1)' },
  textAUDIO: { color: '#8b5cf6' },
  badgeFILL: { backgroundColor: 'rgba(245, 158, 11, 0.1)' },
  textFILL: { color: '#f59e0b' },
  badgeMATCH: { backgroundColor: 'rgba(59, 130, 246, 0.1)' },
  textMATCH: { color: '#3b82f6' },
  badgeTEXT: { backgroundColor: 'rgba(107, 114, 128, 0.1)' },
  textTEXT: { color: '#6b7280' },

  questionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 24,
    marginBottom: 16,
  },
  
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  answerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  answerText: {
    fontSize: 13,
    color: '#999',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#9B2C2C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },

  // States
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#999',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1a1a",
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ef4444",
    marginTop: 16,
  },
  errorMessage: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: '#9B2C2C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '800',
  },
});

export default styles;
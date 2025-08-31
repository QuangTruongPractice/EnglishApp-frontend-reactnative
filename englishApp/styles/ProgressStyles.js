// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Container styles
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContentContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  // Text styles
  loadingText: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },

  // Header styles
  headerSurface: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  headerTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#666',
  },

  // Tab navigation
  tabNavigation: {
    marginBottom: 20,
  },

  // Summary cards
  summaryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  summaryCardLeft: {
    flex: 1,
    marginRight: 8,
  },
  summaryCardRight: {
    flex: 1,
    marginLeft: 8,
  },
  summaryCardContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  summaryNumberBlue: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  summaryNumberGreen: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },

  // Section titles
  sectionTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },

  // Empty state
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    color: '#666',
  },

  // Card styles
  card: {
    marginBottom: 12,
  },
  cardContent: {
    paddingVertical: 16,
  },

  // Video card styles
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  videoInfo: {
    flex: 1,
    marginRight: 8,
  },
  videoTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  videoMeta: {
    color: '#666',
    marginBottom: 8,
  },
  completedChip: {
    backgroundColor: '#E8F5E8',
  },
  completedChipText: {
    color: '#4CAF50',
  },

  // Progress styles
  progressContainer: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },

  // Video footer
  videoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: '#666',
  },
  videoButton: {
    backgroundColor: '#FF5722',
  },

  // Vocabulary card styles
  vocabularySection: {
    marginBottom: 16,
  },
  vocabularyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  vocabularyWordInfo: {
    flex: 1,
  },
  vocabularyWord: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  vocabularyPhonetic: {
    color: '#666',
    marginBottom: 8,
  },
  vocabularyActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusChip: {
    marginLeft: 4,
  },
  statusChipCompleted: {
    backgroundColor: '#E8F5E8',
  },
  statusChipInProgress: {
    backgroundColor: '#FFF3E0',
  },
  statusChipText: {
    fontSize: 10,
  },

  // Text content styles
  definitionText: {
    marginBottom: 8,
  },
  exampleText: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 8,
  },

  // Divider
  divider: {
    marginBottom: 16,
  },

  // Vietnamese section
  vietnameseTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },

  // Tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  wordTypeChip: {
    marginRight: 8,
    marginBottom: 4,
    backgroundColor: '#E3F2FD',
  },
  topicChip: {
    marginRight: 8,
    marginBottom: 4,
    backgroundColor: '#F3E5F5',
  },
  chipText: {
    fontSize: 10,
  },

  // Update date
  updateDate: {
    color: '#666',
    textAlign: 'right',
  },
});
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noVideoText: {
    fontSize: 16,
    color: '#666',
  },
  videoCard: {
    margin: 16,
    marginBottom: 8,
  },
  videoPlayerContainer: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  videoPlayer: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  videoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: -8,
  },
  statusChip: {
    backgroundColor: '#e8f5e8',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196f3',
    borderRadius: 2,
  },
  subtitlesCard: {
    margin: 16,
    marginTop: 8,
  },
  subtitlesHeader: {
    backgroundColor: '#2c3e50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  subtitlesHeaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
  },
  subtitlesContainer: {
    maxHeight: 500,
    backgroundColor: 'white',
  },
  subtitlesList: {
    flexGrow: 0,
  },
  subtitleItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedSubtitle: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  subtitleContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  timeContainer: {
    minWidth: 80,
    marginRight: 12,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  subtitleText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  translatedText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1976d2',
    fontStyle: 'italic',
    marginTop: 4,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#1976d2',
  },
  translatingText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  translateButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#7e2222",
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
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
    backgroundColor: '#e53935',
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
    backgroundColor: '#fff0f0',
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeSegments: {
    backgroundColor: '#fff0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeSegmentsText: {
    color: '#e53935',
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgeStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateText: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#999',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#f0eaeb',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#e53935',
    borderRadius: 2,
  },
  progressText: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#e53935',
  },
  subtitlesCard: {
    margin: 16,
    marginTop: 8,
  },
  subtitlesHeader: {
    backgroundColor: '#7e2222',
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
    backgroundColor: '#fff0f0',
    borderLeftWidth: 4,
    borderLeftColor: '#e53935',
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
    color: '#7e2222',
    fontStyle: 'italic',
    marginTop: 4,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#7e2222',
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
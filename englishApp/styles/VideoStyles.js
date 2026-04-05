import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fcf9f9",
  },
  container: {
    flex: 1,
    backgroundColor: "#fcf9f9",
  },
  // --- Header ---
  headerBackground: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
  },
  headerDecorativeCircle: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 220,
    height: 220,
    borderRadius: 175,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingWrapper: {
    paddingLeft: 12,
  },
  greetingText: {
    color: '#fde8e8',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  nameText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  // --- Search ---
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 24,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  // --- List & Loading ---
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcf9f9",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    marginBottom: 16,
    fontSize: 16,
    color: "#e53935",
  },
  retryButton: {
    minWidth: 120,
  },
  // --- Video Card ---
  videoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnailContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
    backgroundColor: '#e1e4e8',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playIconOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(150, 30, 30, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    lineHeight: 22,
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
    marginBottom: 8,
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
});

export default styles;
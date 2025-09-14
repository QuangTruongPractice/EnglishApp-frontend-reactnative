import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2196F3',
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
  },
  headerCard: {
    margin: 16,
    backgroundColor: '#2196F3',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
  },
  currentUserCard: {
    margin: 16,
    backgroundColor: '#E3F2FD',
  },
  unrankedCard: {
    margin: 16,
    backgroundColor: '#EEEEEE',
  },
  userCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  currentUserHighlight: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankText: {
    fontSize: 24,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  youChip: {
    marginLeft: 8,
  },
  userStats: {
    alignItems: 'center',
  },
  completedCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  completedLabel: {
    fontSize: 12,
    color: '#666',
  },
  errorCard: {
    margin: 16,
    backgroundColor: '#FFEBEE',
  },
  errorText: {
    color: '#D32F2F',
  },
});

export default styles;
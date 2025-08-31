import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#ccc',
    borderWidth: 3,
    borderColor: '#d32f2f',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    backgroundColor: '#d32f2f',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  role: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 5,
  },
  activeBadge: {
    backgroundColor: '#e8f5e8',
  },
  inactiveBadge: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
  fieldContainer: {
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 6,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 4,
    color: '#000',
  },
  info: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  readOnly: {
    color: '#666',
  },
  smallText: {
    fontSize: 14,
  },
  editButton: {
    padding: 8,
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 30,
    borderRadius: 10,
    paddingVertical: 5,
  },
});

export default styles;
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9a9a9ff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    marginHorizontal: 16,
    elevation: 4,
  },
  cardContent: {
    padding: 24,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    color: "#666",
  },
  input: {
    marginBottom: 4,
  },
  successCard: {
    backgroundColor: "#e8f5e8",
    marginBottom: 16,
  },
  successText: {
    color: "#2e7d32",
    textAlign: "center",
  },
  button: {
    marginBottom: 12,
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  linkButton: {
    marginTop: 16,
  },
  snackbar: {
    marginBottom: 16,
  },
  errorSnackbar: {
    backgroundColor: "#f44336",
  },
  successSnackbar: {
    backgroundColor: "#4caf50",
  },
});

export default styles;
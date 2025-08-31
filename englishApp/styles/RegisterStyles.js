import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9a9a9ff",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    minHeight: 700,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 10,
    zIndex: 1,
  },
  logoContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 8,
    elevation: 8,
    marginBottom: 15,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    color: "#b71c1c",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    flex: 1,
    marginTop: 10,
  },
  input: {
    backgroundColor: "white",
    marginBottom: 16,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#b71c1c",
  },
  error: {
    color: "#b71c1c",
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d32f2f",
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  dateIcon: {
    marginRight: 12,
  },
  dateContent: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  avatarButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#d32f2f",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  avatarButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  avatarPreviewContainer: {
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
    padding: 16,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: "#d32f2f",
  },
  avatarSuccessText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#d32f2f",
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    padding: 16,
    marginTop: 10,
  },
  loginText: {
    fontSize: 15,
    color: "#333",
  },
  loginLink: {
    color: "#d32f2f",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default styles;
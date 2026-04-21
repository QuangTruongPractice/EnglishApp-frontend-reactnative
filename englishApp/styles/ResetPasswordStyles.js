import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FDF9F9",
  },
  container: {
    padding: 24,
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FEEBEB",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#9B2C2C",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
    marginBottom: 35,
    fontWeight: "500",
    textAlign: "center",
  },
  emailBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 30,
    alignSelf: "center",
  },
  emailText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
    marginLeft: 8,
  },
  form: {
    marginTop: 10,
  },
  eyeIcon: {
    margin: 0,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#9B2C2C",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#9B2C2C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  backButton: {
    marginTop: 12,
  },
});

export default styles;

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
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#9B2C2C",
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
    marginBottom: 35,
    fontWeight: "500",
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
});

export default styles;

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
    justifyContent: "center",
    padding: 20,
    minHeight: 600,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#b71c1c",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "white",
  },
  button: {
    marginBottom: 10,
    paddingVertical: 8,
    backgroundColor: "#d32f2f",
  },
  link: {
    color: "#d32f2f",
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
  },
  error: {
    color: "#b71c1c",
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#ffebee",
    padding: 10,
    borderRadius: 5,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
});

export default styles;
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "flex-end",
    padding: 10,
    paddingBottom: 50,
    color: "white",
  },
  display: {
    padding: 20,
    alignItems: "flex-end",
  },
  displayText: {
    color: "#fff",
    fontSize: 48,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  roundButton: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  roundButtonText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 24,
    color: "orange",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: "white",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  deleteButton: {
    padding: 5,
  },
  task: {
    fontSize: 18,
    color: "white",
  },
  //---FlatList menu---//
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
  },
  suffixButton: {
    padding: 5,
    fontSize: 24,
    color: "black",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //---weather---//
  weatherScrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  weatherTopFrame: {
    alignItems: "center",
    marginBottom: 40,
  },
  weatherTitle: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "600",
  },
  weatherSubtitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  weatherTemperature: {
    fontSize: 90,
    color: "#fff",
    fontWeight: "200",
  },
  weatherDescription: {
    fontSize: 18,
    color: "#ccc",
    marginTop: 5,
  },
  weatherCardTitle: {
    color: "#9A9A9E",
    fontSize: 14,
    marginBottom: 8,
  },
  weatherCardValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  weatherCard: {
    backgroundColor: "#2C2C2E",
    width: "48%",
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  weatherRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
});

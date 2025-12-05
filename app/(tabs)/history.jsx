import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadHistory } from "../../utils/storage";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const saved = await loadHistory();
      if (mounted) setHistory(saved || []);
    };

    init();
    return () => {
      mounted = false;
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.entry}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.challenge}>{item.challenge}</Text>
      <Text style={item.completed ? styles.done : styles.missed}>
        {item.completed ? "Completed" : "Missed"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Challenge History</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        ListEmptyComponent={() => <Text>No history yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  entry: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  date: { fontWeight: "600", marginBottom: 4 },
  challenge: { marginBottom: 4 },
  done: { color: "#2e7d32", fontWeight: "600" },
  missed: { color: "#d32f2f", fontWeight: "600" },
});

import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.itemList}>
        <Text style={styles.item}>• Daily reminders (future)</Text>
        <Text style={styles.item}>• Choose categories (future)</Text>
        <Text style={styles.item}>• Clear history (future)</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  itemList: {
    padding: 8,
  },
  item: {
    fontSize: 16,
    marginBottom: 6,
  },
});

import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../theme/colors";

export default function Settings() {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.box}>
        <Text style={styles.item}>• Offline only — no data collected</Text>
        <Text style={styles.item}>
          • Change categories from data/challenges.json
        </Text>
        <Text style={styles.item}>• App is simple and private</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16, backgroundColor: colors.light.background },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.light.text,
    marginBottom: 12,
  },
  box: { padding: 12, backgroundColor: colors.light.card, borderRadius: 12 },
  item: { marginBottom: 8, color: colors.light.text },
});

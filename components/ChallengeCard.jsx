import { StyleSheet, Text, View } from "react-native";
import colors from "../theme/colors";
import shadows from "../theme/shadows";
import typography from "../theme/typography";

export default function ChallengeCard({ challenge }) {
  return (
    <View style={[styles.card, shadows.card]}>
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.desc}>{challenge.description}</Text>
      <Text style={styles.category}>{challenge.category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
  },
  title: {
    ...typography.subtitle,
    color: colors.textDark,
  },
  desc: {
    ...typography.body,
    color: colors.textLight,
    marginTop: 6,
  },
  category: {
    marginTop: 10,
    backgroundColor: colors.accent,
    alignSelf: "flex-start",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
  },
});

import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../theme/colors";
import typography from "../theme/typography";
import { loadStreak } from "../utils/storage";

export default function StreakCounter() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadStreak().then(setStreak);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔥 Streak: {streak} days</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: colors.light.card,
  },
  text: { ...typography.subtitle, color: colors.light.primary },
});

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";
import { saveCompleted } from "../utils/storage"; // ✅ Add this import

export default function ChallengeCard({
  challenge,
  simple = false,
  completed: completedProp = false,
  onComplete,
}) {
  // Normalize challenge structure
  const normalized =
    typeof challenge === "string"
      ? { category: "General", text: challenge }
      : challenge || { category: "General", text: "" };

  const [completed, setCompleted] = useState(Boolean(completedProp));

  const handleComplete = async () => {
    setCompleted(true);

    // ✅ Save to history
    await saveCompleted({
      category: normalized.category,
      text: normalized.text,
    });

    // Optional parent callback
    if (typeof onComplete === "function") onComplete();
  };

  return (
    <View
      style={[
        styles.card,
        simple && styles.simpleCard,
        completed && styles.cardCompleted,
      ]}
    >
      <Text style={styles.category}>{normalized.category}</Text>
      <Text style={styles.title}>{normalized.text}</Text>

      {completed ? (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>Completed ✓</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <Text style={styles.buttonText}>Mark Complete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.light.card,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
  },
  simpleCard: {
    padding: 12,
  },
  cardCompleted: {
    backgroundColor: "#e8f7ea",
    borderColor: "#ccefd0",
  },
  category: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.light.primary,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.light.text,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.light.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
  completedBadge: {
    backgroundColor: "#4ade80",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  completedText: { fontWeight: "700" },
});

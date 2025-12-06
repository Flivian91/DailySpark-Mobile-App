import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../theme/colors";

export default function CategorySelector({
  challenges = [],
  selected = "All",
  onSelect,
}) {
  // challenges is array of {id, category, text}
  const cats = [
    "All",
    ...Array.from(
      new Set((challenges || []).map((c) => c.category || "General"))
    ),
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {cats.map((cat) => {
        const active = cat === selected;
        return (
          <TouchableOpacity
            key={cat}
            style={[styles.pill, active && styles.pillActive]}
            onPress={() => onSelect(cat)}
          >
            <Text style={[styles.pillText, active && styles.pillTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 2 },
  pill: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.light.card,
    borderWidth: 1,
    borderColor: "#eee",
  },
  pillActive: { backgroundColor: colors.light.primary },
  pillText: { color: colors.light.text },
  pillTextActive: { color: "#fff", fontWeight: "700" },
});

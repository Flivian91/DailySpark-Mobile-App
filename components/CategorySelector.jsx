import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../theme/colors";

export default function CategorySelector({
  selected,
  onSelect,
  challenges = [],
}) {
  // Safely get unique categories
  const categories = [
    "All",
    ...new Set((challenges || []).map((c) => c.category)),
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          onPress={() => onSelect(cat)}
          style={[styles.button, selected === cat && styles.buttonActive]}
        >
          <Text style={[styles.text, selected === cat && styles.textActive]}>
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 15,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginRight: 15,
    backgroundColor: colors.light.border,
    borderRadius: 20,
  },
  buttonActive: {
    backgroundColor: colors.light.primary,
  },
  text: {
    color: colors.light.text,
  },
  textActive: {
    color: "#fff",
    fontWeight: "600",
  },
});

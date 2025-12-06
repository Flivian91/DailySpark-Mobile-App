import { ScrollView, StyleSheet } from "react-native";
import colors from "../theme/colors";
import CategoryPill from "./CategoryPill";

export default function CategorySelector({
  selected,
  onSelect,
  challenges = [],
}) {
  const categories = [
    "All",
    ...new Set((challenges || []).map((c) => c?.category || "")),
  ].filter(Boolean);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => (
        <CategoryPill
          key={cat}
          label={cat}
          active={selected === cat}
          onPress={() => onSelect(cat)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

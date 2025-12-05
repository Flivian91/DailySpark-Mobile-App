import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CategorySelector from "../../components/CategorySelector";
import ChallengeCard from "../../components/ChallengeCard";
import colors from "../../theme/colors";
import typography from "../../theme/typography";
import { getChallengeList } from "../../utils/storage";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const list = getChallengeList(); // transformed array
    setChallenges(list);
  }, []);

  const filtered =
    selectedCategory === "All"
      ? challenges
      : challenges.filter((c) => c.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DailySpark</Text>

      <CategorySelector
        challenges={challenges}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChallengeCard challenge={item.text} />}
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light.background, padding: 20 },
  title: { ...typography.title, marginBottom: 10, color: colors.light.text },
});

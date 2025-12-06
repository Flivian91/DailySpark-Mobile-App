import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategorySelector from "../../components/CategorySelector";
import ChallengeCard from "../../components/ChallengeCard";
import colors from "../../theme/colors";
import {
  getChallengeList,
  getTodayKey,
  loadHistory,
  loadTodayChallenge,
  markCompletedForToday,
  saveTodayChallenge,
} from "../../utils/storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [today, setToday] = useState(null);
  const [allChallenges, setAllChallenges] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const init = async () => {
      const list = getChallengeList();
      setAllChallenges(list);

      const stored = await loadTodayChallenge();
      if (stored && stored.date === getTodayKey()) {
        setToday(stored);
      } else {
        // pick random from all
        const pool = list;
        const pick = pool.length
          ? pool[Math.floor(Math.random() * pool.length)]
          : null;
        if (pick) {
          const obj = {
            date: getTodayKey(),
            challenge: pick,
            completed: false,
          };
          await saveTodayChallenge(obj);
          setToday(obj);
        }
      }

      const h = await loadHistory();
      setHistory(h || []);
    };

    init();
  }, []);

  // when generating another challenge (ensure completed = false)
const onGenerateAnother = async () => {
  const pool =
    selectedCategory === "All"
      ? allChallenges
      : allChallenges.filter((c) => c.category === selectedCategory);
  if (!pool.length) return;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  const obj = { date: getTodayKey(), challenge: pick, completed: false };
  await saveTodayChallenge(obj); // saves with completed:false
  setToday(obj);
};

// when marking today's challenge completed
const onMarkCompleted = async () => {
  if (!today) return;
  // markCompletedForToday updates TODAY_KEY and adds/updates history entry
  const updated = await markCompletedForToday(true);
  if (updated) {
    setToday(updated);
    // update local history state if you keep it
    const h = await loadHistory();
    setHistory(h || []);
  }
};

  const filteredList =
    selectedCategory === "All"
      ? allChallenges
      : allChallenges.filter((c) => c.category === selectedCategory);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>DailySpark</Text>
        <Text style={styles.subtitle}>Small sparks, big habits.</Text>
      </View>

      <CategorySelector
        challenges={allChallenges}
        selected={selectedCategory}
        onSelect={(cat) => setSelectedCategory(cat)}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today`s challenge</Text>
        {today ? (
          <ChallengeCard
            challenge={today.challenge}
            completed={today.completed}
            onComplete={onMarkCompleted}
          />
        ) : (
          <Text style={styles.helper}>No challenge for today.</Text>
        )}

        <View style={styles.row}>
          <TouchableOpacity style={styles.smallBtn} onPress={onGenerateAnother}>
            <Text style={styles.smallBtnText}>Generate Another</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          More {selectedCategory} challenges
        </Text>
        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChallengeCard challenge={item} simple />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16, backgroundColor: colors.light.background },
  header: { marginBottom: 6 },
  title: { fontSize: 28, fontWeight: "800", color: colors.light.text },
  subtitle: { fontSize: 14, color: colors.light.textLight, marginTop: 2 },
  section: { marginTop: 14 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.light.text,
    marginBottom: 8,
  },
  helper: { color: colors.light.textLight },
  row: { flexDirection: "row", marginTop: 12 },
  smallBtn: {
    backgroundColor: colors.light.primary,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  smallBtnText: { color: "#fff", fontWeight: "700" },
});

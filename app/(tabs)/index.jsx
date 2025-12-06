import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import ChallengeCard from "../../components/ChallengeCard";
import CategorySelector from "../../components/CategorySelector";
import { getTodayKey, loadTodayChallenge, saveTodayChallenge } from "../../utils/storage";
import challengesData from "../../data/challenges.json";
import colors from "../../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [challenge, setChallenge] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const today = getTodayKey();
      const stored = await loadTodayChallenge();
      if (mounted) {
        if (stored && stored.date === today) {
          setChallenge(stored.challenge);
          return;
        }
        const ch = pickRandomChallenge();
        setChallenge(ch);
        await saveTodayChallenge({ date: today, challenge: ch, completed: false });
      }
    };
    init();
    return () => { mounted = false; };
  }, []);

  const pickRandomChallenge = (category) => {
    const pool = category && category !== "All"
      ? challengesData[category] || []
      : Object.keys(challengesData).flatMap(k => challengesData[k] || []);
    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const onCategorySelect = (category) => {
    setSelectedCategory(category);
    const ch = pickRandomChallenge(category);
    if (ch) setChallenge(ch);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Welcome to DailySpark</Text>

      <CategorySelector
        selected={selectedCategory}
        onSelect={onCategorySelect}
        challenges={Object.keys(challengesData).flatMap(cat =>
          challengesData[cat].map(text => ({ category: cat, text }))
        )}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {challenge ? (
          <ChallengeCard challenge={challenge} />
        ) : (
          <Text style={styles.loading}>Loading challenge...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.light.text,
    marginBottom: 12,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  loading: {
    fontSize: 18,
    color: "#888",
    marginTop: 50,
    textAlign: "center",
  },
});

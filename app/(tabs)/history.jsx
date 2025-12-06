import React, { useEffect, useState } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChallengeCard from "../../components/ChallengeCard";
import colors from "../../theme/colors";
import { clearHistory, getCompleted } from "../../utils/storage";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const saved = await getCompleted();
    const grouped = groupByDate(saved);
    setHistory(grouped);
  };

  const handleClear = async () => {
    await clearHistory();
    setHistory([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Completed Challenges</Text>

        {history.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <SectionList
        sections={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <ChallengeCard challenge={item} simple completed />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No completed challenges yet</Text>
        }
      />
    </View>
  );
}

const groupByDate = (data) => {
  if (!data || data.length === 0) return [];

  const groups = {};

  data.forEach((item) => {
    const date = new Date(item.date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let label = date.toDateString();

    if (date.toDateString() === today.toDateString()) {
      label = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      label = "Yesterday";
    }

    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  });

  return Object.keys(groups).map((label) => ({
    title: label,
    data: groups[label],
  }));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.light.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.light.text,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 8,
    color: colors.light.primary,
  },
  empty: {
    marginTop: 30,
    textAlign: "center",
    color: "#888",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  clearBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ef4444",
    borderRadius: 8,
  },
  clearText: {
    color: "#fff",
    fontWeight: "700",
  },
});

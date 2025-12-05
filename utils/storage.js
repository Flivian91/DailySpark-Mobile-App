import AsyncStorage from "@react-native-async-storage/async-storage";
import challenges from "../data/challenges.json";

import challengesData from "../data/challenges.json";

export function getChallengeList() {
  // Transform the object into an array with category
  return Object.keys(challengesData).flatMap(category =>
    challengesData[category].map((challenge, idx) => ({
      id: `${category}-${idx}`,
      category,
      text: challenge
    }))
  );
}

export async function loadChallenges() {
  return challenges;
}

const TODAY_KEY = "dailySpark_today";
const HISTORY_KEY = "dailySpark_history";
const STREAK_KEY = "dailySpark_streak";

async function safeParse(raw) {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveTodayChallenge({
  date,
  challenge,
  completed = false,
}) {
  const obj = { date, challenge, completed };
  await AsyncStorage.setItem(TODAY_KEY, JSON.stringify(obj));

  const rawHistory = await AsyncStorage.getItem(HISTORY_KEY);
  const history = (await safeParse(rawHistory)) || [];

  const idx = history.findIndex((h) => h.date === date);
  if (idx >= 0) history[idx] = obj;
  else history.unshift(obj);

  await AsyncStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(history.slice(0, 365))
  );

  if (completed) {
    await updateStreak();
  }
}

export async function loadTodayChallenge() {
  const raw = await AsyncStorage.getItem(TODAY_KEY);
  return await safeParse(raw);
}

export async function markCompletedForToday() {
  const obj = await loadTodayChallenge();
  if (!obj) return;
  obj.completed = true;
  await saveTodayChallenge(obj);
}

export async function loadHistory() {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  return (await safeParse(raw)) || [];
}

export async function loadStreak() {
  const raw = await AsyncStorage.getItem(STREAK_KEY);
  return (await safeParse(raw)) || 0;
}

export async function updateStreak() {
  let streak = await loadStreak();
  streak += 1;
  await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(streak));
}

// utils/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import rawData from "../data/challenges.json";

const TODAY_KEY = "dailySpark_today";
const HISTORY_KEY = "completed_challenges";
const STREAK_KEY = "dailySpark_streak";

export function getTodayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

// transform raw data object to array of {id, category, text}
export function getChallengeList() {
  const arr = [];
  Object.keys(rawData).forEach((category) => {
    const list = rawData[category] || [];
    list.forEach((text, idx) => {
      arr.push({ id: `${category}-${idx}`, category, text });
    });
  });
  return arr;
}

/**
 * Save the object that represents today's challenge.
 * obj = { date: 'YYYY-MM-DD', challenge: {category,text,id}, completed: boolean }
 */
export async function saveTodayChallenge(obj) {
  try {
    await AsyncStorage.setItem(TODAY_KEY, JSON.stringify(obj));

    // also ensure history contains this entry (update or insert)
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    const history = raw ? JSON.parse(raw) : [];
    const idx = history.findIndex(
      (h) => h.date === obj.date && h.challenge?.id === obj.challenge?.id
    );

    if (idx >= 0) {
      history[idx] = { ...history[idx], ...obj };
    } else {
      // if the item is marked completed when saving, push to history; otherwise just keep for record
      history.unshift(obj);
    }

    await AsyncStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history.slice(0, 365))
    );
  } catch (e) {
    console.warn("saveTodayChallenge error", e);
  }
}

export async function loadTodayChallenge() {
  try {
    const raw = await AsyncStorage.getItem(TODAY_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Mark today's stored challenge as completed (or not).
 * This updates TODAY_KEY and also pushes to HISTORY_KEY when completed becomes true.
 */
export async function markCompletedForToday(val = true) {
  try {
    const raw = await AsyncStorage.getItem(TODAY_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    obj.completed = Boolean(val);
    await AsyncStorage.setItem(TODAY_KEY, JSON.stringify(obj));

    // update history: if completed, ensure it exists in history (update or add)
    const rawH = await AsyncStorage.getItem(HISTORY_KEY);
    const history = rawH ? JSON.parse(rawH) : [];
    const idx = history.findIndex(
      (h) => h.date === obj.date && h.challenge?.id === obj.challenge?.id
    );

    if (idx >= 0) {
      history[idx] = { ...history[idx], ...obj };
    } else {
      history.unshift(obj);
    }

    await AsyncStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history.slice(0, 365))
    );
    return obj;
  } catch (e) {
    console.warn("markCompletedForToday error", e);
    return null;
  }
}

/**
 * Save a completed challenge entry to the history (used when marking complete outside today)
 * entry = { category, text, id?, date(optional) }
 */
export async function saveCompleted(entry) {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    const history = raw ? JSON.parse(raw) : [];

    const item = {
      date: new Date().toISOString(),
      challenge: {
        id:
          entry.id ||
          `${entry.category}-${Math.random().toString(36).slice(2, 9)}`,
        category: entry.category || "General",
        text: entry.text || "",
      },
      completed: true,
    };

    history.unshift(item);
    await AsyncStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history.slice(0, 365))
    );

    // if this item matches today's challenge, also update TODAY_KEY
    const todayRaw = await AsyncStorage.getItem(TODAY_KEY);
    if (todayRaw) {
      const todayObj = JSON.parse(todayRaw);
      if (
        todayObj.challenge &&
        (todayObj.challenge.id === item.challenge.id ||
          (todayObj.challenge.text === item.challenge.text &&
            todayObj.challenge.category === item.challenge.category))
      ) {
        todayObj.completed = true;
        await AsyncStorage.setItem(TODAY_KEY, JSON.stringify(todayObj));
      }
    }
  } catch (e) {
    console.warn("saveCompleted error", e);
  }
}

export async function getCompleted() {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("getCompleted error", e);
    return [];
  }
}

/**
 * Clear all history. Also resets today's completed flag (if a today item exists)
 */
export async function clearHistory() {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);

    const todayRaw = await AsyncStorage.getItem(TODAY_KEY);
    if (todayRaw) {
      const todayObj = JSON.parse(todayRaw);
      if (todayObj) {
        todayObj.completed = false;
        await AsyncStorage.setItem(TODAY_KEY, JSON.stringify(todayObj));
      }
    }
  } catch (e) {
    console.warn("clearHistory error", e);
  }
}

/** Optional: load streak stored as number */
export async function loadStreak() {
  try {
    const raw = await AsyncStorage.getItem(STREAK_KEY);
    return raw ? Number(JSON.parse(raw)) : 0;
  } catch {
    return 0;
  }
}

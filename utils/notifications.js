import * as Notifications from "expo-notifications";

export async function scheduleDailyReminder(hour = 9, minute = 0) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "DailySpark Reminder",
      body: "Open the app for your daily challenge!",
    },
    trigger: { hour, minute, repeats: true },
  });
}

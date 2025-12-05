import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function Layout() {
  const scheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        screenBackgroundColor: scheme === "dark" ? "#121212" : "#F7F9FC",
      }}
    >
      <Stack.Screen name="onboarding" options={{ title: "Onboarding" }} />
    </Stack>
  );
}

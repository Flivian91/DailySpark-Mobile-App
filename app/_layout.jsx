import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const scheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          statusBarStyle: "light",
          headerShown: false,
          screenBackgroundColor: scheme === "dark" ? "#121212" : "#F7F9FC",
        }}
      >
        <Stack.Screen name="onboarding" options={{ title: "Onboarding" }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

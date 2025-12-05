import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";
import typography from "../theme/typography";

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/LOGO.svg")}
        style={styles.logo}
        contentFit="cover"
        transition={1000}
      />
      <Text style={styles.title}>Welcome to DailySpark</Text>
      <Text style={styles.subtitle}>
        Build habits, complete challenges, and track your streaks!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.light.background,
  },
  logo: { width: 320, height: 120, marginBottom: 30 },
  title: { ...typography.title, marginBottom: 10 },
  subtitle: {
    ...typography.body,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.light.primary,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

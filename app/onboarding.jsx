import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import colors from "../theme/colors";
import typography from "../theme/typography";

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animated.View entering={FadeInDown.springify().delay(200)}>
        <Image
          source={require("../assets/images/LOGO.svg")}
          style={styles.logo}
          contentFit="contain"
        />
      </Animated.View>

      {/* Hero Illustration */}
      <Animated.View entering={FadeInUp.springify().delay(400)}>
        <Image
          source={require("../assets/images/hero2.avif")}
          style={styles.hero}
          contentFit="contain"
        />
      </Animated.View>

      {/* Title */}
      <Animated.Text
        entering={FadeInUp.springify().delay(600)}
        style={styles.title}
      >
        Welcome to DailySpark
      </Animated.Text>

      {/* Subtitle */}
      <Animated.Text
        entering={FadeInUp.springify().delay(800)}
        style={styles.subtitle}
      >
        Build daily habits, complete fun challenges, and stay consistent with
        your streaks.
      </Animated.Text>

      {/* Button */}
      <Animated.View entering={FadeInUp.springify().delay(1000)}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    paddingTop: 80,
    backgroundColor: colors.light.background,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 10,
  },
  hero: {
    width: 300,
    height: 260,
    marginVertical: 25,
  },
  title: {
    ...typography.title,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 6,
    fontSize: 28,
  },
  subtitle: {
    ...typography.body,
    textAlign: "center",
    color: "#6F6F6F",
    fontSize: 16,
    paddingHorizontal: 20,
    marginBottom: 40,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});

import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import * as Haptics from "expo-haptics";
import colors from "../theme/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ChallengeCard({ challenge }) {
  const [completed, setCompleted] = useState(false);
  const translateX = useSharedValue(0);

  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  // Gesture for swipe
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (e.translationX > SCREEN_WIDTH * 0.35) {
        runOnJS(handleComplete)();
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateZ: `${translateX.value / 20}deg` },
    ],
    opacity: completed ? withTiming(0.7) : 1,
    backgroundColor: completed
      ? "#4ade80"
      : "rgba(255,255,255,0.12)", // card color
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {completed && (
          <LottieView
            source={require("../assets/lottie/confetti.json")}
            autoPlay
            loop={false}
            style={styles.confetti}
          />
        )}

        <View style={styles.content}>
          <Text style={styles.category}>{challenge.category}</Text>
          <Text style={styles.title}>{challenge.text}</Text>

          <View style={styles.progress}>
            <Animated.View
              style={[
                styles.progressFill,
                { width: completed ? "100%" : "0%" },
              ]}
            />
          </View>

          {!completed && (
            <TouchableOpacity style={styles.button} onPress={handleComplete}>
              <Text style={styles.buttonText}>Mark Complete</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  content: {
    zIndex: 2,
  },
  category: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.light.primary,
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 16,
  },
  progress: {
    width: "100%",
    height: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.light.primary,
    borderRadius: 10,
  },
  button: {
    backgroundColor: colors.light.primary,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  confetti: {
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
    height: 140,
    zIndex: 1,
  },
});

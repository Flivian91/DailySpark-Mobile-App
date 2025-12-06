import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import colors from "../theme/colors";

export default function CategoryPill({ label, active, onPress }) {
  // Hooks must ALWAYS be here, not inside a map
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(active ? 1.08 : 1) }],
    shadowOpacity: withSpring(active ? 0.25 : 0.05),
    elevation: active ? 4 : 2,
  }));

  return (
    <Animated.View style={[animatedStyle, styles.wrap]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, active && styles.buttonActive]}
      >
        <Text style={[styles.text, active && styles.textActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginRight: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.light.card,
    borderRadius: 30,
    borderWidth: 1.2,
    borderColor: colors.light.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  buttonActive: {
    backgroundColor: colors.light.primary,
    borderColor: colors.light.primary,
    shadowColor: colors.light.primary,
  },
  text: {
    color: colors.light.text,
    fontSize: 14,
    fontWeight: "500",
  },
  textActive: {
    color: "#fff",
    fontWeight: "700",
  },
});

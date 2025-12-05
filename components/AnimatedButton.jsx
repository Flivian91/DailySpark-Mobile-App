import { useRef } from "react";
import { Animated, Text, TouchableOpacity } from "react-native";

export default function AnimatedButton({ title, onPress, style }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    onPress && onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={style}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

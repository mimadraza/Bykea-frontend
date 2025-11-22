// src/Component/FareCounter.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText"; // Import your wrapper
import { useAccessibility } from "../context/AccessibilityContext"; // Import hook

interface Props {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onOpenCustom: () => void;    // NEW
}

const FareCounter: React.FC<Props> = ({
  value,
  onIncrease,
  onDecrease,
  onOpenCustom,
}) => {
  const { colors } = useAccessibility(); // Get colors

  return (
    <View style={[styles.container, { backgroundColor: colors.buttonBackground }]}>
      <TouchableOpacity onPress={onDecrease}>
        <AccessibleText style={styles.button}>−</AccessibleText>
      </TouchableOpacity>

      {/* tap fare to open popup */}
      <TouchableOpacity onPress={onOpenCustom}>
        <AccessibleText style={styles.value}>{value}</AccessibleText>
      </TouchableOpacity>

      <TouchableOpacity onPress={onIncrease}>
        <AccessibleText style={styles.button}>+</AccessibleText>
      </TouchableOpacity>
    </View>
  );
};

export default FareCounter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: "#1E1F22", // Removed hardcoded color
    borderRadius: 40,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  button: {
    fontSize: 26,
    color: "white", // Keeping white for contrast with buttonBackground
    paddingHorizontal: 8,
  },
  value: {
    fontSize: 18,
    color: "white", // Keeping white for contrast with buttonBackground
    width: 40,
    textAlign: "center",
    fontWeight: "600",
  },
});
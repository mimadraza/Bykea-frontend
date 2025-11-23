import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText"; 
import { useAccessibility } from "../context/AccessibilityContext";

interface Props {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onOpenCustom: () => void;   
}

const FareCounter: React.FC<Props> = ({
  value,
  onIncrease,
  onDecrease,
  onOpenCustom,
}) => {
  const { colors, borderWidth } = useAccessibility();

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.inputBackground,
        borderColor: colors.border,
        borderWidth: borderWidth
      }
    ]}>
      <TouchableOpacity onPress={onDecrease}>
        <AccessibleText style={[styles.button, { color: colors.text }]}>−</AccessibleText>
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpenCustom}>
        <AccessibleText style={[styles.value, { color: colors.text }]}>{value}</AccessibleText>
      </TouchableOpacity>

      <TouchableOpacity onPress={onIncrease}>
        <AccessibleText style={[styles.button, { color: colors.text }]}>+</AccessibleText>
      </TouchableOpacity>
    </View>
  );
};

export default FareCounter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: "#1E1F22", // REMOVED
    borderRadius: 40,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  button: {
    fontSize: 26,
    // color: "white", // REMOVED
    paddingHorizontal: 8,
  },
  value: {
    fontSize: 18,
    // color: "white", // REMOVED
    width: 40,
    textAlign: "center",
    fontWeight: "600",
  },
});
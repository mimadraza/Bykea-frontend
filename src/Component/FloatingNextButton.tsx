import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext"; // 1. Import

interface Props {
  onPress: () => void;
}

const FloatingNextButton: React.FC<Props> = ({ onPress }) => {
  const { colors } = useAccessibility(); // 2. Get Colors

  return (
    <TouchableOpacity
      // 3. Override background with dynamic primary color
      style={[styles.btn, { backgroundColor: colors.primary, shadowColor: colors.primary }]}
      onPress={onPress}
    >
      <AccessibleText style={styles.arrow}>{">"}</AccessibleText>
    </TouchableOpacity>
  );
};

export default FloatingNextButton;

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: 25,
    right: 25,
    // backgroundColor: "#3dff73", //  Removed
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    // shadowColor: "#3dff73",     //  Removed
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
  },
  arrow: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1f242c",
  },
});
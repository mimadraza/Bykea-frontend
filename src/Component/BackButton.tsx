import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext"; // 1. Import

interface Props {
  onPress?: () => void;
}

const BackButton: React.FC<Props> = ({ onPress }) => {
  const { colors } = useAccessibility(); // 2. Get Colors

  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: colors.surface }]} // 3. Dynamic BG
      onPress={onPress}
    >
      {/* 4. Dynamic Icon Color */}
      <AccessibleText style={[styles.icon, { color: colors.text }]}>
        ←
      </AccessibleText>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 25,
    // backgroundColor: "#25282B", // REMOVED
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    // color: "white", // REMOVED to allow theme switching
    position : "absolute",
    bottom : 1,
  },
});
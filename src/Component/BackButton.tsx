import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText"; // Import your wrapper
import { useAccessibility } from "../context/AccessibilityContext"; // Import hook

interface Props {
  onPress?: () => void;
}

const BackButton: React.FC<Props> = ({ onPress }) => {
  const { colors } = useAccessibility(); // Get colors

  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: colors.buttonBackground }]} onPress={onPress}>
      {/* Icon color is now derived from the theme's text color in AccessibleText,
          but since we explicitly set white in styles, we update that inline */}
      <AccessibleText style={[styles.icon, { color: colors.buttonText }]}>←</AccessibleText>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 25,
    // backgroundColor: "#25282B", // Removed hardcoded color
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    // color: "white", // Removed hardcoded color
    position : "absolute",
    bottom : 1,
  },
});
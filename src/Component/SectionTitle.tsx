import React from "react";
import { StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext"; // 1. Import

const SectionTitle = ({ text }: { text: string }) => {
  const { colors } = useAccessibility(); // 2. Get Colors

  return (
    // 3. Override color
    <AccessibleText style={[styles.title, { color: colors.primary }]}>
      {text}
    </AccessibleText>
  );
};

export default SectionTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "700",
    // color: "#3dff73", //  Removed
    marginBottom: 10,
    marginTop: 25,
  },
});
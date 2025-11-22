// This file is fine as is, since the translation is done by the parent screen (AccessibilityScreen.tsx).
// The prop `text` is already being passed as `t("vision")`, etc.
import React from "react";
import { Text, StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext"; // Import hook

const SectionTitle = ({ text }: { text: string }) => {
  const { colors } = useAccessibility(); // Get colors
  return <AccessibleText style={[styles.title, { color: colors.primary }]}>{text}</AccessibleText>;
};

export default SectionTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "700",
    // color: "#3dff73", // Removed hardcoded color
    marginBottom: 10,
    marginTop: 25,
  },
});
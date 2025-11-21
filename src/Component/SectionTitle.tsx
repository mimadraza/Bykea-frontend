import React from "react";
import { Text, StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText"; // Import your wrapper

const SectionTitle = ({ text }: { text: string }) => {
  return <AccessibleText style={styles.title}>{text}</AccessibleText>;
};

export default SectionTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3dff73",
    marginBottom: 10,
    marginTop: 25,
  },
});

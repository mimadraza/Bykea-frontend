import React from "react";
import { Text, StyleSheet } from "react-native";

const SectionTitle = ({ text }: { text: string }) => {
  return <Text style={styles.title}>{text}</Text>;
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

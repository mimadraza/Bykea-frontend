// Component/IconButton.tsx
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AccessibleText from "./AccessibleText";

interface Props {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

const IconButton = ({ icon, label, onPress }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.icon}>{icon}</View>
      <AccessibleText style={styles.text}>{label}</AccessibleText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2D333A",
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12
  },
  icon: {
    marginRight: 12
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default IconButton;

import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext";

interface Props {
  label: string;
  onPress?: () => void;
  rightIcon?: React.ReactNode;
}

const CardButton = ({ label, onPress, rightIcon }: Props) => {
  const { colors, borderWidth } = useAccessibility();

  return (
    <Pressable 
      onPress={onPress} 
      style={[
        styles.card, 
        { 
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: borderWidth
        }
      ]}
    >
      <AccessibleText style={styles.text}>{label}</AccessibleText>
      {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    // backgroundColor: "#2D333A", // REMOVED
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12
  },
  text: {
    // color: "white", // REMOVED
    fontSize: 16,
    fontWeight: "600"
  },
  icon: {
    marginLeft: 8
  }
});

export default CardButton;
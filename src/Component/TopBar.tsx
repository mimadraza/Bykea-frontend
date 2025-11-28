import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Logo from "./Logo";
import { useAccessibility } from "../context/AccessibilityContext";

interface Props {
  onMenuPress?: () => void;
}

const TopBar: React.FC<Props> = ({ onMenuPress }) => {
  const { colors } = useAccessibility();

  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        style={[styles.menuButton, { backgroundColor: colors.surface }]}
        onPress={onMenuPress}
      >
        {/* Menu Lines use Primary Color (Green/Blue) */}
        <View style={[styles.menuLine, { backgroundColor: colors.primary }]} />
        <View style={[styles.menuLine, { backgroundColor: colors.primary }]} />
        <View style={[styles.menuLine, { backgroundColor: colors.primary }]} />
      </TouchableOpacity>

      <Logo size={32} />

      <View style={{ width: 40 }} />
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topBar: {
    position: "absolute",
    top: 20,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: "space-evenly",
    // backgroundColor: "rgba(37, 40, 43, 1)", // REMOVED
    borderRadius: 99,
    padding: 7,
  },
  menuLine: {
    width: "100%",
    height: 3,
    // backgroundColor: "#3dff73", // REMOVED
    borderRadius: 999,
  },
});
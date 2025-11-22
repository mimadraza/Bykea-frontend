import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Logo from "./Logo";
import { useAccessibility } from "../context/AccessibilityContext"; // Import hook

interface Props {
  onMenuPress?: () => void;
}

const TopBar: React.FC<Props> = ({ onMenuPress }) => {
  const { colors } = useAccessibility(); // Get colors

  // Define dynamic menuLine style
  const menuLineStyle = [styles.menuLine, { backgroundColor: colors.primary }];

  return (
    <View style={styles.topBar}>
      {/* Menu Button */}
      <TouchableOpacity
        style={[styles.menuButton, { backgroundColor: colors.buttonBackground }]} // Use buttonBackground
        onPress={onMenuPress}
      >
        <View style={menuLineStyle} />
        <View style={menuLineStyle} />
        <View style={menuLineStyle} />
      </TouchableOpacity>

      {/* Logo */}
      <Logo size={32} />

      {/* Right side spacer */}
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
    // backgroundColor: "rgba(37, 40, 43, 1)", // Removed hardcoded color
    borderRadius: 10,
    padding: 7,
  },

  menuLine: {
    width: "100%",
    height: 5,
    // backgroundColor: "#3dff73", // Removed hardcoded color
    borderRadius: 4,
  },
});
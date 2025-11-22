import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useAccessibility } from "../context/AccessibilityContext"; // Import hook

interface ToggleProps {
  value: boolean;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ value, onChange }) => {
  const { colors } = useAccessibility(); // Get colors

  return (
    <TouchableOpacity style={styles.container} onPress={onChange}>
      <View style={[styles.track, { backgroundColor: colors.buttonBackground }, value && [styles.trackOn, { backgroundColor: colors.primary }]]}>
        <View style={[styles.thumb, value && styles.thumbOn]} />
      </View>
    </TouchableOpacity>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },

  track: {
    width: 55,
    height: 28,
    borderRadius: 15,
    // backgroundColor: "#444", // Removed hardcoded color
    justifyContent: "center",
    paddingHorizontal: 3,
  },

  trackOn: {
    // backgroundColor: "#3dff73", // Removed hardcoded color
  },

  thumb: {
    width: 22,
    height: 22,
    borderRadius: 12,
    backgroundColor: "#ccc", // Keeping light gray/white for contrast
    transform: [{ translateX: 0 }],
  },

  thumbOn: {
    backgroundColor: "#fff",
    transform: [{ translateX: 27 }],
  },
});
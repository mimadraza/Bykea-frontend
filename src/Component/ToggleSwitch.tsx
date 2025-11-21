import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

interface ToggleProps {
  value: boolean;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ value, onChange }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onChange}>
      <View style={[styles.track, value && styles.trackOn]}>
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
    backgroundColor: "#444",
    justifyContent: "center",
    paddingHorizontal: 3,
  },

  trackOn: {
    backgroundColor: "#3dff73",
  },

  thumb: {
    width: 22,
    height: 22,
    borderRadius: 12,
    backgroundColor: "#ccc",
    transform: [{ translateX: 0 }],
  },

  thumbOn: {
    backgroundColor: "#fff",
    transform: [{ translateX: 27 }],
  },
});

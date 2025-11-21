import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
}

const FloatingNextButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.arrow}>{">"}</Text>
    </TouchableOpacity>
  );
};

export default FloatingNextButton;

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#3dff73",
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3dff73",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
  },

  arrow: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1f242c",
  },
});

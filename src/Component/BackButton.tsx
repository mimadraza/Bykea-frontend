import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  onPress?: () => void;
}

const BackButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.icon}>←</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#25282B",
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    color: "white",
    position : "absolute",
    bottom : 1,
  },
});

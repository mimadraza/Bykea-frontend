import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText"; // Import your wrapper
interface Props {
  onPress?: () => void;
}

const BackButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <AccessibleText style={styles.icon}>←</AccessibleText>
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

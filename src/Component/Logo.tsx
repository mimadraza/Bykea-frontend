import React from "react";
import {  StyleSheet, ViewStyle } from "react-native";
import AccessibleText from "./AccessibleText"; // Import your wrapper
interface LogoProps {
  size?: number;
  style?: ViewStyle;
}

const Logo: React.FC<LogoProps> = ({ size = 48, style }) => {
  return (
    <AccessibleText style={[styles.logo, { fontSize: size }, style]}>
      Bykea
    </AccessibleText>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    fontWeight: "bold",
    color: "#3dff73",
    textShadowColor: "rgba(61,255,115,0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
});

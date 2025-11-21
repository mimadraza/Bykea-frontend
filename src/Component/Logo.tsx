import React from "react";
import { Text, StyleSheet, ViewStyle } from "react-native";

interface LogoProps {
  size?: number;
  style?: ViewStyle;
}

const Logo: React.FC<LogoProps> = ({ size = 48, style }) => {
  return (
    <Text style={[styles.logo, { fontSize: size }, style]}>
      Bykea
    </Text>
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

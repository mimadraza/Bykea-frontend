import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import AccessibleText from "./AccessibleText";
import { useTranslation } from "react-i18next"; // 1. Import this

interface LogoProps {
  size?: number;
  style?: ViewStyle;
}

const Logo: React.FC<LogoProps> = ({ size = 48, style }) => {
  const { t } = useTranslation(); // 2. Get the translate function
  return (
    <AccessibleText style={[styles.logo, { fontSize: size }, style]}>
      {t("logo_text")}
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
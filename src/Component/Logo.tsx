import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import AccessibleText from "./AccessibleText";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext"; // 1. Import

interface LogoProps {
  size?: number;
  style?: ViewStyle;
}

const Logo: React.FC<LogoProps> = ({ size = 48, style }) => {
  const { t } = useTranslation();
  const { colors } = useAccessibility(); // 2. Get Colors

  return (
    <AccessibleText
      style={[
        styles.logo,
        { fontSize: size },
        style,
        { color: colors.primary, textShadowColor: colors.primary } // 3. Apply Dynamic Color
      ]}
    >
      {t("logo_text")}
    </AccessibleText>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    fontWeight: "bold",
    // color: "#3dff73", //  Removed
    // textShadowColor: "rgba(61,255,115,0.7)", //  Removed
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
});
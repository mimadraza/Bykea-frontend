import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import AccessibleText from "./AccessibleText";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext"; // Import hook

interface LogoProps {
  size?: number;
  style?: ViewStyle;
}

const Logo: React.FC<LogoProps> = ({ size = 48, style }) => {
  const { t } = useTranslation();
  const { colors } = useAccessibility(); // Get colors

  return (
    <AccessibleText style={[
      styles.logo,
      {
        fontSize: size,
        color: colors.primary, // Use primary color
        textShadowColor: colors.primary // Use primary color for shadow
      },
      style
    ]}>
      {t("logo_text")}
    </AccessibleText>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    fontWeight: "bold",
    // color: "#3dff73", // Removed hardcoded color
    // textShadowColor: "rgba(61,255,115,0.7)", // Removed hardcoded color
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
});
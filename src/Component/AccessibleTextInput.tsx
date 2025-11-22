import React from "react";
import { TextInput, TextInputProps, StyleSheet, TextStyle } from "react-native";
import { useAccessibility } from "../context/AccessibilityContext";

interface AccessibleTextInputProps extends TextInputProps {
  style?: TextStyle | TextStyle[];
}

const AccessibleTextInput: React.FC<AccessibleTextInputProps> = ({
  style,
  ...props
}) => {
  // 1. Get highContrast boolean too
  const { fontSizeMultiplier, colors, borderWidth, highContrast } = useAccessibility();

  const flatStyle = StyleSheet.flatten(style || {});
  const baseFontSize = flatStyle.fontSize || 14;
  const newFontSize = baseFontSize * fontSizeMultiplier;
  const textColor = flatStyle.color || colors.text;

  return (
    <TextInput
      {...props}
      style={[
        // 2. Base Defaults (So inputs always have a boundary)
        {
          borderColor: colors.border,
          borderWidth: 1, // Default thin border
          backgroundColor: colors.inputBackground
        },

        // 3. The styles passed from your screens (allows overriding normal state)
        style,

        // 4. High Contrast Enforcement
        // If High Contrast is ON, we FORCE the thick border and color,
        // overriding any specific screen styles to guarantee visibility.
        highContrast && {
          borderColor: colors.border,
          borderWidth: borderWidth, // This will be 3px
        },

        // 5. Text Sizing & Color (Always Applied)
        { fontSize: newFontSize, color: textColor }
      ]}
      placeholderTextColor={props.placeholderTextColor || colors.textSecondary}
    />
  );
};

export default AccessibleTextInput;
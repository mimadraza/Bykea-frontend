import React from "react";
import { TextInput, TextInputProps, StyleSheet, TextStyle } from "react-native";
import { useAccessibility } from "../context/AccessibilityContext";

// It accepts all standard TextInput properties (placeholder, onChangeText, etc.)
interface AccessibleTextInputProps extends TextInputProps {
  style?: TextStyle | TextStyle[];
}

const AccessibleTextInput: React.FC<AccessibleTextInputProps> = ({
  style,
  ...props
}) => {
  const { fontSizeMultiplier, colors } = useAccessibility(); // Get colors

  // 1. Get the original font size defined in your styles (or default to 14)
  const flatStyle = StyleSheet.flatten(style || {});
  const baseFontSize = flatStyle.fontSize || 14;

  // 2. Calculate the zoomed size
  const newFontSize = baseFontSize * fontSizeMultiplier;

  // 3. Apply theme text color if no specific color is set in style
  const textColor = flatStyle.color || colors.text;

  return (
    <TextInput
      {...props}
      // 4. Apply styles, overwriting fontSize and color with the calculated/themed ones
      style={[style, { fontSize: newFontSize, color: textColor }]}
      // Update placeholderTextColor to ensure readability against dynamic background
      placeholderTextColor={props.placeholderTextColor || colors.textSecondary}
    />
  );
};

export default AccessibleTextInput;
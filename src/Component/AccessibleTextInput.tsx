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
  const { fontSizeMultiplier } = useAccessibility();

  // 1. Get the original font size defined in your styles (or default to 14)
  const flatStyle = StyleSheet.flatten(style || {});
  const baseFontSize = flatStyle.fontSize || 14;

  // 2. Calculate the zoomed size
  const newFontSize = baseFontSize * fontSizeMultiplier;

  return (
    <TextInput
      {...props}
      // 3. Apply styles, overwriting fontSize with the calculated one
      style={[style, { fontSize: newFontSize }]}
    />
  );
};

export default AccessibleTextInput;
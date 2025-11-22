import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { useAccessibility } from '../context/AccessibilityContext';

interface AccessibleTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

const AccessibleText: React.FC<AccessibleTextProps> = ({ style, children, ...props }) => {
  const { fontSizeMultiplier, colors } = useAccessibility(); // Get colors

  const flatStyle = StyleSheet.flatten(style || {});
  const baseFontSize = flatStyle.fontSize || 14;

  // If the style provided has a specific color, use it.
  // If not, use the theme's default text color.
  const textColor = flatStyle.color || colors.text;

  const newFontSize = baseFontSize * fontSizeMultiplier;

  return (
    <Text
      {...props}
      style={[style, { fontSize: newFontSize, color: textColor }]}
    >
      {children}
    </Text>
  );
};

export default AccessibleText;
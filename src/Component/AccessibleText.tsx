import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { useAccessibility } from '../context/AccessibilityContext';

interface AccessibleTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

const AccessibleText: React.FC<AccessibleTextProps> = ({ style, children, ...props }) => {
  const { fontSizeMultiplier } = useAccessibility();

  // Flatten styles to get the current fontSize (defaulting to 14 if not defined)
  const flatStyle = StyleSheet.flatten(style || {});
  const currentFontSize = flatStyle.fontSize || 14;

  // Calculate new size
  const newFontSize = currentFontSize * fontSizeMultiplier;

  return (
    <Text
      {...props}
      style={[style, { fontSize: newFontSize }]} // Override fontSize
    >
      {children}
    </Text>
  );
};

export default AccessibleText;
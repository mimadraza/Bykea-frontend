import React, { createContext, useState, useContext, ReactNode } from 'react';
import i18n from '../i18n/i18n';
import {
  LightTheme, DarkTheme,
  LightColorblindTheme, DarkColorblindTheme,
  HighContrastLight, HighContrastDark, // Import overrides
  ThemeColors
} from '../constants/colors';

type AccessibilityContextType = {
  largeText: boolean;
  setLargeText: (value: boolean) => void;
  fontSizeMultiplier: number;
  isUrdu: boolean;
  toggleUrdu: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  colorBlind: boolean;
  toggleColorBlind: () => void;

  // NEW: High Contrast Props
  highContrast: boolean;
  toggleHighContrast: () => void;

  colors: ThemeColors;
  borderWidth: number;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [largeText, setLargeText] = useState(false);
  const [isUrdu, setIsUrdu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [colorBlind, setColorBlind] = useState(false);

  // 1. Add High Contrast State
  const [highContrast, setHighContrast] = useState(false);

  const fontSizeMultiplier = largeText ? 1.3 : 1.0;
  //LOGIC: If High Contrast, borders are 3px. Otherwise 1px (or 0 for some cards)
  const borderWidth = highContrast ? 3 : 1;
  // --- THEME GENERATION LOGIC ---
  // 1. Select Base Theme (Light/Dark + Standard/Colorblind)
  let baseTheme: ThemeColors;
  if (colorBlind) {
    baseTheme = isDarkMode ? DarkColorblindTheme : LightColorblindTheme;
  } else {
    baseTheme = isDarkMode ? DarkTheme : LightTheme;
  }

  // 2. Apply High Contrast Overrides if active
  // We mix the 'baseTheme' (for the Primary color) with the 'HighContrast' values
  const activeColors = highContrast
    ? {
        ...baseTheme, // Keep the Primary color (Green or Blue)
        ...(isDarkMode ? HighContrastDark : HighContrastLight) // Override Bg/Text/Borders
      }
    : baseTheme;

  const toggleUrdu = () => {
    const newValue = !isUrdu;
    setIsUrdu(newValue);
    i18n.changeLanguage(newValue ? 'ur' : 'en');
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleColorBlind = () => setColorBlind(!colorBlind);

  // 3. Toggle Function
  const toggleHighContrast = () => setHighContrast(!highContrast);

  return (
    <AccessibilityContext.Provider
      value={{
        largeText, setLargeText, fontSizeMultiplier,
        isUrdu, toggleUrdu,
        isDarkMode, toggleTheme,
        colorBlind, toggleColorBlind,

        // Pass new props
        highContrast, toggleHighContrast,

        colors: activeColors,
        borderWidth
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error("useAccessibility must be used within an AccessibilityProvider");
  return context;
};
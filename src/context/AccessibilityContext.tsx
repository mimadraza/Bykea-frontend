import React, { createContext, useState, useContext, ReactNode } from 'react';
import i18n from '../i18n/i18n';
// Import the colors
import { LightTheme, DarkTheme, ThemeColors } from '../constants/colors';

type AccessibilityContextType = {
  // Existing props
  largeText: boolean;
  setLargeText: (value: boolean) => void;
  fontSizeMultiplier: number;
  isUrdu: boolean;
  toggleUrdu: () => void;

  // NEW: Theme props
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: ThemeColors; // This holds the ACTIVE colors
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [largeText, setLargeText] = useState(false);
  const [isUrdu, setIsUrdu] = useState(false);

  // 1. Default to Dark Mode (since your app started that way)
  const [isDarkMode, setIsDarkMode] = useState(true);

  const fontSizeMultiplier = largeText ? 1.3 : 1.0;

  // 2. Calculate current colors based on state
  const colors = isDarkMode ? DarkTheme : LightTheme;

  const toggleUrdu = () => {
    const newValue = !isUrdu;
    setIsUrdu(newValue);
    i18n.changeLanguage(newValue ? 'ur' : 'en');
  };

  // 3. Toggle Theme Function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        largeText, setLargeText, fontSizeMultiplier,
        isUrdu, toggleUrdu,

        // Pass theme data down
        isDarkMode, toggleTheme, colors
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
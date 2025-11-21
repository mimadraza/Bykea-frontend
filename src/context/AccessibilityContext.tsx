import React, { createContext, useState, useContext, ReactNode } from 'react';
import i18n from '../i18n/i18n'; // Import i18n instance

type AccessibilityContextType = {
  largeText: boolean;
  setLargeText: (value: boolean) => void;
  fontSizeMultiplier: number;

  // Add Urdu Support
  isUrdu: boolean;
  toggleUrdu: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [largeText, setLargeText] = useState(false);
  const [isUrdu, setIsUrdu] = useState(false);

  const fontSizeMultiplier = largeText ? 1.3 : 1.0;

  // Function to toggle language
  const toggleUrdu = () => {
    const newValue = !isUrdu;
    setIsUrdu(newValue);
    // Tell i18n to change the language
    i18n.changeLanguage(newValue ? 'ur' : 'en');
  };

  return (
    <AccessibilityContext.Provider
      value={{
        largeText,
        setLargeText,
        fontSizeMultiplier,
        isUrdu,
        toggleUrdu
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
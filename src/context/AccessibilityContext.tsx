import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context
type AccessibilityContextType = {
  largeText: boolean;
  setLargeText: (value: boolean) => void;
  fontSizeMultiplier: number; // 1.0 for normal, 1.3 (or higher) for large
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [largeText, setLargeText] = useState(false);

  // If largeText is true, multiply fonts by 1.3, otherwise 1.0
  const fontSizeMultiplier = largeText ? 1.3 : 1.0;

  return (
    <AccessibilityContext.Provider value={{ largeText, setLargeText, fontSizeMultiplier }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Custom hook to use the context easily
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
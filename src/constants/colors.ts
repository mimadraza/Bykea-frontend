// --- STANDARD THEMES ---
export const LightTheme = {
  background: "#FFFFFF",
  surface: "#F5F5F5",
  text: "#000000",
  textSecondary: "#555555",
  primary: "#2ECC71",
  border: "#E0E0E0",
  icon: "#333333",
  inputBackground: "#FFFFFF",
  cardBackground: "#FFFFFF",       // White cards for light mode
  sheetBackground: "#F5F5F5",      // Light grey bottom sheet
};

export const DarkTheme = {
  background: "#1F242C",
  surface: "#2c333d",
  text: "#FFFFFF",
  textSecondary: "#A0A0A0",
  primary: "#2ECC71",
  border: "#3E4857",
  icon: "#FFFFFF",
  inputBackground: "#37404a",
  cardBackground: "rgba(68,72,75,0.95)",
  sheetBackground: "rgba(30,35,45,1)",
};

// --- COLORBLIND THEMES ---
export const LightColorblindTheme = {
  ...LightTheme,
  primary: "#007AFF",
  cardBackground: "#FFFFFF",
  sheetBackground: "#F5F5F5",
};

export const DarkColorblindTheme = {
  ...DarkTheme,
  primary: "#5AC8FA",
  cardBackground: "rgba(68,72,75,0.95)",
  sheetBackground: "rgba(30,35,45,1)",
};

// --- HIGH CONTRAST OVERRIDES ---
export const HighContrastLight = {
  background: "#FFFFFF",
  surface: "#FFFFFF",
  text: "#000000",
  textSecondary: "#000000",
  border: "#000000",
  icon: "#000000",
  inputBackground: "#FFFFFF",
  cardBackground: "#FFFFFF",
  sheetBackground: "#FFFFFF",
};

export const HighContrastDark = {
  background: "#000000",
  surface: "#000000",
  text: "#FFFFFF",
  textSecondary: "#FFFF00",
  border: "#FFFFFF",
  icon: "#FFFFFF",
  inputBackground: "#000000",
  cardBackground: "#000000",
  sheetBackground: "#000000",
};

export type ThemeColors = typeof LightTheme;
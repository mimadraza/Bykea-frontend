export const LightTheme = {
  background: "#FFFFFF",
  surface: "#F5F5F5",      // For cards/inputs
  text: "#000000",
  textSecondary: "#555555",
  primary: "#2ECC71",      // Your green button color
  border: "#E0E0E0",
  icon: "#333333"
};

export const DarkTheme = {
  background: "#1F242C",   // Your current dark bg
  surface: "#2c333d",      // Your current card/input bg
  text: "#FFFFFF",
  textSecondary: "#A0A0A0",
  primary: "#2ECC71",
  border: "#3E4857",
  icon: "#FFFFFF"
};

// Define the type for typescript autocomplete
export type ThemeColors = typeof LightTheme;
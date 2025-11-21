import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
// Import the provider
import { AccessibilityProvider } from "./src/context/AccessibilityContext";

export default function App() {
  return (
    // Wrap the entire app
    <AccessibilityProvider>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </AccessibilityProvider>
  );
}
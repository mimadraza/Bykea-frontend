import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
// Import the provider
import { AccessibilityProvider } from "./src/context/AccessibilityContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "./src/i18n/i18n";
export default function App() {
  return (
    // Wrap the entire app
    <GestureHandlerRootView style={{ flex: 1 }}>
        <AccessibilityProvider>
          <StatusBar barStyle="light-content" />
          <AppNavigator />
        </AccessibilityProvider>
    </GestureHandlerRootView>
  );
}
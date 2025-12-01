import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { AccessibilityProvider } from "./src/context/AccessibilityContext";
import "./src/i18n/i18n";

// 1. Import Clarity
import * as Clarity from "@microsoft/react-native-clarity";
import { getLoggedInUser } from "./src/backend/authBackend";

export default function App() {

  // 2. Initialize Clarity
 useEffect(() => {
     // 1. Initialize
     Clarity.initialize("uemhlx0pev");

     // 2. Check if user is already logged in and identify them
     const checkUser = async () => {
       const userPhone = await getLoggedInUser();
       if (userPhone) {
         Clarity.setCustomUserId(userPhone);
       }
     };
     checkUser();
   }, []);

  return (
    <AccessibilityProvider>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </AccessibilityProvider>
  );
}
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccessibilityScreen from "../screens/AccessibilityScreen";
import SplashScreen from "../screens/SplashScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AuthScreen from "../screens/AuthScreen";
import OTPVerificationScreen from "../screens/OTPVerificationScreen";
import HomeScreen from "../screens/HomeScreen";
import ChooseRideScreen from "../screens/ChooseRideScreen";
import RideRequestScreen from "../screens/RideRequestScreen";
import RideHistoryScreen from "../screens/RideHistoryScreen";
import RideInProgressScreen from "../screens/RideInProgressScreen";
import HelplineScreen from "../screens/HelplineScreen";
import DeliveryDetailsScreen from "../screens/DeliveryDetailsScreen";
import ParcelDetailsScreen from "../screens/ParcelDetailsScreen";
import SearchingRiderScreen from "../screens/SearchingRiderScreen";


export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Pickup: undefined;
  Accessibility : undefined;
  ChooseRide: {
     destination: string;
   };
   RideRequest: {
     rideType: "Motorbike" | "Car" | "RickShaw";
     fare: number;
     destination: string;
   };
   RideInProgress: {
       driver: { name: string; rating: number };
       fare: number;
       destination: string;
       rideType : string;
       start: { lat: number; lng: number };
       end: { lat: number; lng: number };
       geometry: { lat: number; lng: number }[];
   };
  Profile: undefined;
  RideHistory: undefined;
  Helpline: undefined;
  DeliveryDetails: undefined;
  ParcelDetails: undefined;
  SearchingRider: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChooseRide" component={ChooseRideScreen} />
        <Stack.Screen
          name="RideRequest"
          component={RideRequestScreen}

          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="RideHistory" component={RideHistoryScreen} />
        <Stack.Screen name="RideInProgress" component={RideInProgressScreen} />
        <Stack.Screen name="Helpline" component={HelplineScreen} />
        <Stack.Screen name="DeliveryDetails" component={DeliveryDetailsScreen} />
        <Stack.Screen name="ParcelDetails" component={ParcelDetailsScreen} />
        <Stack.Screen name="SearchingRider" component={SearchingRiderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

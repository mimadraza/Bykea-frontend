// src/screens/PickupScreen.tsx
import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

import { WebView } from "react-native-webview";
import html_script from "./html_script";

import TopBar from "../Component/TopBar";
import Sidebar from "../Component/Sidebar";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import { RootStackParamList } from "../navigation/AppNavigator";
import AccessibleText from "../Component/AccessibleText";
import AccessibleTextInput from "../Component/AccessibleTextInput";
import { useAccessibility } from "../context/AccessibilityContext"; // Import hook

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const PickupScreen: React.FC = () => {
  const mapRef = useRef<WebView>(null);
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();
  const { colors } = useAccessibility(); // Get colors

  // SIDEBAR STATE
  const [open, setOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-260))[0];

  const toggleSidebar = () => {
    const toValue = open ? -260 : 0;
    setOpen(!open);

    Animated.timing(slideAnim, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const recentLocations = [
    t("recent_loc_1", { defaultValue: "Iba, University Road, Karachi" }),
    t("recent_loc_2", { defaultValue: "Falcon complex, Siam house" }),
    t("recent_loc_3", { defaultValue: "Saima mall, North Nazimabad" }),
  ];

  return (
    <View style={styles.container}>
      {/* MAP */}
      <WebView
        ref={mapRef}
        source={{ html: html_script }}
        style={styles.map}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={["*"]}
        mixedContentMode="always"
      />

      {/* TOP BAR */}
      <TopBar onMenuPress={toggleSidebar} />

      {/* SIDEBAR - ABOVE EVERYTHING */}
      {open && (
        <>
          <TouchableOpacity style={styles.overlay} onPress={toggleSidebar} />
          <Sidebar slideAnim={slideAnim} onClose={toggleSidebar} />
        </>
      )}

      {/* PICKUP CARD – should stay on top of map but BELOW sidebar */}
      <View style={[styles.overlayCard, { backgroundColor: colors.sheetBackground }]}>
        <View style={styles.markerColumn}>
          {/* Pickup location marker */}
          <View style={[styles.circleOuter, { borderColor: colors.text }]}>
            <View style={[styles.circleInner, { backgroundColor: colors.text }]} />
          </View>
          {/* Dotted line (Keeping accent color for route) */}
          <View style={[styles.dottedLine, { backgroundColor: colors.accent }]} />
          {/* Destination arrow (Keeping accent color for route) */}
          <AccessibleText style={[styles.arrow, { color: colors.accent }]}>➤</AccessibleText>
        </View>

        <View style={{ flex: 1 }}>
          <View style={[styles.inputRow, { backgroundColor: colors.inputBackground }]}>
            <AccessibleText style={styles.inputText}>
              {t("pickup_static_location")}
            </AccessibleText>
            <AccessibleText style={[styles.plus, { color: colors.primary }]}>+</AccessibleText>
          </View>

          <View style={[styles.inputRow, { backgroundColor: colors.inputBackground }]}>
            <AccessibleTextInput
              placeholder={t("destination_placeholder")}
              placeholderTextColor={colors.textSecondary}
              style={styles.destInput}
            />
          </View>

          {/* RECENT LOCATIONS */}
          <View style={styles.recentContainer}>
            <AccessibleText style={styles.recentTitle}>
              {t("recent_locations_title")}
            </AccessibleText>

            {recentLocations.map((loc, i) => (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  navigation.navigate("ChooseRide", { destination: loc })
                }
              >
                <AccessibleText style={[styles.recentItem, { borderColor: colors.border, color: colors.textSecondary }]}>{loc}</AccessibleText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  /* DARK OVERLAY */
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 40,
  },

  /* SIDEBAR (top layer) */
  sidebar: {
    zIndex: 50,
  },

  /* PICKUP CARD */
  overlayCard: {
    position: "absolute",
    top: 90,
    left: 20,
    right: 20,
    padding: 18,
    borderRadius: 24,
    // backgroundColor: "rgba(30, 35, 45, 0.98)", // Removed hardcoded color
    flexDirection: "row",
    zIndex: 20,
  },

  markerColumn: {
    alignItems: "center",
    marginRight: 14,
  },

  circleOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    // borderColor: "#fff", // Removed hardcoded color
    justifyContent: "center",
    alignItems: "center",
  },

  circleInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    // backgroundColor: "#fff", // Removed hardcoded color
  },

  dottedLine: {
    width: 2,
    height: 55,
    // backgroundColor: "#ffc107", // Removed hardcoded color
    marginVertical: 6,
  },

  arrow: {
    fontSize: 20,
    // color: "#ffc107", // Removed hardcoded color
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "#2c333d", // Removed hardcoded color
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },

  inputText: {
    // color: "white", // Handled by AccessibleText
    fontSize: 15,
    flex: 1,
    marginRight: 10,
  },

  plus: {
    // color: "#3dff73", // Removed hardcoded color
    fontSize: 24,
    fontWeight: "bold",
  },

  destInput: {
    // color: "white", // Handled by AccessibleTextInput
    fontSize: 15,
    flex: 1,
  },

  recentContainer: {
    marginTop: 12,
  },

  recentTitle: {
    // color: "#fff", // Handled by AccessibleText
    fontWeight: "700",
    marginBottom: 6,
  },

  recentItem: {
    // color: "#fff", // Removed hardcoded color
    paddingVertical: 4,
    borderBottomWidth: 1,
    // borderColor: "#444", // Removed hardcoded color
    fontSize: 13,
  },
});
import React, { useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
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
import { useAccessibility } from "../context/AccessibilityContext";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const PickupScreen: React.FC = () => {
  const mapRef = useRef<WebView>(null);
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();
  const { colors, borderWidth } = useAccessibility();

  const [open, setOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-260))[0];

  const toggleSidebar = () => {
    const toValue = open ? -260 : 0;
    setOpen(!open);
    Animated.timing(slideAnim, { toValue, duration: 250, useNativeDriver: true }).start();
  };

  const recentLocations = [
    t("recent_loc_1", { defaultValue: "Iba, University Road, Karachi" }),
    t("recent_loc_2", { defaultValue: "Falcon complex, Siam house" }),
    t("recent_loc_3", { defaultValue: "Saima mall, North Nazimabad" }),
  ];

  return (
    <View style={styles.container}>
      <WebView ref={mapRef} source={{ html: html_script }} style={styles.map} javaScriptEnabled domStorageEnabled />
      <TopBar onMenuPress={toggleSidebar} />
      {open && (<>
          <TouchableOpacity style={styles.overlay} onPress={toggleSidebar} />
          <Sidebar slideAnim={slideAnim} onClose={toggleSidebar} />
        </>)}

      <View style={[
        styles.overlayCard,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          borderWidth: borderWidth
        }
      ]}>
        <View style={styles.markerColumn}>
          <View style={[styles.circleOuter, { borderColor: colors.text }]}>
            <View style={[styles.circleInner, { backgroundColor: colors.text }]} />
          </View>
          <View style={[styles.dottedLine, { backgroundColor: colors.textSecondary }]} />
          <AccessibleText style={{ fontSize: 20, color: colors.textSecondary }}>➤</AccessibleText>
        </View>

        <View style={{ flex: 1 }}>
          <View style={[styles.inputRow, { backgroundColor: colors.inputBackground }]}>
            <AccessibleText style={styles.inputText}>{t("pickup_static_location")}</AccessibleText>
            <AccessibleText style={[styles.plus, { color: colors.primary }]}>+</AccessibleText>
          </View>

          <View style={[styles.inputRow, { backgroundColor: colors.inputBackground }]}>
            <AccessibleTextInput placeholder={t("destination_placeholder")} placeholderTextColor="#777" style={styles.destInput} />
          </View>

          <View style={styles.recentContainer}>
            <AccessibleText style={styles.recentTitle}>{t("recent_locations_title")}</AccessibleText>
            {recentLocations.map((loc, i) => (
              <TouchableOpacity key={i} onPress={() => navigation.navigate("ChooseRide", { destination: loc })}>
                <AccessibleText style={[styles.recentItem, { borderColor: colors.border }]}>{loc}</AccessibleText>
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
  map: { position: "absolute", width: "100%", height: "100%", zIndex: 1 },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 40 },
  overlayCard: { position: "absolute", top: 90, left: 20, right: 20, padding: 18, borderRadius: 24, flexDirection: "row", zIndex: 20 },
  markerColumn: { alignItems: "center", marginRight: 14 },
  circleOuter: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, justifyContent: "center", alignItems: "center" },
  circleInner: { width: 8, height: 8, borderRadius: 4 },
  dottedLine: { width: 2, height: 55, marginVertical: 6 },
  inputRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 10 },
  inputText: { fontSize: 15, flex: 1, marginRight: 10 },
  plus: { fontSize: 24, fontWeight: "bold" },
  destInput: { fontSize: 15, flex: 1 },
  recentContainer: { marginTop: 12 },
  recentTitle: { fontWeight: "700", marginBottom: 6 },
  recentItem: { paddingVertical: 4, borderBottomWidth: 1, fontSize: 13 },
});
import React, { useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import html_script from "./html_script";
import TopBar from "../Component/TopBar";
import Sidebar from "../Component/Sidebar";
import { RootStackParamList } from "../navigation/AppNavigator";
import AccessibleText from "../Component/AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();
  const { colors, borderWidth } = useAccessibility();
  const mapRef = useRef<WebView>(null);

  const [open, setOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-260))[0];

  const toggleSidebar = () => {
    const toValue = open ? -260 : 0;
    setOpen(!open);
    Animated.timing(slideAnim, { toValue, duration: 250, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={mapRef}
        source={{ html: html_script }}
        style={styles.map}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={["*"]}
        mixedContentMode="always"
      />

      <TopBar onMenuPress={toggleSidebar} />

      {open && <Sidebar slideAnim={slideAnim} onClose={toggleSidebar} />}

      {/* Decorative background for bottom area */}
      <View style={[styles.middleContainer, { backgroundColor: colors.sheetBackground }]} />

      <View style={styles.overlayButtons}>
        <TouchableOpacity
          style={[
            styles.largeCard,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
              borderWidth: borderWidth
            }
          ]}
          onPress={() => navigation.navigate("Pickup")}
        >
          <AccessibleText style={styles.largeCardTitle}>
            {t("ride_card_title")}
          </AccessibleText>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.smallCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                borderWidth: borderWidth
              }
            ]}
            onPress={() => navigation.navigate("Helpline")}
          >
            <AccessibleText style={styles.smallCardTitle}>
              {t("helpline_card_title")}
            </AccessibleText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.smallCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                borderWidth: borderWidth
              }
            ]}
            onPress={() => navigation.navigate("DeliveryDetails")}
          >
            <AccessibleText style={styles.smallCardTitle}>
              {t("delivery_card_title")}
            </AccessibleText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { position: "absolute", width: "100%", height: "100%", zIndex: 1 },
  middleContainer: {
    position: "absolute",
    top: "48%",
    width: "100%",
    height: "60%",
    borderRadius: 20,
    zIndex: 10,
  },
  overlayButtons: {
    position: "absolute",
    top: "50%",
    width: "100%",
    paddingHorizontal: 20,
    zIndex: 20,
  },
  largeCard: {
    width: "100%",
    height: 140,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  largeCardTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallCard: {
    width: "48%",
    height: 120,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  smallCardTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
});
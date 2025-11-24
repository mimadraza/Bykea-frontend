import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { WebView } from "react-native-webview";
import html_script from "./html_script";

import TopBar from "../Component/TopBar";
import BackButton from "../Component/BackButton";

import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AccessibleText from "../Component/AccessibleText";
import { useTranslation } from "react-i18next"; // Import this
import { useAccessibility } from "../context/AccessibilityContext";


type NavProp = NativeStackNavigationProp<RootStackParamList>;

const RideInProgressScreen: React.FC = () => {
  const mapRef = useRef<WebView>(null);
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation(); // Get the translate function
  const { colors, borderWidth } = useAccessibility();
  const route = useRoute();
  const { destination } = route.params || {};
  const { driver } = route.params as {
    driver: {
      name: string;
      rating: number;
    };
  };

  return (
    <View style={styles.container}>
      {/* MAP BACKGROUND */}
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
      <TopBar onMenuPress={() => console.log("Menu")} />


      {/* BOTTOM CARD */}
      <View style={styles.bottomCard}>
        {/* Driver Header */}
        <View style={styles.driverRow}>
          <Image
            source={require("../assets/user.png")}
            style={styles.driverImg}
          />

          <View style={{ flex: 1 }}>
            <AccessibleText style={styles.statusText}>{t("status_on_way")}</AccessibleText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AccessibleText style={styles.driverName}>{driver.name}</AccessibleText>
              <AccessibleText style={styles.star}>⭐ {driver.rating}</AccessibleText>
            </View>
          </View>
        </View>

        {/* Share + Contact */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <AccessibleText style={styles.actionIcon}>🔄</AccessibleText>
            <AccessibleText style={styles.actionText}>{t("action_share")}</AccessibleText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <AccessibleText style={styles.actionIcon}>📞</AccessibleText>
            <AccessibleText style={styles.actionText}>{t("action_contact")}</AccessibleText>
          </TouchableOpacity>
        </View>

        {/* Cancel */}
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() =>
            navigation.replace("ChooseRide", {
              destination: destination ?? "",
            })
          }
        >
          <AccessibleText style={styles.cancelText}>{t("cancel_ride_btn")}</AccessibleText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RideInProgressScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  backButtonWrapper: {
    position: "absolute",
    top: 110,
    left: 20,
    zIndex: 30,
  },

  bottomCard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    paddingTop: 30,
    backgroundColor: "#25282B",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 50,
  },

  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2124",
    padding: 14,
    borderRadius: 18,
    marginBottom: 20,
  },

  driverImg: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 14,
  },

  statusText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  driverName: {
    color: "#ddd",
    fontSize: 14,
  },

  star: {
    color: "#FFD700",
    fontWeight: "700",
    marginLeft: 6,
  },

  actionRow: {
    backgroundColor: "#1F2124",
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },

  actionBtn: {
    alignItems: "center",
  },

  actionIcon: {
    fontSize: 28,
    marginBottom: 6,
    color: "white",
  },

  actionText: {
    color: "#ccc",
    fontSize: 13,
  },

  cancelBtn: {
    backgroundColor: "#D62828",
    paddingVertical: 16,
    borderRadius: 12,
  },

  cancelText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
});
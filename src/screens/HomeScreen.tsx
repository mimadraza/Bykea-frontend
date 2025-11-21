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
import { RootStackParamList } from "../navigation/AppNavigator";
import AccessibleText from "../Component/AccessibleText";
type NavProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const mapRef = useRef<WebView>(null);

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

      {/* SIDEBAR */}
      {open && (
        <Sidebar slideAnim={slideAnim} onClose={toggleSidebar} />
      )}

      {/* BOTTOM UI */}
      <View style={styles.middleContainer} />

      <View style={styles.overlayButtons}>
        <TouchableOpacity
          style={styles.largeCard}
          onPress={() => navigation.navigate("Pickup")}
        >
          <AccessibleText style={styles.largeCardTitle}>Ride</AccessibleText>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity style={styles.smallCard}>
            <AccessibleText style={styles.smallCardTitle}>Helpline</AccessibleText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCard}>
            <AccessibleText style={styles.smallCardTitle}>Delivery</AccessibleText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  middleContainer: {
    position: "absolute",
    top: "48%",
    width: "100%",
    height: "60%",
    borderRadius: 20,
    zIndex: 10,
    backgroundColor: "rgba(30,35,45,1)",
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
    backgroundColor: "rgba(68,72,75,0.95)",
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  largeCardTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  smallCard: {
    width: "48%",
    height: 120,
    backgroundColor: "rgba(68,72,75,0.95)",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  smallCardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});

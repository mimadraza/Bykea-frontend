// screens/HomeScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import TopBar from "../Component/TopBar";
import Sidebar from "../Component/Sidebar";
import AccessibleText from "../Component/AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext";
import { RootStackParamList } from "../navigation/AppNavigator";

import LeafletMap, {
  LeafletMapHandle,
  LatLng
} from "../Component/LeafletMap";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const HOME_START: LatLng = {
  lat: 24.934963,
  lng: 67.156854,
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();
  const { colors, borderWidth } = useAccessibility();

  const [open, setOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-260))[0];

  const mapRef = useRef<LeafletMapHandle>(null);

  const toggleSidebar = () => {
    const toValue = open ? -260 : 0;
    setOpen(!open);
    Animated.timing(slideAnim, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  // REMOVE DEFAULT ROUTE — Only set initial camera + pickup marker
  useEffect(() => {
    mapRef.current?.setInitialView(HOME_START, 15);
    mapRef.current?.setOnlyPickup(HOME_START);
  }, []);

  return (
    <View style={styles.container}>
      <LeafletMap
        ref={mapRef}
        style={styles.map}
        onMapPress={(lat, lng) => {
          console.log("Map pressed:", lat, lng);
        }}
      />

      <TopBar onMenuPress={toggleSidebar} />

      {open && <Sidebar slideAnim={slideAnim} onClose={toggleSidebar} />}

      <View
        style={[
          styles.middleContainer,
          { backgroundColor: colors.sheetBackground },
        ]}
      />

      <View style={styles.overlayButtons}>
        <TouchableOpacity
          style={[
            styles.largeCard,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
              borderWidth: borderWidth,
            },
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
                borderWidth: borderWidth,
              },
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
                borderWidth: borderWidth,
              },
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

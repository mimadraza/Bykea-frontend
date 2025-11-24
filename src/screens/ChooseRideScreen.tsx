import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import BackButton from "../Component/BackButton";
import FareCounter from "../Component/FareCounter";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AccessibleText from "../Component/AccessibleText";
import AccessibleTextInput from "../Component/AccessibleTextInput";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext";

import LeafletMap, {
  LeafletMapHandle,
  LatLng
} from "../Component/LeafletMap";

import { geocodeAddress, getRoute } from "../services/openRouteService";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const HOME_START: LatLng = { lat: 24.934963, lng: 67.156854 };

const ChooseRideScreen: React.FC = () => {
  const mapRef = useRef<LeafletMapHandle>(null);
  const navigation = useNavigation<NavProp>();
  const route = useRoute();
  const { t } = useTranslation();
  const { colors, borderWidth } = useAccessibility();

  const { destination } = route.params as { destination: string };

  const [fareCount, setFareCount] = useState({
    Motorbike: 146,
    Car: 512,
    RickShaw: 512
  });

  const [selectedRide, setSelectedRide] = useState("Motorbike");
  const [customVisible, setCustomVisible] = useState(false);
  const [editingRide, setEditingRide] =
    useState<keyof typeof fareCount | null>(null);
  const [tempFare, setTempFare] = useState("");

  // Load the path when this screen opens
  useEffect(() => {
    async function loadRoute() {
      const destCoords = await geocodeAddress(destination);
      if (!destCoords) return;

      const route = await getRoute(HOME_START, destCoords);

      mapRef.current?.setRoute({
        start: HOME_START,
        end: destCoords,
        geometry: route.geometry
      });
    }
    loadRoute();
  }, [destination]);

  const openCustomFare = (rideName: keyof typeof fareCount) => {
    setEditingRide(rideName);
    setTempFare(String(fareCount[rideName]));
    setCustomVisible(true);
  };

  const applyCustomFare = () => {
    if (editingRide) {
      const num = Number(tempFare);
      if (!isNaN(num)) setFareCount({ ...fareCount, [editingRide]: num });
    }
    setCustomVisible(false);
  };

  const rideOptions = [
    { name: "Motorbike", desc: t("motorbike_desc"), icon: "🛵" },
    { name: "Car", desc: t("car_desc"), icon: "🚗" },
    { name: "RickShaw", desc: t("rickshaw_desc"), icon: "🛺" }
  ];

  return (
    <View style={styles.container}>
      {/* MAP */}
      <LeafletMap ref={mapRef} style={styles.map} />

      {/* LOCATION BOX */}
      <View
        style={[
          styles.locationCard,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
            borderWidth
          }
        ]}
      >
        <View style={styles.markerColumn}>
          <View style={[styles.circleOuter, { borderColor: colors.text }]}>
            <View
              style={[styles.circleInner, { backgroundColor: colors.text }]}
            />
          </View>
          <View
            style={[styles.dottedLine, { backgroundColor: colors.textSecondary }]}
          />
          <AccessibleText style={{ fontSize: 20, color: colors.text }}>
            ➤
          </AccessibleText>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={[styles.inputRow, { backgroundColor: colors.inputBackground }]}
          >
            <AccessibleText style={styles.inputAccessibleText}>
              {t("pickup_location")}
            </AccessibleText>
          </View>

          <View
            style={[styles.inputRow, { backgroundColor: colors.inputBackground }]}
          >
            <AccessibleText style={styles.inputAccessibleText}>
              {destination}
            </AccessibleText>
          </View>
        </View>
      </View>

      {/* Back button */}
      <View style={styles.backButtonWrapper}>
        <BackButton onPress={() => navigation.replace("Pickup")} />
      </View>

      {/* RIDE SELECTION SHEET */}
      <View style={[styles.bottomSheet, { backgroundColor: colors.sheetBackground }]}>
        <View style={styles.sheetHandle} />
        <AccessibleText style={styles.sheetTitle}>{t("sheet_title")}</AccessibleText>

        <View style={{ maxHeight: 280 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {rideOptions.map((ride) => (
              <TouchableOpacity
                key={ride.name}
                style={[
                  styles.rideCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor:
                      selectedRide === ride.name ? colors.primary : colors.border,
                    borderWidth: selectedRide === ride.name ? 2 : borderWidth
                  }
                ]}
                onPress={() => setSelectedRide(ride.name)}
              >
                <View style={styles.rideLeft}>
                  <View
                    style={[
                      styles.iconPlaceholder,
                      { backgroundColor: colors.inputBackground }
                    ]}
                  >
                    <AccessibleText style={{ fontSize: 28 }}>
                      {ride.icon}
                    </AccessibleText>
                  </View>
                  <View>
                    <AccessibleText style={styles.rideName}>
                      {t(`${ride.name.toLowerCase()}_name`)}
                    </AccessibleText>
                    <AccessibleText
                      style={[styles.rideDesc, { color: colors.textSecondary }]}
                    >
                      {ride.desc}
                    </AccessibleText>
                  </View>
                </View>

                <FareCounter
                  value={fareCount[ride.name]}
                  onIncrease={() =>
                    setFareCount({
                      ...fareCount,
                      [ride.name]: fareCount[ride.name] + 1
                    })
                  }
                  onDecrease={() =>
                    setFareCount({
                      ...fareCount,
                      [ride.name]: Math.max(0, fareCount[ride.name] - 1)
                    })
                  }
                  onOpenCustom={() =>
                    openCustomFare(ride.name as keyof typeof fareCount)
                  }
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Find Ride Button */}
        <TouchableOpacity
          style={[styles.findRideButton, { backgroundColor: colors.primary }]}
          onPress={() =>
            navigation.navigate("RideRequest", {
              rideType: selectedRide,
              fare: fareCount[selectedRide]
            })
          }
        >
          <AccessibleText style={styles.findRideText}>
            {t("find_ride_btn")}
          </AccessibleText>
        </TouchableOpacity>
      </View>

      {/* CUSTOM FARE POPUP */}
      {customVisible && (
        <View style={styles.popupOverlay}>
          <View
            style={[
              styles.popupBox,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                borderWidth
              }
            ]}
          >
            <AccessibleText style={styles.popupTitle}>
              {t("enter_fare_popup_title")}
            </AccessibleText>

            <View
              style={[styles.popupInputBox, { backgroundColor: colors.inputBackground }]}
            >
              <AccessibleTextInput
                style={[styles.popupInput, { color: colors.text }]}
                value={tempFare}
                onChangeText={setTempFare}
                keyboardType="numeric"
                placeholder={t("enter_amount_placeholder")}
              />
            </View>

            <View style={styles.popupButtons}>
              <TouchableOpacity
                onPress={() => setCustomVisible(false)}
                style={styles.cancelButton}
              >
                <AccessibleText
                  style={[styles.cancelText, { color: colors.textSecondary }]}
                >
                  {t("cancel_btn")}
                </AccessibleText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={applyCustomFare}
                style={[styles.okButton, { backgroundColor: colors.primary }]}
              >
                <AccessibleText style={styles.okText}>{t("ok_btn")}</AccessibleText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ChooseRideScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { position: "absolute", width: "100%", height: "100%", zIndex: 1 },
  backButtonWrapper: { position: "absolute", top: 160, left: 20, zIndex: 30 },
  locationCard: {
    position: "absolute",
    top: 10,
    left: 15,
    right: 15,
    padding: 18,
    borderRadius: 22,
    flexDirection: "row",
    zIndex: 40
  },
  markerColumn: { alignItems: "center", marginRight: 14 },
  circleOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  circleInner: { width: 8, height: 8, borderRadius: 4 },
  dottedLine: { width: 2, height: 50, marginVertical: 6 },
  inputRow: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  inputAccessibleText: { fontSize: 15, flex: 1 },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    zIndex: 50,
    paddingBottom: 30,
    maxHeight: "68%"
  },
  sheetHandle: {
    width: 60,
    height: 5,
    backgroundColor: "#555",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15
  },
  sheetTitle: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
  rideCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    justifyContent: "space-between",
    marginBottom: 14
  },
  rideLeft: { flexDirection: "row", alignItems: "center" },
  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  rideName: { fontSize: 17, fontWeight: "700" },
  rideDesc: { fontSize: 13 },
  findRideButton: {
    paddingVertical: 18,
    borderRadius: 14,
    marginTop: 10
  },
  findRideText: {
    color: "#1A1A1A",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center"
  },
  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 500
  },
  popupBox: {
    width: "75%",
    borderRadius: 16,
    padding: 20,
    alignItems: "center"
  },
  popupTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  popupInputBox: {
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20
  },
  popupInput: { fontSize: 16, paddingVertical: 6 },
  popupButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8
  },
  cancelButton: { paddingHorizontal: 12, paddingVertical: 6, marginRight: 10 },
  cancelText: { fontSize: 16 },
  okButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10
  },
  okText: { color: "#1A1A1A", fontWeight: "700", fontSize: 16 }
});

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  BackHandler,
} from "react-native";

import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AccessibleText from "../Component/AccessibleText";
import AccessibleTextInput from "../Component/AccessibleTextInput";
import FareCounter from "../Component/FareCounter";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAccessibility } from "../context/AccessibilityContext";

import LeafletMap, {
  LeafletMapHandle,
  LatLng,
} from "../Component/LeafletMap";

import { geocodeAddress, getRoute } from "../services/openRouteService";
import { useTranslation } from "react-i18next";

import DraggableBottomSheet from "../Component/DraggableBottomSheet";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const HOME_START: LatLng = { lat: 24.934963, lng: 67.156854 };

const rideNameKeyMap: Record<"Motorbike" | "Rickshaw" | "Car", string> = {
  Motorbike: "motorbike_name",
  Rickshaw: "rickshaw_name",
  Car: "car_name",
};

const ChooseRideScreen: React.FC = () => {
  const mapRef = useRef<LeafletMapHandle>(null);
  const navigation = useNavigation<NavProp>();
  const route = useRoute();
  const { colors, borderWidth, highContrast } = useAccessibility();
  const { t } = useTranslation();

  const { destination } = route.params as { destination: string };
  const [pickup, setPickup] = useState("Jauhar Block 7");
  const [editableDestination, setEditableDestination] = useState(destination);

  const [fareCount, setFareCount] = useState({
    Motorbike: 120,
    Rickshaw: 250,
    Car: 400,
  });

  const [selectedRide, setSelectedRide] =
    useState<"Motorbike" | "Rickshaw" | "Car">("Motorbike");

  const [customVisible, setCustomVisible] = useState(false);
  const [editingRide, setEditingRide] =
    useState<keyof typeof fareCount | null>(null);
  const [tempFare, setTempFare] = useState("");

  const [destCoords, setDestCoords] = useState<LatLng | null>(null);
  const [routeGeometry, setRouteGeometry] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Home");
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [navigation])
  );

  useEffect(() => {
    async function loadRoute() {
      if (!editableDestination.trim()) return;

      const coords = await geocodeAddress(editableDestination);
      if (!coords) return;

      setDestCoords(coords);

      const route = await getRoute(HOME_START, coords);
      setRouteGeometry(route.geometry);

      mapRef.current?.setRoute({
        start: HOME_START,
        end: coords,
        geometry: route.geometry,
      });
    }

    loadRoute();
  }, [editableDestination]);

  const openCustomFare = (rideName: keyof typeof fareCount) => {
    setEditingRide(rideName);
    setTempFare(String(fareCount[rideName]));
    setCustomVisible(true);
  };

  const applyCustomFare = () => {
    if (editingRide) {
      const num = Number(tempFare);
      if (!isNaN(num))
        setFareCount({
          ...fareCount,
          [editingRide]: num,
        });
    }
    setCustomVisible(false);
  };

  const adjustFare = (ride: keyof typeof fareCount, delta: number) => {
    setFareCount((prev) => ({
      ...prev,
      [ride]: Math.max(0, prev[ride] + delta),
    }));
  };

  const rideOptions = [
    { name: "Motorbike" as const, icon: "🏍️", time: "4 min", people: "1" },
    { name: "Rickshaw" as const, icon: "🛺", time: "6 min", people: "3" },
    { name: "Car" as const, icon: "🚗", time: "8 min", people: "4" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LeafletMap ref={mapRef} style={styles.map} />

      {/* LOCATION BOX */}
      <View
        style={[
          styles.locationCard,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
            borderWidth: highContrast ? borderWidth : 0,
          },
        ]}
      >
        <View style={styles.markerColumn}>
          <View
            style={[
              styles.pickupDotOuter,
              { borderColor: colors.primary },
            ]}
          >
            <View
              style={[
                styles.pickupDotInner,
                { backgroundColor: colors.primary },
              ]}
            />
          </View>

          <View
            style={[
              styles.verticalLine,
              { backgroundColor: colors.border },
            ]}
          />

          <View
            style={[
              styles.dropoffCircle,
              { borderColor: colors.primary },
            ]}
          >
            <AccessibleText style={{ color: colors.primary }}>
              📍
            </AccessibleText>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          {/* PICKUP (EDITABLE & STABLE) */}
          <View
            style={[
              styles.inputRow,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <AccessibleTextInput
              value={pickup}
              onChangeText={setPickup}
              placeholder="Pickup location"
              placeholderTextColor={colors.textSecondary}
              style={[styles.locationText, { color: colors.text }]}
            />
          </View>

          {/* DESTINATION (EDITABLE & STABLE) */}
          <View
            style={[
              styles.inputRow,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <AccessibleTextInput
              value={editableDestination}
              onChangeText={setEditableDestination}
              placeholder="Destination"
              placeholderTextColor={colors.textSecondary}
              style={[styles.locationText, { color: colors.text }]}
            />
          </View>
        </View>
      </View>

      {/* DRAGGABLE BOTTOM SHEET */}
      <DraggableBottomSheet
        snapPoints={[0, 250, 480]}
        initialSnapIndex={0}
        style={[
          styles.bottomSheet,
          {
            backgroundColor: colors.sheetBackground,
            borderColor: colors.border,
            borderTopWidth: highContrast ? borderWidth : 0,
          },
        ]}
      >
        <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />

        <AccessibleText
          style={[styles.sheetTitle, { color: colors.text }]}
        >
          {t("sheet_title")}
        </AccessibleText>

        <ScrollView style={{ maxHeight: 330 }}>
          {rideOptions.map((ride) => {
            const selected = selectedRide === ride.name;
            return (
              <TouchableOpacity
                key={ride.name}
                onPress={() => setSelectedRide(ride.name)}
                style={[
                  styles.rideCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: selected ? colors.primary : colors.border,
                    borderWidth: selected
                      ? highContrast
                        ? borderWidth
                        : 2
                      : highContrast
                      ? borderWidth
                      : 1,
                  },
                ]}
              >
                <View style={styles.rideLeft}>
                  <View
                    style={[
                      styles.rideIconBox,
                      { backgroundColor: colors.surface },
                    ]}
                  >
                    <AccessibleText style={{ fontSize: 32 }}>
                      {ride.icon}
                    </AccessibleText>
                  </View>

                  <View>
                    <AccessibleText
                      style={[styles.rideName, { color: colors.text }]}
                    >
                      {t(rideNameKeyMap[ride.name])}
                    </AccessibleText>

                    <AccessibleText
                      style={[
                        styles.rideInfoText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {ride.time} • {ride.people}
                    </AccessibleText>
                  </View>
                </View>

                {/* fare controls */}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                  {/* MINUS */}
                  <TouchableOpacity onPress={() => adjustFare(ride.name, -5)}>
                    <AccessibleText
                      style={{
                        fontSize: 28,
                        fontWeight: "700",
                        color: colors.primary,
                      }}
                    >
                      −
                    </AccessibleText>
                  </TouchableOpacity>

                  {/* FARE (CLICKABLE FOR POPUP) */}
                  <TouchableOpacity onPress={() => openCustomFare(ride.name)}>
                    <AccessibleText
                      style={[styles.ridePrice, { color: colors.text }]}
                    >
                      Rs. {fareCount[ride.name]}
                    </AccessibleText>
                  </TouchableOpacity>

                  {/* PLUS */}
                  <TouchableOpacity onPress={() => adjustFare(ride.name, 5)}>
                    <AccessibleText
                      style={{
                        fontSize: 28,
                        fontWeight: "700",
                        color: colors.primary,
                      }}
                    >
                      +
                    </AccessibleText>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            { backgroundColor: colors.primary },
          ]}
          onPress={() => {
            if (!destCoords || routeGeometry.length === 0) return;
            navigation.navigate("RideRequest", {
              rideType: selectedRide,
              fare: fareCount[selectedRide],
              start: HOME_START,
              end: destCoords,
              geometry: routeGeometry,
              destination,
            });
          }}
        >
          <AccessibleText style={styles.confirmButtonText}>
            {t("find_ride_btn")}
          </AccessibleText>
        </TouchableOpacity>
      </DraggableBottomSheet>

      {/* FARE POPUP */}
      {customVisible && (
        <View style={styles.popupOverlay}>
          <View
            style={[
              styles.popupBox,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.primary,
              },
            ]}
          >
            <AccessibleText
              style={[
                styles.popupTitle,
                { color: colors.text },
              ]}
            >
              {t("enter_fare_popup_title")}
            </AccessibleText>

            <View
              style={[
                styles.popupInputBox,
                { backgroundColor: colors.inputBackground },
              ]}
            >
              <AccessibleTextInput
                value={tempFare}
                onChangeText={setTempFare}
                keyboardType="numeric"
                placeholder={t("enter_amount_placeholder")}
                placeholderTextColor={colors.textSecondary}
                style={[styles.popupInput, { color: colors.text }]}
              />
            </View>

            <View style={styles.popupButtons}>
              {/* CANCEL */}
              <TouchableOpacity
                onPress={() => setCustomVisible(false)}
                style={[
                  styles.popupButtonBase,
                  {
                    borderColor: colors.border,
                    backgroundColor: "transparent",
                  },
                ]}
              >
                <AccessibleText
                  style={{ color: colors.textSecondary, fontWeight: "700" }}
                >
                  {t("cancel_btn")}
                </AccessibleText>
              </TouchableOpacity>

              {/* OK */}
              <TouchableOpacity
                onPress={applyCustomFare}
                style={[
                  styles.popupButtonBase,
                  {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                  },
                ]}
              >
                <AccessibleText
                  style={{ color: colors.background, fontWeight: "700" }}
                >
                  {t("ok_btn")}
                </AccessibleText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ChooseRideScreen;

/* STYLES */
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { position: "absolute", width: "100%", height: "100%" },

  locationCard: {
    position: "absolute",
    top: 10,
    left: 15,
    right: 15,
    padding: 18,
    borderRadius: 22,
    flexDirection: "row",
    zIndex: 50,
  },

  markerColumn: { alignItems: "center", marginRight: 14 },

  pickupDotOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  pickupDotInner: { width: 8, height: 8, borderRadius: 4 },

  verticalLine: { width: 2, height: 50, marginVertical: 6 },

  dropoffCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  inputRow: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  locationText: { fontSize: 15 },

  bottomSheet: {
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: "70%",
  },

  sheetHandle: {
    width: 50,
    height: 5,
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },

  sheetTitle: { fontSize: 22, fontWeight: "700", marginBottom: 15 },

  rideCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
  },

  rideLeft: { flexDirection: "row", alignItems: "center" },

  rideIconBox: {
    width: 55,
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  rideName: { fontSize: 17, fontWeight: "700" },
  rideInfoText: { fontSize: 13, marginTop: 3 },
  ridePrice: { fontSize: 16, fontWeight: "700", textAlign: "right" },

  optionsText: { marginTop: 4, fontSize: 18 },

  confirmButton: { marginTop: 10, paddingVertical: 18, borderRadius: 12 },
  confirmButtonText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 17,
    color: "black",
  },

  /* POPUP STYLES – HIGH CONTRAST */
  popupOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  popupBox: {
    width: "80%",
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#1F2430", // solid dark card
    borderWidth: 2,
    borderColor: "#00D26A",
  },

  popupTitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
  },

  popupInputBox: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#2B3240",
  },

  popupInput: {
    fontSize: 16,
    color: "#FFFFFF",
  },

  popupButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  popupButtonBase: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 1,
  },

  popupCancelButton: {
    borderColor: "#B0B3C0",
    backgroundColor: "transparent",
  },

  popupOKButton: {
    borderColor: "#00D26A",
    backgroundColor: "#00D26A",
  },

  popupCancel: {
    fontSize: 16,
    color: "#B0B3C0",
    fontWeight: "600",
  },

  popupOK: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "700",
  },
});
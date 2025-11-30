import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  BackHandler,
} from "react-native";

import { useFocusEffect, useRoute, useNavigation } from "@react-navigation/native";
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

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const HOME_START: LatLng = { lat: 24.934963, lng: 67.156854 };

const ChooseRideScreen: React.FC = () => {
  const mapRef = useRef<LeafletMapHandle>(null);
  const navigation = useNavigation<NavProp>();
  const route = useRoute();
  const { colors } = useAccessibility();

  const { destination } = route.params as { destination: string };

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

  /* ----------------------------------------------------------
     FIX ANDROID BACK BUTTON BEHAVIOR (IMPORTANT)
  -----------------------------------------------------------*/
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


  /* ----------------------------------------------------------
     LOAD AND DRAW ROUTE
  -----------------------------------------------------------*/
  useEffect(() => {
    async function loadRoute() {
      const coords = await geocodeAddress(destination);
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
  }, [destination]);

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

  const rideOptions = [
    {
      name: "Motorbike" as const,
      icon: "🏍️",
      time: "4 min",
      people: "1",
    },
    {
      name: "Rickshaw" as const,
      icon: "🛺",
      time: "6 min",
      people: "3",
    },
    {
      name: "Car" as const,
      icon: "🚗",
      time: "8 min",
      people: "4",
    },
  ];

  return (
    <View style={styles.container}>
      <LeafletMap ref={mapRef} style={styles.map} />

      {/* LOCATION BOX */}
      <View style={styles.locationCard}>
        <View style={styles.markerColumn}>
          <View style={styles.pickupDotOuter}>
            <View style={styles.pickupDotInner} />
          </View>

          <View style={styles.verticalLine} />

          <View style={styles.dropoffCircle}>
            <AccessibleText style={{ color: "#0df259" }}>📍</AccessibleText>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.inputRow}>
            <AccessibleText style={styles.locationText}>
              Jauhar Block 7
            </AccessibleText>
          </View>

          <View style={styles.inputRow}>
            <AccessibleText style={styles.locationText}>
              {destination}
            </AccessibleText>
          </View>
        </View>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />

        <AccessibleText style={styles.sheetTitle}>Ride</AccessibleText>

        <ScrollView style={{ maxHeight: 330 }}>
          {rideOptions.map((ride) => {
            const selected = selectedRide === ride.name;
            return (
              <TouchableOpacity
                key={ride.name}
                onPress={() => setSelectedRide(ride.name)}
                style={[
                  styles.rideCard,
                  selected && { borderColor: "#00FF66", borderWidth: 2 },
                ]}
              >
                <View style={styles.rideLeft}>
                  <View style={styles.rideIconBox}>
                    <AccessibleText style={{ fontSize: 32 }}>
                      {ride.icon}
                    </AccessibleText>
                  </View>

                  <View>
                    <AccessibleText style={styles.rideName}>
                      {ride.name}
                    </AccessibleText>

                    <AccessibleText style={styles.rideInfoText}>
                      {ride.time} • {ride.people}
                    </AccessibleText>
                  </View>
                </View>

                <View>
                  <AccessibleText style={styles.ridePrice}>
                    Rs. {fareCount[ride.name]}
                  </AccessibleText>

                  <TouchableOpacity onPress={() => openCustomFare(ride.name)}>
                    <AccessibleText style={styles.optionsText}>
                      Options
                    </AccessibleText>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            if (!destCoords || routeGeometry.length === 0) return;
            navigation.navigate("RideRequest", {
              rideType: selectedRide,
              fare: fareCount[selectedRide],
              start: HOME_START,
              end: destCoords,
              geometry: routeGeometry,
            });
          }}
        >
          <AccessibleText style={styles.confirmButtonText}>
            Confirm {selectedRide}
          </AccessibleText>
        </TouchableOpacity>
      </View>

      {/* Custom Fare Popup */}
      {customVisible && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <AccessibleText style={styles.popupTitle}>
              Enter Custom Fare
            </AccessibleText>

            <View style={styles.popupInputBox}>
              <AccessibleTextInput
                value={tempFare}
                onChangeText={setTempFare}
                keyboardType="numeric"
                style={styles.popupInput}
              />
            </View>

            <View style={styles.popupButtons}>
              <TouchableOpacity onPress={() => setCustomVisible(false)}>
                <AccessibleText style={styles.popupCancel}>Cancel</AccessibleText>
              </TouchableOpacity>

              <TouchableOpacity onPress={applyCustomFare}>
                <AccessibleText style={styles.popupOK}>OK</AccessibleText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ChooseRideScreen;


/* ======================
   STYLES — MATCH UI EXACTLY
======================== */
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
    backgroundColor: "#1B212B",
    zIndex: 50,
  },

  markerColumn: {
    alignItems: "center",
    marginRight: 14,
  },

  pickupDotOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#00FF66",
    justifyContent: "center",
    alignItems: "center",
  },
  pickupDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00FF66",
  },

  verticalLine: {
    width: 2,
    height: 50,
    backgroundColor: "#32523E",
    marginVertical: 6,
  },

  dropoffCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#00FF66",
    justifyContent: "center",
    alignItems: "center",
  },

  inputRow: {
    backgroundColor: "#2E3340",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  locationText: { color: "white", fontSize: 15 },

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#1B212B",
    maxHeight: "70%",
  },

  sheetHandle: {
    width: 50,
    height: 5,
    backgroundColor: "#345",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },

  sheetTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },

  rideCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#13251A",
    borderWidth: 1,
    borderColor: "#222",
    marginBottom: 12,
    alignItems: "center",
  },

  rideLeft: { flexDirection: "row", alignItems: "center" },

  rideIconBox: {
    width: 55,
    height: 55,
    borderRadius: 10,
    backgroundColor: "#213427",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  rideName: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },

  rideInfoText: {
    color: "#91A596",
    fontSize: 13,
    marginTop: 3,
  },

  ridePrice: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "right",
  },

  optionsText: {
    color: "#00FF66",
    marginTop: 4,
    fontSize: 13,
  },

  confirmButton: {
    marginTop: 10,
    backgroundColor: "#00FF66",
    paddingVertical: 18,
    borderRadius: 12,
  },

  confirmButtonText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 17,
    color: "black",
  },

  popupOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  popupBox: {
    width: "75%",
    padding: 20,
    backgroundColor: "#1A1A1A",
    borderRadius: 15,
  },

  popupTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },

  popupInputBox: {
    backgroundColor: "#2A2A2A",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  popupInput: { color: "white", fontSize: 16 },

  popupButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  popupCancel: { color: "#AAA", fontSize: 16 },
  popupOK: { color: "#00FF66", fontSize: 16 },
});

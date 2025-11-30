import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import AccessibleText from "../Component/AccessibleText";
import AccessibleTextInput from "../Component/AccessibleTextInput";
import { useAccessibility } from "../context/AccessibilityContext";

import LeafletMap, {
  LeafletMapHandle,
  LatLng,
} from "../Component/LeafletMap";
import { geocodeAddress, getRoute } from "../services/openRouteService";

const ParcelDetailsScreen = ({ navigation, route }) => {
  const { colors, borderWidth } = useAccessibility();

  // Receive from HomeScreen (or from back navigation)
  const initialPickup = route?.params?.pickup || "";
  const initialDropoff = route?.params?.dropoff || "";
  const initialItemDescription = route?.params?.itemDescription || "";
  const initialWeight = route?.params?.weight || "";
  const initialEstimatedValue = route?.params?.estimatedValue || "";

  // Local editable state
  const [pickup, setPickup] = useState(initialPickup);
  const [dropoff, setDropoff] = useState(initialDropoff);
  const [itemDescription, setItemDescription] =
    useState(initialItemDescription);
  const [weight, setWeight] = useState(initialWeight);
  const [estimatedValue, setEstimatedValue] =
    useState(initialEstimatedValue);

  // MAP ROUTE STATE
  const mapRef = useRef<LeafletMapHandle>(null);
  const [startCoords, setStartCoords] = useState<LatLng | null>(null);
  const [endCoords, setEndCoords] = useState<LatLng | null>(null);
  const [routeGeometry, setRouteGeometry] = useState<any[]>([]);

  // Draw initial route if we already have pickup/dropoff
  useEffect(() => {
    async function loadInitialRoute() {
      if (!pickup || !dropoff) return;

      const from = await geocodeAddress(pickup);
      const to = await geocodeAddress(dropoff);
      if (!from || !to) return;

      setStartCoords(from);
      setEndCoords(to);

      const route = await getRoute(from, to);
      setRouteGeometry(route.geometry);

      mapRef.current?.setRoute({
        start: from,
        end: to,
        geometry: route.geometry,
      });
    }

    loadInitialRoute();
  }, []);

  // Confirm & go to SearchingRider WITH route for animation
  const handleConfirm = async () => {
    if (!pickup || !dropoff) return;

    let start = startCoords;
    let end = endCoords;
    let geometry = routeGeometry;

    // If we don't yet have geometry, calculate now
    if (!start || !end || !geometry.length) {
      const from = await geocodeAddress(pickup);
      const to = await geocodeAddress(dropoff);
      if (!from || !to) return;

      const route = await getRoute(from, to);
      start = from;
      end = to;
      geometry = route.geometry;

      setStartCoords(from);
      setEndCoords(to);
      setRouteGeometry(route.geometry);
    }

    navigation.navigate("SearchingRider", {
      pickup,
      dropoff,
      start,
      end,
      geometry,
      itemDescription,
      weight,
      estimatedValue,
    });
  };

  return (
    <View style={styles.container}>
      {/* MAP */}
      <LeafletMap ref={mapRef} style={styles.map} />

      {/* Bottom Sheet */}
      <View
        style={[
          styles.sheet,
          { backgroundColor: colors.sheetBackground },
        ]}
      >
        <View style={styles.handleWrapper}>
          <View className="styles.handle" />
          <View style={styles.handle} />
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <AccessibleText style={styles.title}>Delivery Details</AccessibleText>

          {/* PICKUP CARD */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: borderWidth,
              },
            ]}
          >
            <AccessibleText style={styles.label}>
              PICK-UP LOCATION
            </AccessibleText>

            <View style={styles.row}>
              <AccessibleText style={styles.icon}>🟢</AccessibleText>
              <AccessibleTextInput
                value={pickup}
                onChangeText={setPickup}
                placeholder="Pickup location"
                style={styles.input}
              />
            </View>
          </View>

          {/* DROPOFF CARD */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: borderWidth,
              },
            ]}
          >
            <AccessibleText style={styles.label}>
              RECIPIENT’S LOCATION
            </AccessibleText>

            <View style={styles.row}>
              <AccessibleText style={styles.icon}>📍</AccessibleText>
              <AccessibleTextInput
                value={dropoff}
                onChangeText={setDropoff}
                placeholder="Drop-off location"
                style={styles.input}
              />
            </View>
          </View>

          {/* PARCEL DETAILS */}
          <AccessibleText style={styles.sectionTitle}>
            Parcel Details
          </AccessibleText>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: borderWidth,
              },
            ]}
          >
            <AccessibleTextInput
              placeholder="Item Description (e.g., Documents)"
              value={itemDescription}
              onChangeText={setItemDescription}
              style={styles.field}
            />

            <View style={styles.rowBetween}>
              <AccessibleTextInput
                placeholder="Weight (kg)"
                value={weight}
                onChangeText={setWeight}
                style={styles.fieldHalf}
              />
              <AccessibleTextInput
                placeholder="Estimated Value"
                value={estimatedValue}
                onChangeText={setEstimatedValue}
                style={styles.fieldHalf}
              />
            </View>
          </View>

          {/* SERVICE OPTION */}
          <View
            style={[
              styles.serviceCard,
              {
                borderColor: colors.primary,
                backgroundColor: colors.surface,
                borderWidth: borderWidth + 1,
              },
            ]}
          >
            <AccessibleText style={styles.serviceEmoji}>🏍️</AccessibleText>

            <View style={{ flex: 1 }}>
              <AccessibleText style={styles.serviceTitle}>
                Bykea Delivery
              </AccessibleText>
              <AccessibleText style={styles.serviceSubtitle}>
                Documents & Parcels
              </AccessibleText>
            </View>

            <AccessibleText
              style={[styles.servicePrice, { color: colors.primary }]}
            >
              Rs. 90
            </AccessibleText>
          </View>

          {/* CONFIRM BUTTON */}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={handleConfirm}
          >
            <AccessibleText style={styles.confirmText}>
              Confirm Delivery
            </AccessibleText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ParcelDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { position: "absolute", width: "100%", height: "100%", zIndex: 1 },

  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },

  handleWrapper: { alignItems: "center", marginBottom: 8 },
  handle: {
    width: 50,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#666",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    marginBottom: 10,
  },
  label: {
    color: "#B0B0B0",
    marginBottom: 4,
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "spaceBetween",
  },
  input: {
    flex: 1,
    color: "white",
    borderRadius: 5,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
    color: "white",
  },

  card: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    marginBottom: 10,
  },

  field: {
    marginBottom: 12,
    color: "white",
    borderRadius: 5,
  },
  fieldHalf: {
    width: "48%",
    color: "white",
    borderRadius: 5,
  },

  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 25,
  },

  serviceEmoji: {
    fontSize: 45,
    marginRight: 14,
  },

  serviceTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  serviceSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: "700",
  },

  confirmButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
  },
  confirmText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
});

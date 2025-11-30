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
import { useTranslation } from "react-i18next";

const ParcelDetailsScreen = ({ navigation, route }) => {
  const { colors, borderWidth } = useAccessibility();
  const { t } = useTranslation();

  const initialPickup = route?.params?.pickup || "";
  const initialDropoff = route?.params?.dropoff || "";
  const initialItemDescription = route?.params?.itemDescription || "";
  const initialWeight = route?.params?.weight || "";
  const initialEstimatedValue = route?.params?.estimatedValue || "";

  const [pickup, setPickup] = useState(initialPickup);
  const [dropoff, setDropoff] = useState(initialDropoff);
  const [itemDescription, setItemDescription] = useState(initialItemDescription);
  const [weight, setWeight] = useState(initialWeight);
  const [estimatedValue, setEstimatedValue] = useState(initialEstimatedValue);

  const mapRef = useRef<LeafletMapHandle>(null);
  const [startCoords, setStartCoords] = useState<LatLng | null>(null);
  const [endCoords, setEndCoords] = useState<LatLng | null>(null);
  const [routeGeometry, setRouteGeometry] = useState<any[]>([]);

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

  const handleConfirm = async () => {
    if (!pickup || !dropoff) return;

    let start = startCoords;
    let end = endCoords;
    let geometry = routeGeometry;

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
      <LeafletMap ref={mapRef} style={styles.map} />

      <View
        style={[
          styles.sheet,
          { backgroundColor: colors.sheetBackground },
        ]}
      >
        <View style={styles.handleWrapper}>
          <View style={[styles.handle, { backgroundColor: colors.border }]} />
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <AccessibleText style={[styles.title, { color: colors.text }]}>
            {t("parcel_title")}
          </AccessibleText>

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
            <AccessibleText style={[styles.label, { color: colors.textSecondary }]}>
              {t("parcel_pickup_label")}
            </AccessibleText>

            <View style={styles.row}>
              <AccessibleText style={[styles.icon, { color: colors.icon }]}>🟢</AccessibleText>
              <AccessibleTextInput
                value={pickup}
                onChangeText={setPickup}
                placeholder={t("parcel_pickup_placeholder")}
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>

          {/* DROPOFF */}
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
            <AccessibleText style={[styles.label, { color: colors.textSecondary }]}>
              {t("parcel_dropoff_label")}
            </AccessibleText>

            <View style={styles.row}>
              <AccessibleText style={[styles.icon, { color: colors.icon }]}>📍</AccessibleText>
              <AccessibleTextInput
                value={dropoff}
                onChangeText={setDropoff}
                placeholder={t("parcel_dropoff_placeholder")}
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>

          {/* PARCEL DETAILS */}
          <AccessibleText style={[styles.sectionTitle, { color: colors.text }]}>
            {t("parcel_details_title")}
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
              placeholder={t("parcel_item_placeholder")}
              value={itemDescription}
              onChangeText={setItemDescription}
              style={[styles.field, { color: colors.text }]}
            />

            <View style={styles.rowBetween}>
              <AccessibleTextInput
                placeholder={t("parcel_weight_placeholder")}
                value={weight}
                onChangeText={setWeight}
                style={[styles.fieldHalf, { color: colors.text }]}
              />

              <AccessibleTextInput
                placeholder={t("parcel_value_placeholder")}
                value={estimatedValue}
                onChangeText={setEstimatedValue}
                style={[styles.fieldHalf, { color: colors.text }]}
              />
            </View>
          </View>

          {/* SERVICE CARD */}
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
            <AccessibleText style={[styles.serviceEmoji, { color: colors.text }]}>🏍️</AccessibleText>

            <View style={{ flex: 1 }}>
              <AccessibleText style={[styles.serviceTitle, { color: colors.text }]}>
                {t("parcel_service_title")}
              </AccessibleText>
              <AccessibleText style={[styles.serviceSubtitle, { color: colors.textSecondary }]}>
                {t("parcel_service_subtitle")}
              </AccessibleText>
            </View>

            <AccessibleText
              style={[styles.servicePrice, { color: colors.primary }]}
            >
              Rs. 90
            </AccessibleText>
          </View>

          {/* CONFIRM */}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={handleConfirm}
          >
            <AccessibleText style={[styles.confirmText, { color: colors.text }]}>
              {t("parcel_confirm_btn")}
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
  handle: { width: 50, height: 5, borderRadius: 3 },

  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },

  label: { marginBottom: 4, fontSize: 13 },

  row: { flexDirection: "row", alignItems: "center" },

  rowBetween: { flexDirection: "row", justifyContent: "space-between" },

  input: { flex: 1, borderRadius: 5 },

  icon: { fontSize: 20, marginRight: 8 },

  card: { padding: 14, borderRadius: 12, marginBottom: 20 },

  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10 },

  field: { marginBottom: 12, borderRadius: 5 },

  fieldHalf: { width: "48%", borderRadius: 5 },

  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 25,
  },

  serviceEmoji: { fontSize: 45, marginRight: 14 },

  serviceTitle: { fontSize: 16, fontWeight: "700" },

  serviceSubtitle: { fontSize: 14 },

  servicePrice: { fontSize: 18, fontWeight: "700" },

  confirmButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
  },

  confirmText: { fontSize: 16, fontWeight: "700" },
});

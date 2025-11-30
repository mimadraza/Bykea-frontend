import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import AccessibleText from "../Component/AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext";
import { useTranslation } from "react-i18next";

import LeafletMap, {
  LeafletMapHandle,
  LatLng,
} from "../Component/LeafletMap";

import { geocodeAddress, getRoute } from "../services/openRouteService";
import DriverOfferCard, { DriverOffer } from "../Component/DriverOfferCard";

const SearchingRiderScreen = ({ navigation, route }) => {
  const { colors, highContrast, borderWidth, isUrdu } = useAccessibility();
  const { t } = useTranslation();
  const mapRef = useRef<LeafletMapHandle>(null);

  const {
    pickup,
    dropoff,
    start: routeStart,
    end: routeEnd,
    geometry: initialGeometry,
    itemDescription,
    weight,
    estimatedValue,
  } = route.params || {};

  // ---------------- DRIVER OFFERS ----------------
  const initialOffers: DriverOffer[] = [
    { id: "1", name: "Asif Gul", eta: t("driver_offer_eta_format", { eta: 5 }), rating: 4.95, price: 90 },
    { id: "2", name: "Fahad Khan", eta: t("driver_offer_eta_format", { eta: 3 }), rating: 4.88, price: 90 },
    { id: "3", name: "Umair Ali", eta: t("driver_offer_eta_format", { eta: 7 }), rating: 4.99, price: 90 },
  ];

  const incomingFeed: DriverOffer[] = [
    { id: "4", name: "Rehan Ahmed", eta: t("driver_offer_eta_format", { eta: 4 }), rating: 4.82, price: 90 },
    { id: "5", name: "Talha Javed", eta: t("driver_offer_eta_format", { eta: 6 }), rating: 4.90, price: 90 },
    { id: "6", name: "Moiz Khan", eta: t("driver_offer_eta_format", { eta: 8 }), rating: 4.78, price: 90 },
  ];

  const [offers, setOffers] = useState<DriverOffer[]>(initialOffers);
  const [incoming, setIncoming] = useState<DriverOffer[]>(incomingFeed);
  const [current, setCurrent] = useState<DriverOffer | null>(initialOffers[0]);

  const [startCoords, setStartCoords] = useState<LatLng | null>(routeStart);
  const [endCoords, setEndCoords] = useState<LatLng | null>(routeEnd);
  const [routeGeometry, setRouteGeometry] = useState<any[]>(initialGeometry || []);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeSwap = (cb: () => void) => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true })
      .start(() => {
        cb();
        Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }).start();
      });
  };

  const rejectRide = () => {
    fadeSwap(() => {
      if (offers.length <= 1) {
        setOffers([]);
        setCurrent(null);
        return;
      }
      const newList = offers.slice(1);
      setOffers(newList);
      setCurrent(newList[0]);
    });
  };

  useEffect(() => {
    if (!current) return;
    const timer = setInterval(rejectRide, 8000);
    return () => clearInterval(timer);
  }, [current, offers]);

  useEffect(() => {
    if (incoming.length === 0) return;
    const timer = setInterval(() => {
      const next = incoming[0];
      setIncoming(prev => prev.slice(1));
      setOffers(prev => [...prev, next]);
      if (!current) setCurrent(next);
    }, 5000);
    return () => clearInterval(timer);
  }, [incoming, current]);

  // ---------------- ROUTE DRAWING ----------------
  useEffect(() => {
    async function loadRoute() {
      let s = startCoords;
      let e = endCoords;

      if (!s && pickup) s = await geocodeAddress(pickup);
      if (!e && dropoff) e = await geocodeAddress(dropoff);
      if (!s || !e) return;

      let geom = routeGeometry;
      if (!geom.length) {
        const route = await getRoute(s, e);
        geom = route.geometry;
      }

      setStartCoords(s);
      setEndCoords(e);
      setRouteGeometry(geom);

      mapRef.current?.setRoute({ start: s, end: e, geometry: geom });
    }

    loadRoute();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LeafletMap ref={mapRef} style={styles.map} />

      {/* TOP LABEL */}
      <View style={styles.header}>
        <AccessibleText
          style={[
            styles.headerText,
            { color: colors.text, backgroundColor: highContrast ? colors.surface : "rgba(0,0,0,0.45)" },
          ]}
        >
          {t("finding_rider")}
        </AccessibleText>
      </View>

      {/* OFFER CARD AREA */}
      {current && (
        <Animated.View style={[styles.cardWrap, { opacity: fadeAnim }]}>
          <DriverOfferCard
            offer={current}
            onAccept={() => {
              if (!startCoords || !endCoords || !routeGeometry.length) return;

              navigation.navigate("RideInProgress", {
                driver: current,
                from: "ParcelDetails",
                start: startCoords,
                end: endCoords,
                geometry: routeGeometry,
                pickup,
                dropoff,
                itemDescription,
                weight,
                estimatedValue,
              });
            }}
            onReject={rejectRide}
          />
        </Animated.View>
      )}

      {/* BOTTOM SHEET */}
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: colors.sheetBackground,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            borderTopWidth: highContrast ? borderWidth : 0,
            borderColor: colors.border,
          },
        ]}
      >
        <ScrollView contentContainerStyle={styles.sheetContent}>

          {/* PICKUP + DROPOFF BOX */}
          <View
            style={[
              styles.locationBox,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: highContrast ? borderWidth : 0,
              },
            ]}
          >
            {/* PICKUP */}
            <View style={[styles.locationRow, { flexDirection: isUrdu ? "row-reverse" : "row" }]}>
              <AccessibleText style={[styles.locationIcon, { color: colors.text }]}>🟢</AccessibleText>
              <View style={{ alignItems: isUrdu ? "flex-end" : "flex-start" }}>
                <AccessibleText style={[styles.locationLabel, { color: colors.textSecondary }]}>
                  {t("pickup_location_label")}
                </AccessibleText>
                <AccessibleText style={[styles.locationValue, { color: colors.text }]}>
                  {pickup}
                </AccessibleText>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            {/* DROPOFF */}
            <View style={[styles.locationRow, { flexDirection: isUrdu ? "row-reverse" : "row" }]}>
              <AccessibleText style={[styles.locationIcon, { color: colors.text }]}>📍</AccessibleText>
              <View style={{ alignItems: isUrdu ? "flex-end" : "flex-start" }}>
                <AccessibleText style={[styles.locationLabel, { color: colors.textSecondary }]}>
                  {t("dropoff_location_label")}
                </AccessibleText>
                <AccessibleText style={[styles.locationValue, { color: colors.text }]}>
                  {dropoff}
                </AccessibleText>
              </View>
            </View>
          </View>

          {/* KEEP LOOKING */}
          <TouchableOpacity
            style={[
              styles.keepBtn,
              {
                backgroundColor: highContrast ? colors.surface : "#2C2F34",
                borderColor: colors.border,
                borderWidth: highContrast ? borderWidth : 0,
              },
            ]}
          >
            <AccessibleText style={[styles.keepText, { color: colors.text }]}>
              {t("keep_looking_btn")}
            </AccessibleText>
          </TouchableOpacity>

          {/* CANCEL */}
          <TouchableOpacity
            style={[
              styles.cancelBtn,
              {
                borderColor: colors.border,
                borderWidth: highContrast ? borderWidth : 0,
              },
            ]}
            onPress={() =>
              navigation.replace("ParcelDetails", {
                pickup,
                dropoff,
                itemDescription,
                weight,
                estimatedValue,
              })
            }
          >
            <AccessibleText style={[styles.cancelText, { color: colors.text }]}>
              {t("cancel_delivery_btn")}
            </AccessibleText>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </View>
  );
};

export default SearchingRiderScreen;

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { position: "absolute", width: "100%", height: "100%" },

  header: {
    position: "absolute",
    top: 55,
    width: "100%",
    alignItems: "center",
    zIndex: 20,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  cardWrap: {
    position: "absolute",
    top: 110,
    left: 20,
    right: 20,
    zIndex: 25,
  },

  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "55%",
    paddingTop: 20,
  },

  sheetContent: {
    paddingHorizontal: 20,
    alignItems: "center",
  },

  locationBox: {
    width: "100%",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },

  locationRow: {
    marginBottom: 10,
    alignItems: "center",
  },

  locationIcon: {
    fontSize: 26,
    marginRight: 12,
    marginLeft: 12,
  },

  locationLabel: {
    fontSize: 12,
    marginBottom: 2,
  },

  locationValue: {
    fontSize: 15,
    fontWeight: "600",
    flexWrap: "wrap",
    maxWidth: "85%",
  },

  divider: {
    height: 1,
    marginVertical: 10,
  },

  keepBtn: {
    paddingVertical: 14,
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14,
  },

  keepText: {
    fontWeight: "700",
  },

  cancelBtn: {
    backgroundColor: "#c62828",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
  },

  cancelText: {
    fontWeight: "700",
  },
});

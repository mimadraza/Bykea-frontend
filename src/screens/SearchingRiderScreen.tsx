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

import LeafletMap, {
  LeafletMapHandle,
  LatLng,
} from "../Component/LeafletMap";

import { geocodeAddress, getRoute } from "../services/openRouteService";
import DriverOfferCard, { DriverOffer } from "../Component/DriverOfferCard";

const SearchingRiderScreen = ({ navigation, route }) => {
  const { colors } = useAccessibility();
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
    {
      id: "1",
      name: "Asif Gul",
      eta: "5 mins away",
      rating: 4.95,
      price: 90,
    },
    {
      id: "2",
      name: "Fahad Khan",
      eta: "3 mins away",
      rating: 4.88,
      price: 90,
    },
    {
      id: "3",
      name: "Umair Ali",
      eta: "7 mins away",
      rating: 4.99,
      price: 90,
    },
  ];

  const incomingFeed: DriverOffer[] = [
    {
      id: "4",
      name: "Rehan Ahmed",
      eta: "4 mins away",
      rating: 4.82,
      price: 90,
    },
    {
      id: "5",
      name: "Talha Javed",
      eta: "6 mins away",
      rating: 4.90,
      price: 90,
    },
    {
      id: "6",
      name: "Moiz Khan",
      eta: "8 mins away",
      rating: 4.78,
      price: 90,
    },
  ];

  const [offers, setOffers] = useState<DriverOffer[]>(initialOffers);
  const [incoming, setIncoming] = useState<DriverOffer[]>(incomingFeed);
  const [current, setCurrent] = useState<DriverOffer | null>(initialOffers[0]);

  // Route state to pass to RideInProgress
  const [startCoords, setStartCoords] = useState<LatLng | null>(
    routeStart || null
  );
  const [endCoords, setEndCoords] = useState<LatLng | null>(
    routeEnd || null
  );
  const [routeGeometry, setRouteGeometry] = useState<any[]>(
    initialGeometry || []
  );

  // Fade animation
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeSwap = (cb: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      cb();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  // Reject current offer
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

  // Auto-cycle every 8 seconds
  useEffect(() => {
    let timer: any = null;

    if (current) {
      timer = setInterval(() => {
        rejectRide();
      }, 8000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [current, offers]);

  // Auto-spawn new riders every 5 seconds
  useEffect(() => {
    let spawnTimer: any = null;

    if (incoming.length > 0) {
      spawnTimer = setInterval(() => {
        const next = incoming[0];
        const rest = incoming.slice(1);

        setIncoming(rest);
        setOffers(prev => [...prev, next]);
        if (!current) setCurrent(next);
      }, 5000);
    }

    return () => {
      if (spawnTimer) clearInterval(spawnTimer);
    };
  }, [incoming, current]);

  // ---------------- ROUTE DRAWING ----------------
  useEffect(() => {
    async function loadRoute() {
      let s = startCoords;
      let e = endCoords;

      if (!s || !e) {
        if (pickup) s = await geocodeAddress(pickup);
        if (dropoff) e = await geocodeAddress(dropoff);
      }

      if (!s || !e) return;

      let geom = routeGeometry;
      if (!geom || !geom.length) {
        const route = await getRoute(s, e);
        geom = route.geometry;
        setRouteGeometry(geom);
      }

      setStartCoords(s);
      setEndCoords(e);

      mapRef.current?.setRoute({
        start: s,
        end: e,
        geometry: geom,
      });
    }

    loadRoute();
  }, []);

  return (
    <View style={styles.container}>
      <LeafletMap ref={mapRef} style={styles.map} />

      {/* TOP LABEL */}
      <View style={styles.header}>
        <AccessibleText style={styles.headerText}>
          Finding Rider…
        </AccessibleText>
      </View>

      {/* OFFER CARD AREA */}
      {current && (
        <Animated.View style={[styles.cardWrap, { opacity: fadeAnim }]}>
          <DriverOfferCard
            offer={current}
            onAccept={() => {
              if (!startCoords || !endCoords || !routeGeometry.length) {
                return;
              }
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
      <View style={[styles.sheet, { backgroundColor: colors.sheetBackground }]}>
        <ScrollView contentContainerStyle={styles.sheetContent}>
          {/* PICKUP + DROPOFF DETAILS */}
          <View style={styles.locationBox}>
            <View style={styles.locationRow}>
              <AccessibleText style={styles.locationIcon}>🟢</AccessibleText>
              <View>
                <AccessibleText style={styles.locationLabel}>
                  Pickup Location
                </AccessibleText>
                <AccessibleText style={styles.locationValue}>
                  {pickup}
                </AccessibleText>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.locationRow}>
              <AccessibleText style={styles.locationIcon}>📍</AccessibleText>
              <View>
                <AccessibleText style={styles.locationLabel}>
                  Dropoff Location
                </AccessibleText>
                <AccessibleText style={styles.locationValue}>
                  {dropoff}
                </AccessibleText>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.keepBtn}>
            <AccessibleText style={styles.keepText}>
              KEEP LOOKING
            </AccessibleText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
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
            <AccessibleText style={styles.cancelText}>
              CANCEL DELIVERY
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
  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  header: {
    position: "absolute",
    top: 55,
    width: "100%",
    alignItems: "center",
    zIndex: 20,
  },

  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "rgba(0,0,0,0.45)",
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
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 20,
  },

  sheetContent: {
    paddingHorizontal: 20,
    alignItems: "center",
  },

  locationBox: {
    width: "100%",
    backgroundColor: "#1C2026",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  locationIcon: {
    fontSize: 26,
    marginRight: 12,
  },

  locationLabel: {
    color: "#A9A9A9",
    fontSize: 12,
    marginBottom: 2,
  },

  locationValue: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    flexWrap: "wrap",
    maxWidth: "85%",
  },

  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 10,
  },

  keepBtn: {
    paddingVertical: 14,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#2C2F34",
    alignItems: "center",
    marginBottom: 14,
  },
  keepText: {
    color: "white",
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
    color: "white",
    fontWeight: "700",
  },
});

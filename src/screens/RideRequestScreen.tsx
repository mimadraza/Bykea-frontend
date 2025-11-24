// src/screens/RideRequestScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import html_script from "./html_script";

import TopBar from "../Component/TopBar";
import BackButton from "../Component/BackButton";
import FareCounter from "../Component/FareCounter";
import DriverOfferCard, { DriverOffer } from "../Component/DriverOfferCard";
import AccessibleText from "../Component/AccessibleText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext";

import { LatLng } from "../Component/LeafletMap";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const DRIVER_POOL: Omit<DriverOffer, "id">[] = [
  { name: "Asif Gul", eta: "5 mins away", rating: 4.95 },
  { name: "Imran Khan", eta: "7 mins away", rating: 4.80 },
  { name: "Ali Raza", eta: "3 mins away", rating: 4.70 },
  { name: "Bilal Sheikh", eta: "9 mins away", rating: 4.60 },
];

const RIDE_META = {
  Motorbike: { icon: "🛵", passengers: "1 Passenger" },
  Car: { icon: "🚗", passengers: "3–4 Passengers" },
  RickShaw: { icon: "🛺", passengers: "3 Passengers" },
};

const RideRequestScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute();
  const { destination } = route.params || {};
  const { t } = useTranslation();
  const { colors, borderWidth } = useAccessibility();

  const mapRef = useRef<WebView>(null);

  // ⬇️ NOW ALSO RECEIVE start / end / geometry FROM ChooseRide
  const { rideType, fare: initialFare, start, end, geometry } = route.params as {
    rideType: "Motorbike" | "Car" | "RickShaw";
    fare: number;
    start: LatLng;
    end: LatLng;
    geometry: LatLng[];
  };

  // Dynamic fare
  const [fare, setFare] = useState(initialFare);

  // Driver offers
  const [offers, setOffers] = useState<DriverOffer[]>([]);

  // Send the route to the WebView once it finishes loading
  const sendRouteToMap = () => {
    if (!mapRef.current || !start || !end || !geometry?.length) return;

    mapRef.current.postMessage(
      JSON.stringify({
        type: "setRoute",
        start,
        end,
        geometry,
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOffers((current) => {
        if (current.length >= 4) return current;

        const random =
          DRIVER_POOL[Math.floor(Math.random() * DRIVER_POOL.length)];

        const translatedEta = `${random.eta.split(" ")[0]} ${t(
          "driver_offer_eta"
        )}`;

        const newOffer: DriverOffer = {
          id: Date.now().toString() + Math.random().toString(16).slice(2),
          ...random,
          eta: translatedEta,
        };

        // sometimes add 2 offers
        const addTwo = Math.random() < 0.4;
        if (addTwo) {
          const another =
            DRIVER_POOL[Math.floor(Math.random() * DRIVER_POOL.length)];
          const second: DriverOffer = {
            id:
              (Date.now() + 1).toString() +
              Math.random().toString(16).slice(2),
            ...another,
            eta: `${another.eta.split(" ")[0]} ${t("driver_offer_eta")}`,
          };
          return [...current, newOffer, second];
        }

        return [...current, newOffer];
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleReject = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  const handleAccept = (offer: DriverOffer) => {
    navigation.navigate("RideInProgress", {
      driver: offer,
      fare,
      from: "RiderRequest",
      start,
      end,
      geometry,
    });

    setOffers((prev) => prev.filter((o) => o.id !== offer.id));
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
        onLoadEnd={sendRouteToMap} // ⬅️ DRAW ROUTE WHEN READY
      />

      {/* TOP BAR */}
      <TopBar onMenuPress={() => console.log("menu")} />

      {/* Driver popups */}
      <View style={styles.offersContainer}>
        {offers.map((offer) => (
          <DriverOfferCard
            key={offer.id}
            offer={offer}
            onAccept={() => handleAccept(offer)}
            onReject={() => handleReject(offer.id)}
          />
        ))}
      </View>

      {/* BOTTOM RIDE SUMMARY */}
      <View style={styles.bottomCard}>
        <AccessibleText style={styles.rideTitle}>
          {t(`${rideType.toLowerCase()}_name`)}
        </AccessibleText>

        <View style={styles.rideIconWrapper}>
          <AccessibleText style={styles.rideIcon}>
            {RIDE_META[rideType].icon}
          </AccessibleText>
        </View>

        <View style={styles.counterRow}>
          <FareCounter
            value={fare}
            onIncrease={() => setFare((f) => f + 1)}
            onDecrease={() => setFare((f) => Math.max(0, f - 1))}
            onOpenCustom={() => console.log("open custom fare")}
          />
        </View>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() =>
              navigation.replace("ChooseRide", {
                destination: destination ?? "",
              })}
        >
          <AccessibleText style={styles.cancelText}>
            {t("cancel_ride_btn")}
          </AccessibleText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RideRequestScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  offersContainer: {
    position: "absolute",
    top: 90,
    left: 15,
    right: 15,
    zIndex: 30,
  },

  backButtonWrapper: {
    position: "absolute",
    top: 270,
    left: 20,
    zIndex: 35,
  },

  bottomCard: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: "#25282B",
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 20,
    zIndex: 40,
    borderWidth: 2,
    borderColor: "#3dff73",
  },

  rideTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },

  rideIconWrapper: {
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1F2124",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  rideIcon: {
    fontSize: 32,
  },

  counterRow: {
    alignItems: "center",
    marginBottom: 16,
  },

  keepLookingBtn: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 10,
  },

  keepLookingText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "700",
  },

  cancelBtn: {
    backgroundColor: "#D62828",
    paddingVertical: 12,
    borderRadius: 16,
  },

  cancelText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
});

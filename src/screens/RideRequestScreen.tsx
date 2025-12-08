// src/screens/RideRequestScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import html_script from "./html_script";

import TopBar from "../Component/TopBar";
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
  { name: "Asif Gul", eta: "5 mins away", rating: 4.95, price: 100 },
  { name: "Imran Khan", eta: "7 mins away", rating: 4.8, price: 120 },
  { name: "Ali Raza", eta: "3 mins away", rating: 4.7, price: 90 },
  { name: "Bilal Sheikh", eta: "9 mins away", rating: 4.6, price: 110 },
];

/* ✅ FIXED: RickShaw → Rickshaw (this mismatch CAUSED your crash) */
const RIDE_META: Record<
  "Motorbike" | "Car" | "Rickshaw",
  { icon: string; passengers: string }
> = {
  Motorbike: { icon: "🛵", passengers: "1 Passenger" },
  Car: { icon: "🚗", passengers: "3–4 Passengers" },
  Rickshaw: { icon: "🛺", passengers: "3 Passengers" },
};

const RideRequestScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute();
  const { t } = useTranslation();
  const { colors, borderWidth, highContrast } = useAccessibility();

  const mapRef = useRef<WebView>(null);

  /* ✅ SAFE PARAM EXTRACTION (NO MORE CRASHES EVER) */
  const params = route.params as any;

  const rideType: "Motorbike" | "Car" | "Rickshaw" =
    params?.rideType ?? "Motorbike";

  const initialFare: number = params?.fare ?? 0;
  const start: LatLng | undefined = params?.start;
  const end: LatLng | undefined = params?.end;
  const geometry: LatLng[] | undefined = params?.geometry;
  const destination: string = params?.destination ?? "";

  const [fare, setFare] = useState(initialFare);
  const [offers, setOffers] = useState<DriverOffer[]>([]);

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
          name: random.name,
          eta: translatedEta,
          rating: random.rating,
          price: random.price,
        };

        return [...current, newOffer];
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [t]);

  const handleReject = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  const handleAccept = (offer: DriverOffer) => {
    navigation.navigate("RideInProgress", {
      driver: offer,
      fare: offer.price,
      from: "RiderRequest",
      start,
      end,
      geometry,
      destination,
    });

    setOffers((prev) => prev.filter((o) => o.id !== offer.id));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <WebView
        ref={mapRef}
        source={{ html: html_script }}
        style={styles.map}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={["*"]}
        mixedContentMode="always"
        onLoadEnd={sendRouteToMap}
      />

      <TopBar onMenuPress={() => {}} />

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

      <View
        style={[
          styles.bottomCard,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.primary,
            borderWidth: highContrast ? borderWidth : 2,
          },
        ]}
      >
        <AccessibleText style={[styles.rideTitle, { color: colors.text }]}>
          {t(`${rideType.toLowerCase()}_name`)}
        </AccessibleText>

        <View
          style={[
            styles.rideIconWrapper,
            { backgroundColor: colors.surface },
          ]}
        >
          <AccessibleText style={styles.rideIcon}>
            {/* ✅ SAFE ICON ACCESS */}
            {RIDE_META[rideType]?.icon ?? "🚗"}
          </AccessibleText>
        </View>

        <View style={styles.counterRow}>
          <FareCounter
            value={fare}
            onIncrease={() => setFare((f) => f + 5)}
            onDecrease={() => setFare((f) => Math.max(0, f - 5))}
            onOpenCustom={() => {}}
          />
        </View>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.pop()}
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

  bottomCard: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 20,
    zIndex: 40,
  },

  rideTitle: {
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
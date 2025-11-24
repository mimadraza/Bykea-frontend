// screens/PickupScreen.tsx
import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import TopBar from "../Component/TopBar";
import Sidebar from "../Component/Sidebar";
import AccessibleText from "../Component/AccessibleText";
import AccessibleTextInput from "../Component/AccessibleTextInput";

import { useAccessibility } from "../context/AccessibilityContext";
import { RootStackParamList } from "../navigation/AppNavigator";

import LeafletMap, {
  LeafletMapHandle,
  LatLng
} from "../Component/LeafletMap";

import { geocodeAddress, getRoute } from "../services/openRouteService";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const HOME_START: LatLng = { lat: 24.934963, lng: 67.156854 };

const PickupScreen: React.FC = () => {
  const mapRef = useRef<LeafletMapHandle>(null);
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();
  const { colors, borderWidth } = useAccessibility();

  const [open, setOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-260))[0];

  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const recentLocations = [
    "Iba, University Road, Karachi",
    "Falcon Complex, Siam House",
    "Saima Mall, North Nazimabad"
  ];

  const toggleSidebar = () => {
    const toValue = open ? -260 : 0;
    setOpen(!open);
    Animated.timing(slideAnim, {
      toValue,
      duration: 250,
      useNativeDriver: true
    }).start();
  };

  async function handleTyping(text: string) {
    setDestination(text);

    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const loc = await geocodeAddress(text);
      if (loc) setSuggestions([text]);
      else setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectSuggestion(item: string) {
    setDestination(item);
    setSuggestions([]);

    try {
      const dest = await geocodeAddress(item);
      if (!dest) return;

      const route = await getRoute(HOME_START, dest);

      mapRef.current?.setRoute({
        start: HOME_START,
        end: dest,
        geometry: route.geometry
      });

      navigation.navigate("ChooseRide", { destination: item });
    } catch (err) {
      console.warn("Destination selection error:", err);
    }
  }

  return (
    <View style={styles.container}>
      {/* Background Map */}
      <LeafletMap
        ref={mapRef}
        style={styles.map}
        onLoadEnd={() => {
          mapRef.current?.setInitialView(HOME_START, 15);
          mapRef.current?.setOnlyPickup(HOME_START);
        }}
      />

      <TopBar onMenuPress={toggleSidebar} />

      {/* SIDEBAR + OVERLAY */}
      {open && (
        <>
          <TouchableOpacity style={styles.sidebarOverlay} onPress={toggleSidebar} />
          <Sidebar slideAnim={slideAnim} onClose={toggleSidebar} />
        </>
      )}

      {/* Floating Search Card */}
      <View
        style={[
          styles.overlayCard,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
            borderWidth
          }
        ]}
      >
        <AccessibleTextInput
          value={destination}
          onChangeText={handleTyping}
          placeholder={"Enter your destination"}
          style={styles.input}
        />

        {destination.length > 0 && suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(_, i) => i.toString()}
            style={styles.suggestionBox}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
                <AccessibleText style={styles.suggestionText}>
                  {item}
                </AccessibleText>
              </TouchableOpacity>
            )}
          />
        )}

        {destination.length === 0 && (
          <View style={styles.recentContainer}>
            <AccessibleText style={styles.recentTitle}>
              Recent Locations
            </AccessibleText>

            {recentLocations.map((loc, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleSelectSuggestion(loc)}
              >
                <AccessibleText style={styles.recentItem}>
                  {loc}
                </AccessibleText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1
  },

  /* SIDEBAR ALWAYS ON TOP OF EVERYTHING */
  sidebarOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 90
  },

  /* Floating Search Card MUST stay under sidebar */
  overlayCard: {
    position: "absolute",
    top: 90,
    left: 20,
    right: 20,
    padding: 18,
    borderRadius: 20,
    zIndex: 20,       // ← FIXED (was 50)
    elevation: 20
  },

  input: {
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10
  },

  suggestionBox: {
    maxHeight: 150,
    marginBottom: 10
  },

  suggestionText: {
    paddingVertical: 8,
    borderBottomWidth: 1
  },

  recentContainer: {
    marginTop: 10
  },

  recentTitle: {
    fontWeight: "700",
    marginBottom: 6
  },

  recentItem: {
    paddingVertical: 6,
    borderBottomWidth: 1
  }
});

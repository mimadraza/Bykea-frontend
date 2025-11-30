// screens/HomeScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
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
  LatLng,
} from "../Component/LeafletMap";

import { geocodeAddress, getRoute } from "../services/openRouteService";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const HOME_START: LatLng = {
  lat: 24.934963,
  lng: 67.156854,
};

type Mode = "ride" | "delivery";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { colors } = useAccessibility();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-260));
  const mapRef = useRef<LeafletMapHandle>(null);

  const [mode, setMode] = useState<Mode>("ride");

  // RIDE MODE STATE
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // DELIVERY MODE STATE
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const toggleSidebar = () => {
    const toValue = open ? -260 : 0;
    setOpen(!open);
    Animated.timing(slideAnim, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    mapRef.current?.setInitialView(HOME_START, 15);
    mapRef.current?.setOnlyPickup(HOME_START);
  }, []);

  // ============================
  // RIDE SEARCH HANDLERS
  // ============================
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
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectSuggestion(item: string) {
    setDestination(item);
    setSuggestions([]);

    try {
      setLoading(true);
      const dest = await geocodeAddress(item);
      if (!dest) return;

      const route = await getRoute(HOME_START, dest);

      mapRef.current?.setRoute({
        start: HOME_START,
        end: dest,
        geometry: route.geometry,
      });

      navigation.navigate("ChooseRide", { destination: item });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* MAP */}
      <LeafletMap ref={mapRef} style={styles.map} />

      {/* TOP BAR */}
      <TopBar onMenuPress={toggleSidebar} />

      {/* SIDEBAR */}
      {open && <Sidebar slideAnim={slideAnim} onClose={toggleSidebar} />}

      {/* MAP CONTROLS */}
      <View style={styles.mapControls}>
        <TouchableOpacity
          style={[
            styles.mapControlButton,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <AccessibleText
            style={[styles.mapControlText, { color: colors.text }]}
          >
            +
          </AccessibleText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.mapControlButton,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <AccessibleText
            style={[styles.mapControlText, { color: colors.text }]}
          >
            −
          </AccessibleText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.mapControlButton,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <AccessibleText
            style={[styles.mapControlText, { color: colors.text }]}
          >
            ⚙︎
          </AccessibleText>
        </TouchableOpacity>
      </View>

      {/* BOTTOM SHEET BACKGROUND */}
      <View
        style={[
          styles.sheetBackground,
          { backgroundColor: colors.sheetBackground },
        ]}
      />

      {/* BOTTOM SHEET CONTENT */}
      <View style={styles.sheetContent}>
        <View style={styles.handleContainer}>
          <View
            style={[styles.handle, { backgroundColor: colors.border }]}
          />
        </View>

        <AccessibleText
          style={[styles.sheetTitle, { color: colors.text }]}
        >
          {mode === "ride"
            ? t("home_where_to")
            : t("home_send_parcel")}
        </AccessibleText>

        {/* MODE SWITCHER */}
        <View
          style={[
            styles.modeToggle,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
            },
          ]}
        >
          {/* RIDE BUTTON */}
          <TouchableOpacity
            style={[
              styles.modeButton,
              mode === "ride" && {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 5,
              },
            ]}
            onPress={() => setMode("ride")}
          >
            <AccessibleText
              style={[
                styles.modeButtonText,
                { color: colors.textSecondary },
                mode === "ride" && { color: colors.text },
              ]}
            >
              {t("home_mode_ride")}
            </AccessibleText>
          </TouchableOpacity>

          {/* DELIVERY BUTTON */}
          <TouchableOpacity
            style={[
              styles.modeButton,
              mode === "delivery" && {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 5,
              },
            ]}
            onPress={() => setMode("delivery")}
          >
            <AccessibleText
              style={[
                styles.modeButtonText,
                { color: colors.textSecondary },
                mode === "delivery" && { color: colors.text },
              ]}
            >
              {t("home_mode_delivery")}
            </AccessibleText>
          </TouchableOpacity>
        </View>

        {/* ============================
            RIDE MODE UI
        ============================ */}
        {mode === "ride" && (
          <>
            {/* Search bar */}
            <View
              style={[
                styles.searchBar,
                { backgroundColor: colors.surface },
              ]}
            >
              <AccessibleText
                style={[styles.searchIcon, { color: colors.icon }]}
              >
                🔍
              </AccessibleText>
              <AccessibleTextInput
                value={destination}
                onChangeText={handleTyping}
                placeholder={t("home_search_destination")}
                style={[styles.searchInput, { color: colors.text }]}
              />
            </View>

            <View style={styles.suggestionContainer}>
              {destination.trim().length > 0 ? (
                <FlatList
                  data={suggestions}
                  keyExtractor={(_, i) => i.toString()}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleSelectSuggestion(item)}
                    >
                      <AccessibleText
                        style={[
                          styles.suggestionItem,
                          {
                            color: colors.text,
                            borderBottomColor: colors.border,
                          },
                        ]}
                      >
                        {item}
                      </AccessibleText>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <>
                  {/* SAVED LOCATION 1 */}
                  <TouchableOpacity
                    style={[
                      styles.savedItem,
                      { borderBottomColor: colors.border },
                    ]}
                    onPress={() =>
                      handleSelectSuggestion(
                        "IBA University Road, Karachi"
                      )
                    }
                  >
                    <AccessibleText
                      style={[
                        styles.savedIcon,
                        { color: colors.icon },
                      ]}
                    >
                      📍
                    </AccessibleText>
                    <View style={styles.savedTextWrapper}>
                      <AccessibleText
                        style={[
                          styles.savedTitle,
                          { color: colors.text },
                        ]}
                      >
                        {t("home_saved_iba_title")}
                      </AccessibleText>
                      <AccessibleText
                        style={[
                          styles.savedSubtitle,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {t("home_saved_iba_subtitle")}
                      </AccessibleText>
                    </View>
                    <AccessibleText
                      style={[
                        styles.chevron,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {">"}
                    </AccessibleText>
                  </TouchableOpacity>

                  {/* SAVED LOCATION 2 */}
                  <TouchableOpacity
                    style={[
                      styles.savedItem,
                      { borderBottomColor: colors.border },
                    ]}
                    onPress={() =>
                      handleSelectSuggestion(
                        "Saima Mall, North Nazimabad, Karachi"
                      )
                    }
                  >
                    <AccessibleText
                      style={[
                        styles.savedIcon,
                        { color: colors.icon },
                      ]}
                    >
                      📍
                    </AccessibleText>
                    <View style={styles.savedTextWrapper}>
                      <AccessibleText
                        style={[
                          styles.savedTitle,
                          { color: colors.text },
                        ]}
                      >
                        {t("home_saved_saima_title")}
                      </AccessibleText>
                      <AccessibleText
                        style={[
                          styles.savedSubtitle,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {t("home_saved_saima_subtitle")}
                      </AccessibleText>
                    </View>
                    <AccessibleText
                      style={[
                        styles.chevron,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {">"}
                    </AccessibleText>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </>
        )}

        {/* ============================
            DELIVERY MODE UI
        ============================ */}
        {mode === "delivery" && (
          <>
            {/* PICKUP */}
            <View
              style={[
                styles.searchBar,
                { backgroundColor: colors.surface },
              ]}
            >
              <AccessibleText
                style={[styles.searchIcon, { color: colors.icon }]}
              >
                🟢
              </AccessibleText>
              <AccessibleTextInput
                value={pickup}
                onChangeText={setPickup}
                placeholder={t("home_pickup_placeholder")}
                style={[styles.searchInput, { color: colors.text }]}
              />
            </View>

            {/* DROPOFF */}
            <View
              style={[
                styles.searchBar,
                { backgroundColor: colors.surface },
              ]}
            >
              <AccessibleText
                style={[styles.searchIcon, { color: colors.icon }]}
              >
                📍
              </AccessibleText>
              <AccessibleTextInput
                value={dropoff}
                onChangeText={setDropoff}
                placeholder={t("home_dropoff_placeholder")}
                style={[styles.searchInput, { color: colors.text }]}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.deliveryItemRow,
                { borderBottomColor: colors.border },
              ]}
              onPress={() =>
                navigation.navigate("ParcelDetails", {
                  pickup,
                  dropoff,
                })
              }
            >
              <AccessibleText
                style={[
                  styles.deliveryItemIcon,
                  { color: colors.icon },
                ]}
              >
                📦
              </AccessibleText>
              <View style={styles.deliveryItemTextWrapper}>
                <AccessibleText
                  style={[
                    styles.deliveryItemTitle,
                    { color: colors.text },
                  ]}
                >
                  {t("home_parcel_details_title")}
                </AccessibleText>
                <AccessibleText
                  style={[
                    styles.deliveryItemSubtitle,
                    { color: colors.textSecondary },
                  ]}
                >
                  {t("home_parcel_details_subtitle")}
                </AccessibleText>
              </View>
              <AccessibleText
                style={[
                  styles.chevron,
                  { color: colors.textSecondary },
                ]}
              >
                {">"}
              </AccessibleText>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

/* =====================================
   STYLES
===================================== */
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { position: "absolute", width: "100%", height: "100%", zIndex: 1 },

  mapControls: {
    position: "absolute",
    right: 16,
    top: 120,
    zIndex: 20,
  },
  mapControlButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  mapControlText: { fontSize: 18, fontWeight: "700" },

  sheetBackground: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "52%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 10,
  },

  sheetContent: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "52%",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    zIndex: 20,
  },

  handleContainer: { alignItems: "center", marginBottom: 4 },
  handle: {
    width: 50,
    height: 5,
    borderRadius: 999,
  },

  sheetTitle: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 4,
  },

  modeToggle: {
    flexDirection: "row",
    borderRadius: 5,
    padding: 4,
    marginBottom: 10,
  },
  modeButton: {
    flex: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
    borderWidth: 0,
  },

  suggestionContainer: {
    flex: 1,
    marginTop: 4,
  },

  suggestionItem: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  savedItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  savedIcon: { fontSize: 20, marginRight: 12 },
  savedTextWrapper: { flex: 1 },
  savedTitle: { fontSize: 15, fontWeight: "600" },
  savedSubtitle: { fontSize: 13, marginTop: 2 },
  chevron: { fontSize: 18 },

  deliveryItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  deliveryItemIcon: { fontSize: 20, marginRight: 12 },
  deliveryItemTextWrapper: { flex: 1 },
  deliveryItemTitle: { fontSize: 15, fontWeight: "600" },
  deliveryItemSubtitle: { fontSize: 13, marginTop: 2 },
});

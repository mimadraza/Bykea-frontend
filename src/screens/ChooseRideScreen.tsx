import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { WebView } from "react-native-webview";
import html_script from "./html_script";

import BackButton from "../Component/BackButton";
import FareCounter from "../Component/FareCounter";

import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AccessibleText from "../Component/AccessibleText";
import AccessibleTextInput from "../Component/AccessibleTextInput";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext"; // Import hook

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const ChooseRideScreen: React.FC = () => {
  const mapRef = useRef<WebView>(null);
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();
  const { colors } = useAccessibility(); // Get colors

  const route = useRoute();
  const { destination } = route.params as { destination: string };

  const pickup = t("pickup_location");

  // Fare values
  const [fareCount, setFareCount] = useState({
    Motorbike: 146,
    Car: 512,
    RickShaw: 512,
  });

  const [selectedRide, setSelectedRide] = useState("Motorbike");

  // Simple custom fare popup state
  const [customVisible, setCustomVisible] = useState(false);
  const [editingRide, setEditingRide] =
    useState<keyof typeof fareCount | null>(null);
  const [tempFare, setTempFare] = useState("");

  const openCustomFare = (rideName: keyof typeof fareCount) => {
    setEditingRide(rideName);
    setTempFare(String(fareCount[rideName]));
    setCustomVisible(true);
  };

  const applyCustomFare = () => {
    if (!editingRide) {
      setCustomVisible(false);
      return;
    }

    const num = Number(tempFare);
    if (!isNaN(num)) {
      setFareCount({
        ...fareCount,
        [editingRide]: num,
      });
    }
    setCustomVisible(false);
  };

  const rideOptions = [
    { name: "Motorbike", desc: t("motorbike_desc"), icon: "🛵" },
    { name: "Car", desc: t("car_desc"), icon: "🚗" },
    { name: "RickShaw", desc: t("rickshaw_desc"), icon: "🛺" },
  ];

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
      />

      {/* LOCATION BOX */}
      <View style={[styles.locationCard, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.markerColumn}>
          {/* Pickup location marker */}
          <View style={[styles.circleOuter, { borderColor: colors.text }]}>
            <View style={[styles.circleInner, { backgroundColor: colors.text }]} />
          </View>
          {/* Dotted line (Keeping color same for route) */}
          <View style={[styles.dottedLine, { backgroundColor: colors.accent }]} />
          {/* Destination arrow (Keeping color same for route) */}
          <AccessibleText style={[styles.arrow, { color: colors.accent }]}>➤</AccessibleText>
        </View>

        <View style={{ flex: 1 }}>
          <View style={[styles.inputRow, { backgroundColor: colors.inputBackground }]}>
            <AccessibleText style={styles.inputText}>{pickup}</AccessibleText>
            <AccessibleText style={[styles.plus, { color: colors.primary }]}>+</AccessibleText>
          </View>

          <View style={[styles.inputRow, { backgroundColor: colors.inputBackground }]}>
            <AccessibleText style={styles.inputText}>{destination}</AccessibleText>
          </View>
        </View>
      </View>

      {/* BACK BUTTON */}
      <View style={styles.backButtonWrapper}>
        <BackButton onPress={() => navigation.navigate("Pickup")} />
      </View>

      {/* BOTTOM SHEET */}
      <View style={[styles.bottomSheet, { backgroundColor: colors.sheetBackground }]}>
        <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />
        <AccessibleText style={styles.sheetTitle}>{t("sheet_title")}</AccessibleText>

        <View style={{ maxHeight: 280 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {rideOptions.map((ride) => (
              <TouchableOpacity
                key={ride.name}
                style={[
                  styles.rideCard,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: selectedRide === ride.name ? colors.primary : "transparent",
                  },
                  selectedRide === ride.name && [styles.rideCardSelected, { shadowColor: colors.primary }],
                ]}
                onPress={() => setSelectedRide(ride.name)}
              >
                <View style={styles.rideLeft}>
                  <View style={[styles.iconPlaceholder, { backgroundColor: colors.buttonBackground }]}>
                    <AccessibleText style={{ fontSize: 28 }}>{ride.icon}</AccessibleText>
                  </View>

                  <View>
                    <AccessibleText style={styles.rideName}>{t(`${ride.name.toLowerCase()}_name`)}</AccessibleText>
                    <AccessibleText style={[styles.rideDesc, { color: colors.textSecondary }]}>{ride.desc}</AccessibleText>
                  </View>
                </View>

                <FareCounter
                  value={fareCount[ride.name]}
                  onIncrease={() =>
                    setFareCount({
                      ...fareCount,
                      [ride.name]: fareCount[ride.name] + 1,
                    })
                  }
                  onDecrease={() =>
                    setFareCount({
                      ...fareCount,
                      [ride.name]: Math.max(
                        0,
                        fareCount[ride.name] - 1
                      ),
                    })
                  }
                  onOpenCustom={() =>
                    openCustomFare(ride.name as keyof typeof fareCount)
                  }
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={[styles.findRideButton, { backgroundColor: colors.primary }]} onPress={() =>
                                                          navigation.navigate("RideRequest", {
                                                            rideType: selectedRide,
                                                            fare: fareCount[selectedRide],
                                                          })
                                                        }>
          <AccessibleText style={styles.findRideText}>{t("find_ride_btn")}</AccessibleText>
        </TouchableOpacity>
      </View>

      {/* SIMPLE CUSTOM FARE POPUP */}
      {customVisible && (
        <View style={styles.popupOverlay}>
          <View style={[styles.popupBox, { backgroundColor: colors.cardBackground }]}>
            <AccessibleText style={styles.popupTitle}>{t("enter_fare_popup_title")}</AccessibleText>

            <View style={[styles.popupInputBox, { backgroundColor: colors.inputBackground }]}>
              <AccessibleTextInput
                style={styles.popupInput}
                value={tempFare}
                onChangeText={setTempFare}
                keyboardType="numeric"
                placeholder={t("enter_amount_placeholder")}
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.popupButtons}>
              <TouchableOpacity
                onPress={() => setCustomVisible(false)}
                style={styles.cancelButton}
              >
                <AccessibleText style={[styles.cancelText, { color: colors.textSecondary }]}>{t("cancel_btn")}</AccessibleText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={applyCustomFare}
                style={[styles.okButton, { backgroundColor: colors.primary }]}
              >
                <AccessibleText style={styles.okText}>{t("ok_btn")}</AccessibleText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ChooseRideScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  backButtonWrapper: {
    position: "absolute",
    top: 160,
    left: 20,
    zIndex: 30,
  },

  locationCard: {
    position: "absolute",
    top: 10,
    left: 15,
    right: 15,
    // backgroundColor: "#1F2124", // Removed hardcoded color
    padding: 18,
    borderRadius: 22,
    flexDirection: "row",
    zIndex: 40,
  },

  markerColumn: {
    alignItems: "center",
    marginRight: 14,
  },

  circleOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    // borderColor: "#fff", // Removed hardcoded color
    justifyContent: "center",
    alignItems: "center",
  },

  circleInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    // backgroundColor: "#fff", // Removed hardcoded color
  },

  dottedLine: {
    width: 2,
    height: 50,
    // backgroundColor: "#ffc107", // Removed hardcoded color
    marginVertical: 6,
  },

  arrow: {
    fontSize: 20,
    // color: "#ffc107" // Removed hardcoded color
  },

  inputRow: {
    // backgroundColor: "#2c333d", // Removed hardcoded color
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputText: {
    // color: "white", // Handled by AccessibleText default
    fontSize: 15,
    flex: 1
  },

  plus: {
    // color: "#3dff73", // Removed hardcoded color
    fontSize: 22,
    fontWeight: "bold"
  },

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    // backgroundColor: "#25282B", // Removed hardcoded color
    padding: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    zIndex: 50,
    paddingBottom: 30,
    maxHeight: "68%",
  },

  sheetHandle: {
    width: 60,
    height: 5,
    // backgroundColor: "#555", // Removed hardcoded color
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },

  sheetTitle: {
    // color: "white", // Handled by AccessibleText default
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },

  rideCard: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#2F3338", // Removed hardcoded color
    padding: 16,
    borderRadius: 16,
    justifyContent: "space-between",
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "transparent",
  },

  rideCardSelected: {
    // borderColor: "#3dff73", // Handled inline
    // shadowColor: "#3dff73", // Handled inline
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },

  rideLeft: { flexDirection: "row", alignItems: "center" },

  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    // backgroundColor: "#1E1F22", // Removed hardcoded color
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  rideName: {
    // color: "#fff", // Handled by AccessibleText default
    fontSize: 17,
    fontWeight: "700"
  },

  rideDesc: {
    // color: "#999", // Removed hardcoded color
    fontSize: 13
  },

  findRideButton: {
    // backgroundColor: "#3dff73", // Removed hardcoded color
    paddingVertical: 18,
    borderRadius: 14,
    marginTop: 10,
  },

  findRideText: {
    color: "#1A1A1A", // Keeping dark for contrast against primary
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },

  // popup styles
  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 500,
  },

  popupBox: {
    width: "75%",
    // backgroundColor: "#1F2124", // Removed hardcoded color
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  popupTitle: {
    // color: "white", // Handled by AccessibleText default
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  popupInputBox: {
    width: "100%",
    // backgroundColor: "#2c333d", // Removed hardcoded color
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
  },

  popupInput: {
    // color: "white", // Handled by AccessibleTextInput
    fontSize: 16,
    paddingVertical: 6,
  },

  popupButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },

  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },

  cancelText: {
    // color: "#bbb", // Removed hardcoded color
    fontSize: 16,
  },

  okButton: {
    // backgroundColor: "#3dff73", // Removed hardcoded color
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },

  okText: {
    color: "#1A1A1A", // Keeping dark for contrast against primary
    fontWeight: "700",
    fontSize: 16,
  },
});
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

import { WebView } from "react-native-webview";
import html_script from "./html_script";

import BackButton from "../Component/BackButton";
import FareCounter from "../Component/FareCounter";

import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const ChooseRideScreen: React.FC = () => {
  const mapRef = useRef<WebView>(null);
  const navigation = useNavigation<NavProp>();

  const route = useRoute();
  const { destination } = route.params as { destination: string };

  const pickup = "National Stadium, Karachi";

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
      <View style={styles.locationCard}>
        <View style={styles.markerColumn}>
          <View style={styles.circleOuter}>
            <View style={styles.circleInner} />
          </View>
          <View style={styles.dottedLine} />
          <Text style={styles.arrow}>➤</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.inputRow}>
            <Text style={styles.inputText}>{pickup}</Text>
            <Text style={styles.plus}>+</Text>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputText}>{destination}</Text>
          </View>
        </View>
      </View>

      {/* BACK BUTTON */}
      <View style={styles.backButtonWrapper}>
        <BackButton onPress={() => navigation.navigate("Pickup")} />
      </View>

      {/* BOTTOM SHEET */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />
        <Text style={styles.sheetTitle}>Choose a ride</Text>

        <View style={{ maxHeight: 280 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {rideOptions.map((ride) => (
              <TouchableOpacity
                key={ride.name}
                style={[
                  styles.rideCard,
                  selectedRide === ride.name && styles.rideCardSelected,
                ]}
                onPress={() => setSelectedRide(ride.name)}
              >
                <View style={styles.rideLeft}>
                  <View style={styles.iconPlaceholder}>
                    <Text style={{ fontSize: 28 }}>{ride.icon}</Text>
                  </View>

                  <View>
                    <Text style={styles.rideName}>{ride.name}</Text>
                    <Text style={styles.rideDesc}>{ride.desc}</Text>
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

        <TouchableOpacity style={styles.findRideButton} onPress={() =>
                                                          navigation.navigate("RideRequest", {
                                                            rideType: selectedRide,
                                                            fare: fareCount[selectedRide],
                                                          })
                                                        }>
          <Text style={styles.findRideText}>FIND RIDE</Text>
        </TouchableOpacity>
      </View>

      {/* SIMPLE CUSTOM FARE POPUP */}
      {customVisible && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={styles.popupTitle}>Enter Fare</Text>

            <View style={styles.popupInputBox}>
              <TextInput
                style={styles.popupInput}
                value={tempFare}
                onChangeText={setTempFare}
                keyboardType="numeric"
                placeholder="Enter amount"
                placeholderTextColor="#777"
              />
            </View>

            <View style={styles.popupButtons}>
              <TouchableOpacity
                onPress={() => setCustomVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={applyCustomFare}
                style={styles.okButton}
              >
                <Text style={styles.okText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ChooseRideScreen;

const rideOptions = [
  { name: "Motorbike", desc: "1 Passenger", icon: "🛵" },
  { name: "Car", desc: "3–4 Passengers", icon: "🚗" },
  { name: "RickShaw", desc: "3 Passengers", icon: "🛺" },
];

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
    backgroundColor: "#1F2124",
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
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  circleInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },

  dottedLine: {
    width: 2,
    height: 50,
    backgroundColor: "#ffc107",
    marginVertical: 6,
  },

  arrow: { fontSize: 20, color: "#ffc107" },

  inputRow: {
    backgroundColor: "#2c333d",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputText: { color: "white", fontSize: 15, flex: 1 },

  plus: { color: "#3dff73", fontSize: 22, fontWeight: "bold" },

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#25282B",
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
    backgroundColor: "#555",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },

  sheetTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },

  rideCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2F3338",
    padding: 16,
    borderRadius: 16,
    justifyContent: "space-between",
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "transparent",
  },

  rideCardSelected: {
    borderColor: "#3dff73",
    shadowColor: "#3dff73",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },

  rideLeft: { flexDirection: "row", alignItems: "center" },

  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1E1F22",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  rideName: { color: "#fff", fontSize: 17, fontWeight: "700" },

  rideDesc: { color: "#999", fontSize: 13 },

  findRideButton: {
    backgroundColor: "#3dff73",
    paddingVertical: 18,
    borderRadius: 14,
    marginTop: 10,
  },

  findRideText: {
    color: "#1A1A1A",
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
    backgroundColor: "#1F2124",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  popupTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  popupInputBox: {
    width: "100%",
    backgroundColor: "#2c333d",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
  },

  popupInput: {
    color: "white",
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
    color: "#bbb",
    fontSize: 16,
  },

  okButton: {
    backgroundColor: "#3dff73",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },

  okText: {
    color: "#1A1A1A",
    fontWeight: "700",
    fontSize: 16,
  },
});

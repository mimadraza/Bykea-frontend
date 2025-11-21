// src/screens/PickupScreen.tsx
import React, { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import html_script from "./html_script";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type NavProp = NativeStackNavigationProp<RootStackParamList>;


import TopBar from "../Component/TopBar";   // ⬅ USE COMPONENT

const PickupScreen: React.FC = () => {
  const mapRef = useRef<WebView>(null);
  const navigation = useNavigation<NavProp>();

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

      {/* 🔥 USE TOPBAR COMPONENT HERE */}
      <TopBar onMenuPress={() => console.log("Menu clicked")} />

      {/* MAIN OVERLAY CARD */}
      <View style={styles.overlayCard}>
        {/* Location marker column */}
        <View style={styles.markerColumn}>
          <View style={styles.circleOuter}>
            <View style={styles.circleInner} />
          </View>

          <View style={styles.dottedLine} />

          <Text style={styles.arrow}>➤</Text>
        </View>

        {/* Inputs column */}
        <View style={{ flex: 1 }}>
          <View style={styles.inputRow}>
            <Text style={styles.inputText}>National Stadium, Karachi</Text>
            <TouchableOpacity>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              placeholder="Enter your Destination"
              placeholderTextColor="#777"
              style={styles.destInput}
            />
          </View>

          {/* Recent locations */}
          <View style={styles.recentContainer}>
            <Text style={styles.recentTitle}>Recent Locations</Text>

            {[
              "Iba, University Road, Karachi",
              "Falcon complex, Siam house",
              "Saima mall, North Nazimabad",
            ].map((loc, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("ChooseRide", { destination: loc })}
              >
                <Text style={styles.recentItem}>{loc}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </View>
    </View>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  // Removed topBar, menuButton, menuLine ⬅ now using component

  overlayCard: {
    position: "absolute",
    top: 90,
    left: 20,
    right: 20,
    padding: 18,
    borderRadius: 24,
    backgroundColor: "rgba(30, 35, 45, 0.98)",
    flexDirection: "row",
    zIndex: 15,
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
    height: 55,
    backgroundColor: "#ffc107",
    marginVertical: 6,
  },

  arrow: {
    fontSize: 20,
    color: "#ffc107",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2c333d",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },

  inputText: {
    color: "white",
    fontSize: 15,
    flex: 1,
    marginRight: 10,
  },

  plus: {
    color: "#3dff73",
    fontSize: 24,
    fontWeight: "bold",
  },

  destInput: {
    color: "white",
    fontSize: 15,
    flex: 1,
  },

  recentContainer: {
    marginTop: 12,
  },

  recentTitle: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 6,
  },

  recentItem: {
    color: "#fff",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: "#444",
    fontSize: 13,
  },
});

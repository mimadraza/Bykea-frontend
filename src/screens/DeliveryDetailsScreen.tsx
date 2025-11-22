import React, { useRef } from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

import AccessibleText from "../Component/AccessibleText";
import AccessibleTextInput from "../Component/AccessibleTextInput";
import SectionTitle from "../Component/SectionTitle";
import FloatingNextButton from "../Component/FloatingNextButton";
import { useAccessibility } from "../context/AccessibilityContext";

import html_script from "./html_script"; // Same map script used in HomeScreen

import BoxIcon from "../assets/box.png";
import HomeIcon from "../assets/home.png";
import BookmarkIcon from "../assets/bookmark.png";

const DeliveryDetailsScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const { colors } = useAccessibility();

  return (
    <View style={styles.container}>

      {/* MAP IN BACKGROUND */}
      <WebView
        ref={mapRef}
        source={{ html: html_script }}
        style={styles.map}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={["*"]}
        mixedContentMode="always"
      />

      {/* BOTTOM SHEET */}
      <View style={[styles.sheet, { backgroundColor: colors.sheetBackground }]}>
        <ScrollView contentContainerStyle={styles.wrap}>

          <SectionTitle title="Enter Delivery Details" />

          {/* PICKUP CARD */}
          <View style={[styles.card, { borderColor: colors.accent }]}>
            <View style={styles.headerRow}>
              <Image source={BoxIcon} style={styles.icon} />
              <AccessibleText style={styles.cardTitle}>Pick Up Address:</AccessibleText>
              <TouchableOpacity>
                <Image source={BookmarkIcon} style={styles.bookmark} />
              </TouchableOpacity>
            </View>

            <AccessibleTextInput
              style={styles.input}
              placeholder="National Stadium"
            />

            <AccessibleText style={styles.label}>Name:</AccessibleText>
            <AccessibleTextInput style={styles.input} placeholder="Saad Imam" />

            <AccessibleText style={styles.label}>Mobile Num:</AccessibleText>
            <AccessibleTextInput style={styles.input} placeholder="03362584498" />
          </View>

          {/* DROPOFF CARD */}
          <View style={[styles.card, { borderColor: colors.accent }]}>
            <View style={styles.headerRow}>
              <Image source={HomeIcon} style={styles.icon} />
              <AccessibleText style={styles.cardTitle}>Drop Off Address:</AccessibleText>
              <TouchableOpacity>
                <Image source={BookmarkIcon} style={styles.bookmark} />
              </TouchableOpacity>
            </View>

            <AccessibleTextInput
              style={styles.input}
              placeholder="IBA, Main Entrance"
            />

            <AccessibleText style={styles.label}>Name:</AccessibleText>
            <AccessibleTextInput style={styles.input} placeholder="Hashir Ilyas" />

            <AccessibleText style={styles.label}>Mobile Num:</AccessibleText>
            <AccessibleTextInput style={styles.input} placeholder="03453672589" />
          </View>

        </ScrollView>
        {/* PARCEL DETAILS BUTTON */}
        <TouchableOpacity
          style={[styles.parcelButton, { borderColor: colors.accent }]}
          onPress={() => navigation.navigate("ParcelDetails")}
        >
          <AccessibleText style={styles.parcelText}>Parcel Details</AccessibleText>
          <AccessibleText style={styles.arrow}>›</AccessibleText>
        </TouchableOpacity>

      </View>

      {/* NEXT BUTTON */}
      <FloatingNextButton onPress={() => navigation.navigate("ParcelDetails")} />

    </View>
  );
};

export default DeliveryDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  sheet: {
    position: "absolute",
    top: "40%",        // HEIGHT OF SHEET START — exactly like your screenshot
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 10,
    zIndex: 5,
  },

  wrap: {
    padding: 20,
    paddingBottom: 100,
  },

  card: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 15,
    marginBottom: 25,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    width: 34,
    height: 34,
    marginRight: 10,
  },

  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },

  bookmark: {
    width: 24,
    height: 24,
    tintColor: "white",
  },

  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
  },

  input: {
    marginBottom: 8,
  },
parcelButton: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderWidth: 2,
  borderRadius: 14,
  paddingVertical: 16,
  paddingHorizontal: 20,
  marginTop: 10,
  marginBottom: 40,
},

parcelText: {
  fontSize: 18,
  fontWeight: "bold",
},

arrow: {
  fontSize: 28,
  fontWeight: "bold",
},
});

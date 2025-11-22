import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { WebView } from "react-native-webview";

import AccessibleText from "../Component/AccessibleText";
import SectionTitle from "../Component/SectionTitle";
import { useAccessibility } from "../context/AccessibilityContext";

import html_script from "./html_script";

// Dummy assets — replace with yours
import RiderPic from "../assets/user.png";
import BoxIcon from "../assets/box.png";

const SearchingRiderScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const { colors } = useAccessibility();

  const [count, setCount] = useState(124);

  return (
    <View style={styles.container}>
      {/* MAP BACKGROUND */}
      <WebView
        ref={mapRef}
        source={{ html: html_script }}
        style={styles.map}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={["*"]}
        mixedContentMode="always"
      />

      {/* RIDER CARD */}
      <View style={[styles.riderCard, { backgroundColor: colors.cardBackground }]}>
        <Image source={RiderPic} style={styles.riderPic} />

        <View style={{ flex: 1 }}>
          <AccessibleText style={styles.riderTime}>5 mins away</AccessibleText>
          <AccessibleText style={styles.riderName}>Asif Gul</AccessibleText>

          <View style={styles.ratingRow}>
            <AccessibleText style={styles.star}>⭐</AccessibleText>
            <AccessibleText style={styles.rating}>4.95</AccessibleText>
          </View>
        </View>

        {/* Accept */}
        <TouchableOpacity style={[styles.acceptButton, { backgroundColor: colors.accent }]}>
          <AccessibleText style={styles.acceptText}>Accept</AccessibleText>
        </TouchableOpacity>

        {/* Reject */}
        <TouchableOpacity style={styles.rejectButton}>
          <AccessibleText style={styles.rejectText}>Reject</AccessibleText>
        </TouchableOpacity>
      </View>

      {/* VIEWED COUNTER */}
      <View style={styles.viewedRow}>
        <AccessibleText style={styles.viewedText}>5 riders have viewed your request</AccessibleText>

        <View style={styles.dotsRow}>
          <View style={styles.dotActive} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      {/* BOTTOM SHEET */}
      <View style={[styles.sheet, { backgroundColor: colors.sheetBackground }]}>
        <ScrollView contentContainerStyle={styles.sheetWrap}>

          {/* Box Icon */}
          <View style={[styles.boxCircle, { borderColor: colors.accent }]}>
            <Image source={BoxIcon} style={styles.boxIcon} />
          </View>

          {/* COUNTER */}
          <View style={styles.counterRow}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setCount(prev => Math.max(1, prev - 1))}
            >
              <AccessibleText style={styles.counterBtnText}>-</AccessibleText>
            </TouchableOpacity>

            <AccessibleText style={styles.counterValue}>{count}</AccessibleText>

            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setCount(prev => prev + 1)}
            >
              <AccessibleText style={styles.counterBtnText}>+</AccessibleText>
            </TouchableOpacity>
          </View>

          {/* KEEP LOOKING */}
          <TouchableOpacity style={styles.keepLookingBtn}>
            <AccessibleText style={styles.keepLookingText}>KEEP LOOKING</AccessibleText>
          </TouchableOpacity>

          {/* CANCEL RIDE */}
          <TouchableOpacity style={styles.cancelButton}>
            <AccessibleText style={styles.cancelText}>CANCEL RIDE</AccessibleText>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </View>
  );
};

export default SearchingRiderScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  riderCard: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    borderRadius: 20,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 5,
  },

  riderPic: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginRight: 12,
  },

  riderTime: {
    fontSize: 18,
    fontWeight: "bold",
  },

  riderName: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  star: {
    fontSize: 16,
    marginRight: 4,
  },

  rating: {
    fontSize: 14,
  },

  acceptButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 8,
  },

  acceptText: {
    color: "white",
    fontWeight: "bold",
  },

  rejectButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#444",
    marginLeft: 8,
  },

  rejectText: {
    color: "white",
    fontWeight: "bold",
  },

  viewedRow: {
    position: "absolute",
    top: 150,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 5,
  },

  viewedText: {
    color: "white",
    fontSize: 13,
  },

  dotsRow: { flexDirection: "row" },

  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "white",
    marginHorizontal: 4,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#777",
    marginHorizontal: 4,
  },

  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "43%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 10,
  },

  sheetWrap: {
    padding: 20,
    alignItems: "center",
  },

  boxCircle: {
    width: 120,
    height: 120,
    borderWidth: 3,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  boxIcon: {
    width: 65,
    height: 65,
    tintColor: "white",
  },

  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  counterButton: {
    backgroundColor: "#555",
    padding: 16,
    borderRadius: 40,
  },

  counterBtnText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },

  counterValue: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 20,
  },

  keepLookingBtn: {
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 15,
  },

  keepLookingText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },

  cancelButton: {
    backgroundColor: "#c62828",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  cancelText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

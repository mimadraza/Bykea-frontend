import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Animated } from "react-native";
import { WebView } from "react-native-webview";
import AccessibleText from "../Component/AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext";
import html_script from "./html_script";


/* ---------------- INITIAL RIDERS ---------------- */
const initialRiders = [
  {
    id: 1,
    name: "Asif Gul",
    time: "5 mins away",
    rating: 4.95,
    avatar: require("../assets/user.png"),
  },
  {
    id: 2,
    name: "Fahad Khan",
    time: "3 mins away",
    rating: 4.88,
    avatar: require("../assets/user.png"),
  },
  {
    id: 3,
    name: "Umair Ali",
    time: "7 mins away",
    rating: 4.99,
    avatar: require("../assets/user.png"),
  },
];

/* ---------------- LIVE INCOMING RIDERS ---------------- */
const riderFeed = [
  {
    id: 4,
    name: "Rehan Ahmed",
    time: "4 mins away",
    rating: 4.82,
    avatar: require("../assets/user.png"),
  },
  {
    id: 5,
    name: "Talha Javed",
    time: "6 mins away",
    rating: 4.90,
    avatar: require("../assets/user.png"),
  },
  {
    id: 6,
    name: "Moiz Khan",
    time: "8 mins away",
    rating: 4.78,
    avatar: require("../assets/user.png"),
  },
];

const SearchingRiderScreen = ({ navigation }) => {
  const { colors, borderWidth } = useAccessibility();
  const mapRef = useRef(null);
  const [riders, setRiders] = useState(initialRiders);
  const [incomingRiders, setIncomingRiders] = useState(riderFeed);
  const [current, setCurrent] = useState(initialRiders[0]);
  const fadeAnim = useRef(new Animated.Value(1)).current;



  /* ---------------- FADE HELPERS ---------------- */
  const fadeOutIn = (callback: Function) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      callback();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  /* ---------------- REJECT RIDER ---------------- */
  const rejectRider = () => {
    fadeOutIn(() => {
      if (riders.length <= 1) {
        setRiders([]);
        setCurrent(null);
        return;
      }

      const newList = riders.slice(1);
      setRiders(newList);
      setCurrent(newList[0]);
    });
  };

  /* ---------------- AUTO-CYCLE EVERY 8s ---------------- */
  useEffect(() => {
    let timer: any = null;

    if (current) {
      timer = setInterval(() => {
        rejectRider();
      }, 8000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [current, riders]);

  /* ---------------- AUTO-SPAWN NEW RIDERS EVERY 5s ---------------- */
  useEffect(() => {
    let spawnTimer: any = null;

    if (incomingRiders.length > 0) {
      spawnTimer = setInterval(() => {
        const next = incomingRiders[0];
        const rest = incomingRiders.slice(1);

        setIncomingRiders(rest);

        setRiders((prev) => {
          const updated = [...prev, next];
          if (!current) setCurrent(next);
          return updated;
        });
      }, 5000);
    }

    return () => {
      if (spawnTimer) clearInterval(spawnTimer);
    };
  }, [incomingRiders, current]);

   return (
      <View style={styles.container}>
        <WebView ref={mapRef} source={{ html: html_script }} javaScriptEnabled style={styles.map} />

        {current && (
          <Animated.View
            style={[
              styles.riderCard,
              {
                opacity: fadeAnim,
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                borderWidth: borderWidth
              },
            ]}
          >
            <Image source={current.avatar} style={styles.riderPic} />
            <View style={{ flex: 1 }}>
              <AccessibleText style={styles.time}>{current.time}</AccessibleText>
              <AccessibleText style={styles.name}>{current.name}</AccessibleText>
              <View style={styles.ratingRow}>
                <AccessibleText style={styles.star}>⭐</AccessibleText>
                <AccessibleText style={styles.rating}>{current.rating}</AccessibleText>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.acceptBtn, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate("RideInProgress")}
            >
              <AccessibleText style={styles.acceptText}>Accept</AccessibleText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rejectBtn, { backgroundColor: colors.surface, borderWidth: borderWidth, borderColor: colors.border }]}
              onPress={rejectRider}
            >
              <AccessibleText style={styles.rejectText}>Reject</AccessibleText>
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={[styles.sheet, { backgroundColor: colors.sheetBackground }]}>
          <ScrollView contentContainerStyle={styles.wrap}>
            <View style={[styles.boxCircle, { borderColor: colors.primary }]}>
              <Image source={require("../assets/box.png")} style={[styles.boxIcon, { tintColor: colors.text }]} />
            </View>

            <View style={styles.counterRow}>
              <TouchableOpacity style={[styles.counterBtn, { backgroundColor: colors.surface }]}>
                <AccessibleText style={styles.counterBtnText}>-</AccessibleText>
              </TouchableOpacity>
              <AccessibleText style={styles.counterValue}>124</AccessibleText>
              <TouchableOpacity style={[styles.counterBtn, { backgroundColor: colors.surface }]}>
                <AccessibleText style={styles.counterBtnText}>+</AccessibleText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.keepBtn, { backgroundColor: colors.surface }]}>
              <AccessibleText style={styles.keepText}>KEEP LOOKING</AccessibleText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn}>
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
    map: { position: "absolute", width: "100%", height: "100%" },
    riderCard: {
      position: "absolute", top: 60, left: 20, right: 20,
      borderRadius: 20, padding: 12, flexDirection: "row", alignItems: "center", zIndex: 10,
    },
    riderPic: { width: 55, height: 55, borderRadius: 50, marginRight: 12 },
    time: { fontSize: 18, fontWeight: "bold" },
    name: { fontSize: 14, opacity: 0.8, marginBottom: 4 },
    ratingRow: { flexDirection: "row", alignItems: "center" },
    star: { fontSize: 16, marginRight: 4 },
    rating: { fontSize: 14 },
    acceptBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginLeft: 8 },
    acceptText: { color: "#1A1A1A", fontWeight: "bold" },
    rejectBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginLeft: 8 },
    rejectText: { fontWeight: "bold" },
    sheet: { position: "absolute", bottom: 0, width: "100%", height: "44%", borderTopLeftRadius: 30, borderTopRightRadius: 30, zIndex: 5 },
    wrap: { padding: 20, alignItems: "center" },
    boxCircle: { width: 120, height: 120, borderWidth: 3, borderRadius: 100, justifyContent: "center", alignItems: "center", marginBottom: 20 },
    boxIcon: { width: 65, height: 65 },
    counterRow: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
    counterBtn: { padding: 16, borderRadius: 40 },
    counterBtnText: { fontSize: 30, fontWeight: "bold" },
    counterValue: { fontSize: 38, fontWeight: "bold", marginHorizontal: 20 },
    keepBtn: { paddingVertical: 16, width: "100%", borderRadius: 14, alignItems: "center", marginBottom: 15 },
    keepText: { fontWeight: "bold" },
    cancelBtn: { backgroundColor: "#c62828", paddingVertical: 16, width: "100%", borderRadius: 14, alignItems: "center" },
    cancelText: { color: "white", fontWeight: "bold" },
  });
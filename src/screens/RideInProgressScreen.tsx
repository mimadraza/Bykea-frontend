import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { WebView } from "react-native-webview";
import html_script from "./html_script";

import TopBar from "../Component/TopBar";
import AccessibleText from "../Component/AccessibleText";

import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const RideInProgressScreen: React.FC = () => {
  const mapRef = useRef<WebView>(null);
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();
  const { colors } = useAccessibility();

  const route = useRoute();
  const { destination } = route.params || {};

  const { driver, from, start, end, geometry } = route.params as {
    driver: { name: string; rating: number };
    from?: string;
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
    geometry: { lat: number; lng: number }[];
  };

  const [rideFinished, setRideFinished] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

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

    setTimeout(() => {
      mapRef.current?.postMessage(
        JSON.stringify({
          type: "animateRoute",
        })
      );
    }, 600);
  };

  const handleCancel = () => {
    if (from) {
      navigation.replace("ChooseRide", { destination: "" });
      return;
    }

    navigation.navigate("ChooseRide", { destination: "" });
  };

  const submitFeedback = () => {
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);
    navigation.navigate("Home", { destination: "" });
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={mapRef}
        source={{ html: html_script }}
        style={styles.map}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={["*"]}
        mixedContentMode="always"
        onLoadEnd={sendRouteToMap}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.type === "rideFinished") {
            setRideFinished(true);
          }
        }}
      />

      <TopBar onMenuPress={() => console.log("Menu")} />

      <View style={styles.bottomCard}>
        {rideFinished ? (
          <>
            <AccessibleText style={styles.finishedTitle}>Ride Finished</AccessibleText>

            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <AccessibleText
                    style={{
                      fontSize: 32,
                      color: rating >= star ? "#FFD700" : "#555",
                      marginHorizontal: 4,
                    }}
                  >
                    ★
                  </AccessibleText>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              value={feedback}
              onChangeText={setFeedback}
              placeholder="Leave your feedback..."
              placeholderTextColor="#888"
              multiline
              style={styles.feedbackBox}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={submitFeedback}>
              <AccessibleText style={styles.submitText}>Submit</AccessibleText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.driverRow}>
              <Image source={require("../assets/user.png")} style={styles.driverImg} />

              <View style={{ flex: 1 }}>
                <AccessibleText style={styles.statusText}>{t("status_on_way")}</AccessibleText>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AccessibleText style={styles.driverName}>{driver.name}</AccessibleText>
                  <AccessibleText style={styles.star}>⭐ {driver.rating}</AccessibleText>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <AccessibleText style={styles.cancelText}>{t("cancel_ride_btn")}</AccessibleText>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default RideInProgressScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  bottomCard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    paddingTop: 30,
    backgroundColor: "#25282B",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 50,
  },

  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2124",
    padding: 14,
    borderRadius: 18,
    marginBottom: 20,
  },

  driverImg: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 14,
  },

  statusText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  driverName: {
    color: "#ddd",
    fontSize: 14,
  },

  star: {
    color: "#FFD700",
    fontWeight: "700",
    marginLeft: 6,
  },

  cancelBtn: {
    backgroundColor: "#D62828",
    paddingVertical: 16,
    borderRadius: 12,
  },

  cancelText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },

  finishedTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
  },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  feedbackBox: {
    backgroundColor: "#1F2124",
    color: "white",
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },

  submitBtn: {
    backgroundColor: "#3DFF73",
    paddingVertical: 16,
    borderRadius: 12,
  },

  submitText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "800",
    fontSize: 16,
  },
});

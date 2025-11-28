import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAccessibility } from "../context/AccessibilityContext";

import Logo from "../Component/Logo"; // your actual RN logo component

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const { width } = Dimensions.get("window");

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useAccessibility();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Auth");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* HERO IMAGE */}
      <View style={styles.heroWrapper}>
        <Image
          source={{
            uri:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAPznTvKqgc4Ec-e-gGBeyiTDDbdvvY8_VqRZ4dsekpzd49n5Rg04SEyQ0LuqujcbUQHGwKarxdACdr8LyExHBEhJQh_mP6sdbT4u3H9ECt2zzInkVbQG-MMn5om2uM2tdIcBH0Uvl-DWW06qzR3V0O36xKOipcOfU1YU8g5bYdgBcnD4qzsHS4cf3cRS_pkwLFmDG-tympCDYOD2bMaNXKqDtLtWD0LB3Ddb2dEbBXcKfV_-KJaNwdg5lBQAuABf9VGFpt6hXYOAOj",
          }}
          style={styles.heroImage}
          resizeMode="cover"
          accessible
          accessibilityLabel="City illustration showing a scooter rider"
        />

        {/* GRADIENT MASK TO MATCH HTML */}
        <LinearGradient
          colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
          start={{ x: 0.5, y: 0.3 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientMask}
          pointerEvents="none"
        />
      </View>

      {/* LOGO + HEADINGS */}
      <View style={styles.centerContent}>
        <View style={styles.logoWrapper}>
          <Logo size={64} accessibilityLabel="Bykea App Logo" />
        </View>

        <Text style={[styles.headline, { color: "#fff" }]}>
          Your City, Your Ride
        </Text>

        <Text style={[styles.body, { color: "rgba(255,255,255,0.8)" }]}>
          Rides, Deliveries, and More.
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const HERO_HEIGHT = Dimensions.get("window").height * 0.60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  heroWrapper: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: HERO_HEIGHT,
    overflow: "hidden",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  gradientMask: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: HERO_HEIGHT * 0.5,
  },

  centerContent: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  logoWrapper: {
    marginBottom: 24,
  },

  headline: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 36,
    marginTop: 16,
  },

  body: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 8,
  },
});

import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Logo from "../Component/Logo";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;
const { height } = Dimensions.get("window");

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const phone = await AsyncStorage.getItem("LOGGED_IN_USER");

      navigation.reset({
        index: 0,
        routes: [{ name: phone ? "Home" : "Auth" }],
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-150..." }}
        style={styles.heroImage}
      />

      <LinearGradient
        colors={["rgba(0,0,0,1)", "transparent"]}
        style={styles.gradientMask}
      />

      <View style={styles.centerContent}>
        <Logo size={64} />
        <Text style={styles.headline}>Your City, Your Ride</Text>
        <Text style={styles.body}>Rides, Deliveries, and More.</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  heroImage: {
    width: "100%",
    height: height * 0.55,
    position: "absolute",
    top: 0,
  },
  gradientMask: {
    position: "absolute",
    height: height * 0.35,
    bottom: height * 0.45,
    width: "100%",
  },
  centerContent: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  },
  headline: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 20,
  },
  body: { color: "#ccc", fontSize: 15, marginTop: 6 },
});

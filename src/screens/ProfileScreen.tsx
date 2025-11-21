// src/screens/ProfileScreen.tsx
import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AccessibleText from "../Component/AccessibleText";
type NavProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <AccessibleText style={styles.title}>Profile</AccessibleText>

        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }} // SAFE placeholder avatar
            style={styles.avatar}
          />
        </View>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <AccessibleText style={styles.star}>⭐</AccessibleText>
          <AccessibleText style={styles.rating}>4.95</AccessibleText>
        </View>

        {/* Menu Items */}
        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => navigation.navigate("PersonalInfo")}
        >
          <AccessibleText style={styles.MenuText}>Personal Information</AccessibleText>
          <AccessibleText style={styles.menuIcon}>📄</AccessibleText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => navigation.navigate("SavedPlaces")}
        >
          <AccessibleText style={styles.menuText}>Saved Places</AccessibleText>
          <AccessibleText style={styles.menuIcon}>📍</AccessibleText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRow}>
          <AccessibleText style={styles.menuText}>Download Data</AccessibleText>
          <AccessibleText style={styles.menuIcon}>💾</AccessibleText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "88%",
    height: "88%",
    backgroundColor: "#2C333D",
    borderRadius: 40,
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#3dff73",
    marginTop: 10,
    marginBottom: 20,
  },

  avatarWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#1F2124",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#3dff73",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },

  star: {
    fontSize: 20,
    marginRight: 6,
  },

  rating: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },

  menuRow: {
    width: "100%",
    backgroundColor: "#1F2124",
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  menuText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  menuIcon: {
    fontSize: 20,
    color: "white",
  },
});

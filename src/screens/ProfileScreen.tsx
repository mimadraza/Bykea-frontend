// src/screens/ProfileScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>

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
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.rating}>4.95</Text>
        </View>

        {/* Menu Items */}
        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => navigation.navigate("PersonalInfo")}
        >
          <Text style={styles.menuText}>Personal Information</Text>
          <Text style={styles.menuIcon}>📄</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => navigation.navigate("SavedPlaces")}
        >
          <Text style={styles.menuText}>Saved Places</Text>
          <Text style={styles.menuIcon}>📍</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRow}>
          <Text style={styles.menuText}>Download Data</Text>
          <Text style={styles.menuIcon}>💾</Text>
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

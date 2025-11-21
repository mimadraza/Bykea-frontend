import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AccessibleText from "./AccessibleText"; // Import your wrapper
type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface SidebarProps {
  slideAnim: Animated.Value;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ slideAnim, onClose }) => {
  const navigation = useNavigation<NavProp>();

  return (
    <>
      {/* DARK OVERLAY */}
      <TouchableOpacity style={styles.overlay} onPress={onClose} />

      {/* SIDEBAR PANEL */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <AccessibleText style={styles.sidebarTitle}>Saad Imam</AccessibleText>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <AccessibleText style={styles.sidebarItem}>Profile</AccessibleText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("RideHistory")}>
          <AccessibleText style={styles.sidebarItem}>Booking History</AccessibleText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Accessibility")}>
          <AccessibleText style={styles.sidebarItem}>Settings</AccessibleText>
        </TouchableOpacity>

        <AccessibleText style={styles.sidebarItem}>Legal</AccessibleText>
        <AccessibleText style={styles.sidebarItem}>Accessibility</AccessibleText>

        <TouchableOpacity style={styles.logoutBtn}>
          <AccessibleText style={styles.logoutAccessibleText}>Logout</AccessibleText>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 40,
  },

  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 260,
    backgroundColor: "rgba(20,20,20,0.95)",
    paddingTop: 70,
    paddingHorizontal: 20,
    zIndex: 50,
  },

  sidebarTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },

  sidebarItem: {
    color: "#ddd",
    fontSize: 17,
    marginVertical: 10,
  },

  logoutBtn: {
    marginTop: 40,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#ff4444",
  },

  logoutText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
});

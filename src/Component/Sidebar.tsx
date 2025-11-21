import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

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
        <Text style={styles.sidebarTitle}>Saad Imam</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.sidebarItem}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("RideHistory")}>
          <Text style={styles.sidebarItem}>Booking History</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Accessibility")}>
          <Text style={styles.sidebarItem}>Settings</Text>
        </TouchableOpacity>

        <Text style={styles.sidebarItem}>Legal</Text>
        <Text style={styles.sidebarItem}>Accessibility</Text>

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
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

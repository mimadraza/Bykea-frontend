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
import AccessibleText from "./AccessibleText";
import { useTranslation } from "react-i18next"; // 1. Import this

type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface SidebarProps {
  slideAnim: Animated.Value;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ slideAnim, onClose }) => {
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation(); // 2. Get the translate function

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
        <AccessibleText style={styles.sidebarTitle}>{t("user_name")}</AccessibleText>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <AccessibleText style={styles.sidebarItem}>{t("sidebar_profile")}</AccessibleText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("RideHistory")}>
          <AccessibleText style={styles.sidebarItem}>{t("sidebar_history")}</AccessibleText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Accessibility")}>
          <AccessibleText style={styles.sidebarItem}>{t("sidebar_accessibility")}</AccessibleText>
        </TouchableOpacity>

        <AccessibleText style={styles.sidebarItem}>{t("sidebar_legal")}</AccessibleText>
        <AccessibleText style={styles.sidebarItem}>{t("sidebar_settings")}</AccessibleText>

        <TouchableOpacity style={styles.logoutBtn}>
          <AccessibleText style={styles.logoutText}>{t("sidebar_logout")}</AccessibleText>
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
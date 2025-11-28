import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

import AccessibleText from "./AccessibleText";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface SidebarProps {
  slideAnim: Animated.Value;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ slideAnim, onClose }) => {
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();
  const { colors, borderWidth } = useAccessibility();

  return (
    <>
      {/* OVERLAY */}
      <TouchableOpacity style={styles.overlay} onPress={onClose} />

      {/* SIDEBAR */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
            backgroundColor: colors.background,
            borderRightWidth: borderWidth,
            borderColor: colors.border,
          },
        ]}
      >
        {/* HEADER SECTION */}
        <View style={styles.header}>
          <Image
            source={{
              uri:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAkSP1DOTH48-GTn-1xJWqoW4axymhlNvTaGYWFySWrPCKVp0HLFu-xZT5JEUD-ap107K9KvJzdz-LBmO96TiC3sS9prKScSaENDKwfVd3-_q34_aM86YxJnyBk1QjwvFUF19hEw_MCM4A-7Ofcs682JpkjdqbCLXb6ipP3pG1KhbyrjceJgdjI_8P_WGngMzgmtF-88CV6K8_4EMKTy_WE97OWhKfE5Fk_ZKeyAegnQjfHZbJn1L5SwQ9kd_e0p5gJL_cukCIoGkWr",
            }}
            style={styles.avatar}
          />

          <View>
            <AccessibleText style={styles.name}>Saad Imam</AccessibleText>

            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate("Profile");
              }}
            >
              <AccessibleText style={styles.viewProfile}>
                View Profile
              </AccessibleText>
            </TouchableOpacity>
          </View>

        </View>

        {/* MENU LIST */}
        <View style={styles.menuSection}>
          {/* Ride History - ACTIVE */}
          <TouchableOpacity
            style={[styles.menuItem, styles.activeItem]}
            onPress={() => navigation.navigate("RideHistory")}
          >
            <AccessibleText style={[styles.menuIcon, styles.activeIcon]}>🚲</AccessibleText>
            <AccessibleText style={[styles.menuLabel, styles.activeLabel]}>
              Ride History
            </AccessibleText>
          </TouchableOpacity>

          {/* Delivery History */}
          <TouchableOpacity style={styles.menuItem}>
            <AccessibleText style={styles.menuIcon}>📦</AccessibleText>
            <AccessibleText style={styles.menuLabel}>Delivery History</AccessibleText>
          </TouchableOpacity>

          {/* Payment Methods */}
          <TouchableOpacity style={styles.menuItem}>
            <AccessibleText style={styles.menuIcon}>💳</AccessibleText>
            <AccessibleText style={styles.menuLabel}>Payment Methods</AccessibleText>
          </TouchableOpacity>

          {/* Promotions */}
          <TouchableOpacity style={styles.menuItem}>
            <AccessibleText style={styles.menuIcon}>🏷️</AccessibleText>
            <AccessibleText style={styles.menuLabel}>Promotions</AccessibleText>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        {/* SECOND SECTION */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <AccessibleText style={styles.menuIcon}>❓</AccessibleText>
            <AccessibleText style={styles.menuLabel}>Help & Support</AccessibleText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Accessibility")} >
            <AccessibleText style={styles.menuIcon}>⚙️</AccessibleText>
            <AccessibleText style={styles.menuLabel}>Settings</AccessibleText>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.menuItem}>
            <AccessibleText style={styles.menuIcon}>↩️</AccessibleText>
            <AccessibleText style={styles.menuLabel}>Logout</AccessibleText>
          </TouchableOpacity>

          <AccessibleText style={styles.version}>v3.14.2</AccessibleText>
        </View>
      </Animated.View>
    </>
  );
};

export default Sidebar;

/* ============================
   STYLES
============================ */

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 40,
  },

  sidebar: {
    position: "absolute",
    top: 0, bottom: 0, left: 0,
    width: "75%",
    maxWidth: 300,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20,
    zIndex: 50,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 30,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 999,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  viewProfile: {
    fontSize: 14,
    color: "#0df259",
    marginTop: 2,
  },

  /* MENU LIST */
  menuSection: {
    marginBottom: 20,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 6,
  },

  menuIcon: {
    fontSize: 20,
    width: 28,
    color: "#ccc",
  },

  menuLabel: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },

  /* ACTIVE ITEM */
  activeItem: {
    backgroundColor: "rgba(13, 242, 89, 0.15)",
  },
  activeIcon: {
    color: "#0df259",
  },
  activeLabel: {
    color: "#0df259",
    fontWeight: "700",
  },

  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#333",
    marginVertical: 20,
  },

  footer: {
    marginTop: "auto",
    alignItems: "flex-start",
  },

  version: {
    marginTop: 10,
    fontSize: 12,
    color: "#666",
    alignSelf: "center",
  },
});

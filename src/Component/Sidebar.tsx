import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

import AccessibleText from "./AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext";

import { logout, loadUsers, getLoggedInUser } from "../backend/authBackend";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface SidebarProps {
  slideAnim: Animated.Value;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ slideAnim, onClose }) => {
  const navigation = useNavigation<NavProp>();
  const { colors, borderWidth } = useAccessibility();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const phone = await getLoggedInUser();    // returns logged-in phone
      if (!phone) return;

      const users = await loadUsers();
      const found = users.find((u: any) => u.phone === phone);
      setUser(found);
    })();
  }, []);

  return (
    <>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />

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
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://placekitten.com/200/200" }}
            style={styles.avatar}
          />

          <View>
            <AccessibleText style={styles.name}>
              {user?.name || "User"}
            </AccessibleText>

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

        {/* MENU */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={[styles.menuItem, styles.activeItem]}
            onPress={() => navigation.navigate("RideHistory")}
          >
            <AccessibleText style={[styles.menuIcon, styles.activeIcon]}>
              🚲
            </AccessibleText>
            <AccessibleText style={[styles.menuLabel, styles.activeLabel]}>
              Ride History
            </AccessibleText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <AccessibleText style={styles.menuIcon}>📦</AccessibleText>
            <AccessibleText style={styles.menuLabel}>
              Delivery History
            </AccessibleText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <AccessibleText style={styles.menuIcon}>💳</AccessibleText>
            <AccessibleText style={styles.menuLabel}>
              Payment Methods
            </AccessibleText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <AccessibleText style={styles.menuIcon}>🏷️</AccessibleText>
            <AccessibleText style={styles.menuLabel}>
              Promotions
            </AccessibleText>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        {/* SECOND SECTION */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <AccessibleText style={styles.menuIcon}>❓</AccessibleText>
            <AccessibleText style={styles.menuLabel}>
              Help & Support
            </AccessibleText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Accessibility")}
          >
            <AccessibleText style={styles.menuIcon}>⚙️</AccessibleText>
            <AccessibleText style={styles.menuLabel}>Settings</AccessibleText>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={async () => {
              await logout();
              onClose();

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Auth" }],
                })
              );
            }}
          >
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
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 40,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "75%",
    maxWidth: 300,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20,
    zIndex: 50,
  },
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
  menuSection: { marginBottom: 20 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 6,
  },
  menuIcon: { fontSize: 20, width: 28, color: "#ccc" },
  menuLabel: { fontSize: 16, color: "white", fontWeight: "500" },
  activeItem: { backgroundColor: "rgba(13,242,89,0.15)" },
  activeIcon: { color: "#0df259" },
  activeLabel: { color: "#0df259", fontWeight: "700" },
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#333",
    marginVertical: 20,
  },
  footer: { marginTop: "auto", alignItems: "flex-start" },
  version: {
    marginTop: 10,
    fontSize: 12,
    color: "#666",
    alignSelf: "center",
  },
});

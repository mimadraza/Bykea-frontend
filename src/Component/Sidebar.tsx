import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  I18nManager,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

import AccessibleText from "./AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext";
import { useTranslation } from "react-i18next";

import { logout, loadUsers, getLoggedInUser } from "../backend/authBackend";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface SidebarProps {
  slideAnim: Animated.Value;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ slideAnim, onClose }) => {
  const navigation = useNavigation<NavProp>();
  const { colors, borderWidth } = useAccessibility();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const phone = await getLoggedInUser();
      if (!phone) return;

      const users = await loadUsers();
      const found = users.find((u: any) => u.phone === phone);
      setUser(found);
    })();
  }, []);

  return (
    <>
      {/* OVERLAY */}
      <TouchableOpacity style={styles.overlay} onPress={onClose} />

      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
            backgroundColor: colors.surface,
            borderRightWidth: borderWidth,
            borderColor: colors.border,
          },
        ]}
      >
        {/* HEADER */}
        <View style={[styles.header, isRTL && { flexDirection: "row-reverse" }]}>
          <Image
            source={{
              uri:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAkSP1DOTH48-GTn-1xJWqoW4axymhlNvTaGYWFySWrPCKVp0HLFu-xZT5JEUD-ap107K9KvJzdz-LBmO96TiC3sS9prKScSaENDKwfVd3-_q34_aM86YxJnyBk1QjwvFUF19hEw_MCM4A-7Ofcs682JpkjdqbCLXb6ipP3pG1KhbyrjceJgdjI_8P_WGngMzgmtF-88CV6K8_4EMKTy_WE97OWhKfE5Fk_ZKeyAegnQjfHZbJn1L5SwQ9kd_e0p5gJL_cukCIoGkWr",
            }}
            style={[
              styles.avatar,
              { backgroundColor: colors.cardBackground },
            ]}
            resizeMode="cover"
          />
          <View>
            <AccessibleText style={[styles.name, { color: colors.text }]}>
              {user?.name || t("sidebar_user")}
            </AccessibleText>

            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate("Profile");
              }}
            >
              <AccessibleText style={[styles.viewProfile, { color: colors.primary }]}>
                {t("sidebar_view_profile")}
              </AccessibleText>
            </TouchableOpacity>
          </View>
        </View>

        {/* MENU SECTION 1 */}
        <View style={styles.menuSection}>
          {/* Ride History */}
          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                borderWidth: borderWidth,
              },
              isRTL && styles.rtlRow,
            ]}
            onPress={() => navigation.navigate("RideHistory")}
          >
            <AccessibleText style={[styles.menuIcon, { color: colors.primary }]}>
              🚲
            </AccessibleText>
            <AccessibleText style={[styles.menuLabel, { color: colors.text }]}>
              {t("sidebar_ride_history")}
            </AccessibleText>
          </TouchableOpacity>

          {/* Delivery History */}
          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: borderWidth,
              },
              isRTL && styles.rtlRow,
            ]}
          >
            <AccessibleText style={[styles.menuIcon, { color: colors.text }]}>
              📦
            </AccessibleText>
            <AccessibleText style={[styles.menuLabel, { color: colors.text }]}>
              {t("sidebar_delivery_history")}
            </AccessibleText>
          </TouchableOpacity>

          {/* Payment Methods */}
          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: borderWidth,
              },
              isRTL && styles.rtlRow,
            ]}
          >
            <AccessibleText style={[styles.menuIcon, { color: colors.text }]}>
              💳
            </AccessibleText>
            <AccessibleText style={[styles.menuLabel, { color: colors.text }]}>
              {t("sidebar_payment_methods")}
            </AccessibleText>
          </TouchableOpacity>

          {/* Promotions */}
          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: borderWidth,
              },
              isRTL && styles.rtlRow,
            ]}
          >
            <AccessibleText style={[styles.menuIcon, { color: colors.text }]}>
              🏷️
            </AccessibleText>
            <AccessibleText style={[styles.menuLabel, { color: colors.text }]}>
              {t("sidebar_promotions")}
            </AccessibleText>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.separator,
            { borderBottomColor: colors.border, borderBottomWidth: borderWidth },
          ]}
        />

        {/* MENU SECTION 2 */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: borderWidth,
              },
              isRTL && styles.rtlRow,
            ]}
            onPress={() => navigation.navigate("Helpline")}
          >
            <AccessibleText style={[styles.menuIcon, { color: colors.text }]}>
              ❓
            </AccessibleText>
            <AccessibleText style={[styles.menuLabel, { color: colors.text }]}>
              {t("sidebar_help_support")}
            </AccessibleText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: borderWidth,
              },
              isRTL && styles.rtlRow,
            ]}
            onPress={() => navigation.navigate("Accessibility")}
          >
            <AccessibleText style={[styles.menuIcon, { color: colors.text }]}>
              ⚙️
            </AccessibleText>
            <AccessibleText style={[styles.menuLabel, { color: colors.text }]}>
              {t("sidebar_settings")}
            </AccessibleText>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.menuItem, isRTL && styles.rtlRow]}
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
            <AccessibleText style={[styles.menuIcon, { color: colors.text }]}>
              ↩️
            </AccessibleText>
            <AccessibleText style={[styles.menuLabel, { color: colors.text }]}>
              {t("sidebar_logout")}
            </AccessibleText>
          </TouchableOpacity>

          <AccessibleText style={[styles.version, { color: colors.textSecondary }]}>
            v3.14.2
          </AccessibleText>
        </View>
      </Animated.View>
    </>
  );
};

export default Sidebar;

/* ----------------------------
   STYLES
---------------------------- */
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

  rtlRow: {
    flexDirection: "row-reverse",
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 999,
    overflow: "hidden",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
  },

  viewProfile: {
    fontSize: 14,
    marginTop: 2,
  },

  menuSection: {
    marginBottom: 20,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 6,
  },

  menuIcon: {
    fontSize: 20,
    width: 28,
  },

  menuLabel: {
    fontSize: 16,
    fontWeight: "500",
  },

  separator: {
    marginVertical: 20,
  },

  footer: {
    marginTop: "auto",
    alignItems: "flex-start",
  },

  version: {
    marginTop: 10,
    fontSize: 12,
    alignSelf: "center",
  },
});

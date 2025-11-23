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
import { useTranslation } from "react-i18next"; // Import this
import { useAccessibility } from "../context/AccessibilityContext";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation(); // Get the translate function
    const { colors, borderWidth } = useAccessibility();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[
              styles.card,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                borderWidth: borderWidth
              }
            ]}>
        <AccessibleText style={styles.title}>{t("profile_title")}</AccessibleText>

        {/* Avatar */}
         <View style={[styles.avatarWrapper, { backgroundColor: colors.background, borderColor: colors.primary }]}>
                  <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} style={styles.avatar} />
                </View>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <AccessibleText style={styles.star}>⭐</AccessibleText>
          <AccessibleText style={styles.rating}>4.95</AccessibleText>
        </View>

        {/* Menu Items */}
        <TouchableOpacity
          style={[styles.menuRow, { backgroundColor: colors.surface }]}
          onPress={() => navigation.navigate("PersonalInfo")}
        >
          <AccessibleText style={styles.menuText}>{t("personal_info_menu")}</AccessibleText>
          <AccessibleText style={styles.menuIcon}>📄</AccessibleText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuRow, { backgroundColor: colors.surface }]}
          onPress={() => navigation.navigate("SavedPlaces")}
        >
          <AccessibleText style={styles.menuText}>{t("saved_places_menu")}</AccessibleText>
          <AccessibleText style={styles.menuIcon}>📍</AccessibleText>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuRow, { backgroundColor: colors.surface }]}>
          <AccessibleText style={styles.menuText}>{t("download_data_menu")}</AccessibleText>
          <AccessibleText style={styles.menuIcon}>💾</AccessibleText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { width: "88%", height: "88%", borderRadius: 40, padding: 20, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "700", marginTop: 10, marginBottom: 20 },
  avatarWrapper: { width: 90, height: 90, borderRadius: 45, justifyContent: "center", alignItems: "center", borderWidth: 3 },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 25 },
  star: { fontSize: 20, marginRight: 6 },
  rating: { fontSize: 18, fontWeight: "600" },
  menuRow: { width: "100%", padding: 14, borderRadius: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  menuText: { fontSize: 16, fontWeight: "600" },
  menuIcon: { fontSize: 20 },
});
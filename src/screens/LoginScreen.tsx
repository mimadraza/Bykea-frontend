import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import { RootStackParamList } from "../navigation/AppNavigator";

import Logo from "../Component/Logo";
import AccessibleText from "../Component/AccessibleText";
import AccessibleTextInput from "../Component/AccessibleTextInput";
import { useAccessibility } from "../context/AccessibilityContext"; // Import hook

type NavProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();
  const { colors } = useAccessibility(); // Get colors
  const [phone, setPhone] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Logo size={40} style={{ textAlign: "center", marginBottom: 60 }} />

      <AccessibleText style={styles.label}>{t("phone_label")}</AccessibleText>

      <AccessibleTextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        keyboardType="phone-pad"
        placeholder="0333229781"
        value={phone}
        onChangeText={setPhone}
        placeholderTextColor={colors.textSecondary}
      />

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: colors.primary,
            shadowColor: colors.primary, // Use primary for shadow
          },
        ]}
        onPress={() => navigation.navigate("OTP")}
      >
        <AccessibleText style={styles.buttonText}>{t("login_btn")}</AccessibleText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#1F242C", // Removed hardcoded color
    paddingHorizontal: 30,
    paddingTop: 80,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "white", // Handled by AccessibleText default
    marginBottom: 10,
  },

  input: {
    width: "100%",
    fontSize: 26,
    paddingVertical: 14,
    paddingHorizontal: 20,
    // backgroundColor: "#000", // Removed hardcoded color
    borderRadius: 12,
    // color: "white", // Removed hardcoded color
    marginBottom: 20,
    borderWidth: 2,
    // borderColor: "#1A1A1A", // Removed hardcoded color
  },

  button: {
    // backgroundColor: "#2ECC71", // Removed hardcoded color
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    // shadowColor: "#2ECC71", // Removed hardcoded color
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A", // Keeping dark for contrast against primary
  },
});
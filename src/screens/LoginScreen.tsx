import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next"; // Import this

import { RootStackParamList } from "../navigation/AppNavigator";

import Logo from "../Component/Logo";
import AccessibleText from "../Component/AccessibleText";
import AccessibleTextInput from "../Component/AccessibleTextInput";
type NavProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation(); // Get the translate function
  const [phone, setPhone] = useState("");

  return (
    <View style={styles.container}>
      <Logo size={40} style={{ textAlign: "center", marginBottom: 60 }} />

      <AccessibleText style={styles.label}>{t("phone_label")}</AccessibleText>

      <AccessibleTextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="0333229781"
        value={phone}
        onChangeText={setPhone}
        placeholderTextColor="#666"
      />

      <TouchableOpacity
        style={styles.button}
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
    backgroundColor: "#1F242C",
    paddingHorizontal: 30,
    paddingTop: 80,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  input: {
    width: "100%",
    fontSize: 26,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderRadius: 12,
    color: "white",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#1A1A1A",
  },

  button: {
    backgroundColor: "#2ECC71",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#2ECC71",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
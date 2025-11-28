import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import { useAccessibility } from "../context/AccessibilityContext";
import Logo from "../Component/Logo"; // your real logo component

type AuthMode = "phone" | "otp" | "register";

const AuthScreen = ({ navigation }) => {
  const { colors } = useAccessibility();
  const [mode, setMode] = useState<AuthMode>("phone");

  // FORM DATA (all in one file)
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const goBack = () => {
    if (mode === "register") return setMode("otp");
    if (mode === "otp") return setMode("phone");
    navigation.goBack();
  };

  const title = {
    phone: "Enter your phone number",
    otp: "Enter OTP",
    register: "Create your account",
  }[mode];

  const subtitle = {
    phone: "We'll text you a code to verify your phone.",
    otp: "A 4-digit code has been sent to your phone number.",
    register: "Just a few more details to get you started.",
  }[mode];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Back Button */}
      {mode !== "phone" && (
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={{ color: colors.text, fontSize: 28 }}>‹</Text>
        </TouchableOpacity>
      )}

      {/* Logo */}
      <View style={styles.logoWrapper}>
        <Logo size={32} accessibilityLabel="Bykea Logo" />
      </View>

      {/* Headline */}
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text
        style={[
          styles.subTitle,
          { color: colors.text + "AA" },
        ]}
      >
        {subtitle}
      </Text>

      {/* === PHONE MODE === */}
      {mode === "phone" && (
        <View style={{ width: "100%" }}>
          <Text style={[styles.label, { color: colors.text }]}>
            Phone Number
          </Text>

          <View style={styles.phoneInputWrapper}>
            <Text style={styles.prefix}>+92</Text>
            <TextInput
              style={[styles.phoneInput, { color: colors.text }]}
              keyboardType="number-pad"
              placeholder="300 1234567"
              placeholderTextColor={colors.textMuted}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setMode("otp")}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* === OTP MODE === */}
      {mode === "otp" && (
        <View style={{ width: "100%" }}>
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                keyboardType="numeric"
                maxLength={1}
                style={styles.otpBox}
                value={digit}
                onChangeText={(value) => {
                  const newOtp = [...otp];
                  newOtp[index] = value;
                  setOtp(newOtp);
                }}
              />
            ))}
          </View>

          <TouchableOpacity style={{ alignSelf: "center", marginBottom: 20 }}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setMode("register")}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* === REGISTER MODE === */}
      {mode === "register" && (
        <View style={{ width: "100%" }}>
          <Text style={[styles.label, { color: colors.text }]}>
            Full Name
          </Text>
          <TextInput
            style={[styles.textField, { color: colors.text }]}
            placeholder="Enter your full name"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
          />

          <Text style={[styles.label, { color: colors.text }]}>
            Email Address (Optional)
          </Text>
          <TextInput
            style={[styles.textField, { color: colors.text }]}
            placeholder="Enter your email address"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace("Accessibility")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Legal Footer */}
      <Text style={[styles.legal, { color: colors.textMuted }]}>
        By continuing, you agree to our{" "}
        <Text style={styles.link}>Terms of Service</Text> &
        <Text style={styles.link}> Privacy Policy</Text>.
      </Text>
    </ScrollView>
  );
};

export default AuthScreen;

// =====================================
// STYLES
// =====================================
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 48,
    minHeight: "100%",
  },
  backButton: {
    marginBottom: 16,
  },
  logoWrapper: {
    alignSelf: "center",
    marginBottom: 26,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },

  // PHONE INPUT
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  phoneInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1f1d",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
  },
  prefix: {
    fontSize: 16,
    marginRight: 8,
    color: "#9CA3AF",
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
  },

  // OTP
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpBox: {
    width: 54,
    height: 54,
    backgroundColor: "#1c1f1d",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 22,
    color: "#fff",
  },
  resendText: {
    color: "#0df259",
    fontWeight: "600",
  },

  // REGISTER FIELDS
  textField: {
    backgroundColor: "#1c1f1d",
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
  },

  // BUTTON
  button: {
    backgroundColor: "#0df259",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#07220f",
    fontSize: 16,
    fontWeight: "700",
  },

  // LEGAL
  legal: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
    paddingHorizontal: 12,
  },
  link: {
    textDecorationLine: "underline",
    fontWeight: "700",
  },
});

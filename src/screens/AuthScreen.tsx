import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Logo from "../Component/Logo";
import { useAccessibility } from "../context/AccessibilityContext";
import * as Clarity from "@microsoft/react-native-clarity";

import {
  checkPhoneExists,
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser,
} from "../backend/authBackend";

type AuthMode = "phone" | "otp" | "register";

const AuthScreen = ({ navigation }) => {
  const { colors } = useAccessibility();

  const [mode, setMode] = useState<AuthMode>("phone");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // true = new user → redirect to register
  const [needsRegister, setNeedsRegister] = useState(false);

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

  /* -----------------------------
        1. Continue → Check phone
  ------------------------------ */
  const handleContinue = async () => {
    const cleaned = phone.trim();
    if (!cleaned) return;

    const exists = await checkPhoneExists(cleaned);
    await sendOtp(cleaned);

    setNeedsRegister(!exists);
    setMode("otp");
  };

  /* -----------------------------
        2. Verify OTP
  ------------------------------ */
  const handleVerify = async () => {
    const code = otp.join("");
    const valid = await verifyOtp(code);

    if (!valid) {
      alert("Invalid OTP");
      return;
    }

    if (needsRegister) {
      setMode("register");
      return;
    }

    // Login existing user
    await loginUser(phone.trim());
    Clarity.setCustomUserId(phone.trim());
    navigation.replace("Accessibility");
  };

  /* -----------------------------
        3. Register new user
  ------------------------------ */
  const handleRegister = async () => {
    await registerUser({
      phone: phone.trim(),
      name: name.trim(),
      email: email.trim(),
    });

    navigation.replace("Accessibility");
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {mode !== "phone" && (
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={{ color: colors.text, fontSize: 28 }}>‹</Text>
        </TouchableOpacity>
      )}

      <View style={styles.logoWrapper}>
        <Logo size={32} accessibilityLabel="Bykea Logo" />
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.subTitle, { color: colors.text + "AA" }]}>
        {subtitle}
      </Text>

      {/* PHONE MODE */}
      {mode === "phone" && (
        <View style={{ width: "100%" }}>
          <Text style={[styles.label, { color: colors.text }]}>
            Phone Number
          </Text>

          <View style={styles.phoneInputWrapper}>
            <Text style={styles.prefix}>+92</Text>
            <TextInput
              keyboardType="number-pad"
              placeholder="300 1234567"
              placeholderTextColor={colors.textMuted}
              style={[styles.phoneInput, { color: colors.text }]}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* OTP MODE */}
      {mode === "otp" && (
        <View style={{ width: "100%" }}>
          <View style={styles.otpRow}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                maxLength={1}
                keyboardType="numeric"
                style={styles.otpBox}
                value={digit}
                onChangeText={(v) => {
                  const arr = [...otp];
                  arr[i] = v;
                  setOtp(arr);
                }}
              />
            ))}
          </View>

          <TouchableOpacity
            style={{ alignSelf: "center", marginBottom: 20 }}
            onPress={() => sendOtp(phone.trim())}
          >
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* REGISTER MODE */}
      {mode === "register" && (
        <View style={{ width: "100%" }}>
          <Text style={[styles.label, { color: colors.text }]}>Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor={colors.textMuted}
            style={[styles.textField, { color: colors.text }]}
            value={name}
            onChangeText={setName}
          />

          <Text style={[styles.label, { color: colors.text }]}>
            Email Address (Optional)
          </Text>
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor={colors.textMuted}
            style={[styles.textField, { color: colors.text }]}
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={[styles.legal, { color: colors.textMuted }]}>
        By continuing, you agree to our{" "}
        <Text style={styles.link}>Terms of Service</Text> &
        <Text style={styles.link}> Privacy Policy</Text>.
      </Text>
    </ScrollView>
  );
};

export default AuthScreen;

/* ---------------------------
   STYLES
---------------------------- */
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 48,
    minHeight: "100%",
  },
  backButton: { marginBottom: 16 },
  logoWrapper: { alignSelf: "center", marginBottom: 26 },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center" },
  subTitle: { fontSize: 15, textAlign: "center", marginTop: 8, marginBottom: 30 },
  label: { fontSize: 15, fontWeight: "600", marginBottom: 8 },

  phoneInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1f1d",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
  },
  prefix: { fontSize: 16, marginRight: 8, color: "#9CA3AF" },
  phoneInput: { flex: 1, fontSize: 16 },

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
    color: "white",
  },
  resendText: { color: "#0df259", fontWeight: "600" },

  textField: {
    backgroundColor: "#1c1f1d",
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
    color: "white",
  },

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

  legal: { fontSize: 12, textAlign: "center", marginTop: 30, paddingHorizontal: 12 },
  link: { textDecorationLine: "underline", fontWeight: "700" },
});

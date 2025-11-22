import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AccessibleText from "../Component/AccessibleText";
import AccessibleTextInput from "../Component/AccessibleTextInput";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext";

type NavProp = NativeStackNavigationProp<RootStackParamList, "OTP">;

const OTPVerificationScreen = ({ navigation }: { navigation: NavProp }) => {
  const { t } = useTranslation();
  const { colors } = useAccessibility();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [timer, setTimer] = useState(30);

  const inputs = useRef<Array<AccessibleTextInput | null>>([]);
  // ... animations ref kept same ...
  const animations = useRef([
    new Animated.Value(1), new Animated.Value(1), new Animated.Value(1), new Animated.Value(1),
  ]).current;

  // ... useEffect for timer kept same ...
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ... handlers kept same ...
  const handleFocus = (index: number) => {
    setActiveIndex(index);
    Animated.spring(animations[index], { toValue: 1.15, useNativeDriver: true }).start();
  };

  const handleBlur = (index: number) => {
    Animated.spring(animations[index], { toValue: 1, useNativeDriver: true }).start();
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    navigation.navigate("Accessibility");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AccessibleText style={[styles.title, { color: colors.primary }]}>{t("otp_title")}</AccessibleText>
      <AccessibleText style={[styles.subtitle, { color: colors.textSecondary }]}>{t("otp_subtitle")}</AccessibleText>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <Animated.View
            key={index}
            style={[
              styles.animatedBox,
              {
                transform: [{ scale: animations[index] }],
                // Shadow matches the primary color (Green) when active
                shadowColor: activeIndex === index ? colors.primary : "transparent",
                shadowOpacity: activeIndex === index ? 0.5 : 0,
                shadowRadius: 8,
              },
            ]}
          >
            <AccessibleTextInput
              ref={(el) => (inputs.current[index] = el)}
              // ✅ FIX IS HERE:
              style={[
                styles.otpInput,
                {
                  // 1. Use Surface color (Contrast against background)
                  backgroundColor: colors.surface,
                  // 2. Add a default Border Color so it is visible in Dark Mode
                  borderColor: colors.border,
                  // 3. Add a default Border Width
                  borderWidth: 1.5,
                  // 4. Ensure text color is correct
                  color: colors.text
                },
                // 5. If Active, Override Border Color and Width
                activeIndex === index && {
                  borderColor: colors.primary,
                  borderWidth: 2,
                  backgroundColor: colors.background // Optional: Slight dip effect
                },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onFocus={() => handleFocus(index)}
              onBlur={() => handleBlur(index)}
              onChangeText={(text) => handleChange(text, index)}
            />
          </Animated.View>
        ))}
      </View>

      <TouchableOpacity style={[
          styles.button,
          {
            backgroundColor: colors.primary,
            shadowColor: colors.text
          }]}
        onPress={handleVerify}
      >
        {/* Button Text should be black/dark to contrast with Green Button */}
        <AccessibleText style={[styles.buttonText, { color: "#1a1f24" }]}>{t("verify_btn")}</AccessibleText>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        {timer > 0 ? (
          <AccessibleText style={[styles.timerText, { color: colors.textSecondary }]}>
            {t("resend_otp_timer", { timer })}
          </AccessibleText>
        ) : (
          <TouchableOpacity onPress={() => setTimer(30)}>
            <AccessibleText style={[styles.resendText, { color: colors.primary }]}>{t("resend_otp_btn")}</AccessibleText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    marginBottom: 40,
  },
  animatedBox: {
    shadowOffset: { width: 0, height: 0 },
  },
  otpInput: {
    width: 55,
    height: 55,
    borderRadius: 12,
    fontSize: 22,
    textAlign: "center",
    // Removed hardcoded styles here, handled in render
  },
  button: {
    width: "80%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, // Lowered opacity slightly for better look
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
  },
  resendContainer: {
    marginTop: 20,
  },
  timerText: {},
  resendText: {
    fontWeight: "600",
  },
});
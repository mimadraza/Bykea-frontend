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
import { useTranslation } from "react-i18next"; // Import this

type NavProp = NativeStackNavigationProp<RootStackParamList, "OTP">;

const OTPVerificationScreen = ({ navigation }: { navigation: NavProp }) => {
  // HOOKS
  const { t } = useTranslation(); // Get the translate function
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [timer, setTimer] = useState(30);

  const inputs = useRef<Array<AccessibleTextInput | null>>([]);
  const animations = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  // TIMER EFFECT
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // HANDLERS
  const handleFocus = (index: number) => {
    setActiveIndex(index);

    Animated.spring(animations[index], {
      toValue: 1.15,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = (index: number) => {
    Animated.spring(animations[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
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

  // UI
  return (
    <View style={styles.container}>
      <AccessibleText style={styles.title}>{t("otp_title")}</AccessibleText>
      <AccessibleText style={styles.subtitle}>{t("otp_subtitle")}</AccessibleText>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <Animated.View
            key={index}
            style={[
              styles.animatedBox,
              {
                transform: [{ scale: animations[index] }],
                shadowColor: activeIndex === index ? "#3dff73" : "transparent",
                shadowOpacity: activeIndex === index ? 0.8 : 0,
                shadowRadius: activeIndex === index ? 10 : 0,
              },
            ]}
          >
            <AccessibleTextInput
              ref={(el) => (inputs.current[index] = el)}
              style={[
                styles.otpInput,
                activeIndex === index && styles.activeOtpInput,
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

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <AccessibleText style={styles.buttonText}>{t("verify_btn")}</AccessibleText>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        {timer > 0 ? (
          // Use interpolation for the timer
          <AccessibleText style={styles.timerText}>
            {t("resend_otp_timer", { timer })}
          </AccessibleText>
        ) : (
          <TouchableOpacity onPress={() => setTimer(30)}>
            <AccessibleText style={styles.resendText}>{t("resend_otp_btn")}</AccessibleText>
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
    backgroundColor: "#2c333d",
    alignItems: "center",
    paddingTop: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#3dff73",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#b0b6be",
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
    backgroundColor: "#37404a",
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },

  activeOtpInput: {
    borderColor: "#3dff73",
    borderWidth: 2,
  },

  button: {
    width: "80%",
    height: 55,
    backgroundColor: "#3dff73",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 20,

    // White drop shadow
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
  },

  buttonText: {
    color: "#1a1f24",
    fontSize: 18,
    fontWeight: "700",
  },

  resendContainer: {
    marginTop: 20,
  },

  timerText: {
    color: "#b0b6be",
  },

  resendText: {
    color: "#3dff73",
    fontWeight: "600",
  },
});
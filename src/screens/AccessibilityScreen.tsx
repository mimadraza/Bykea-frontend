import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  AccessibilityInfo,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

import { useTranslation } from "react-i18next";

import SectionTitle from "../Component/SectionTitle";
import SettingsRow from "../Component/SettingsRow";
import FloatingNextButton from "../Component/FloatingNextButton";
import { useAccessibility } from "../context/AccessibilityContext";
import { ThemeColors } from "../constants/colors";

type NavProp = NativeStackNavigationProp<RootStackParamList, "Accessibility">;

const AccessibilityScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();

  const {
    largeText,
    setLargeText,
    isUrdu,
    toggleUrdu,
    isDarkMode,
    toggleTheme,
    colorBlind,
    toggleColorBlind,
    highContrast,
    toggleHighContrast,
    colors,
  } = useAccessibility();

  const [screenReaderOn, setScreenReaderOn] = useState(false);

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
      if (mounted) setScreenReaderOn(enabled);
    });

    const subscription = AccessibilityInfo.addEventListener(
      "screenReaderChanged",
      (enabled) => {
        if (mounted) setScreenReaderOn(enabled);
      }
    );

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  const openSystemAccessibilitySettings = () => {
    Linking.sendIntent("android.settings.ACCESSIBILITY_SETTINGS");
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* -------------------- VISION SECTION -------------------- */}
        <SectionTitle text={t("vision")} />

        <SettingsRow
          title={t("screen_reader")}
          subtitle={t("screen_reader_sub")}
          valueText={screenReaderOn ? t("on") : t("off")}
          onPress={openSystemAccessibilitySettings}
          accessibilityLabel={t("screen_reader")}
          accessibilityHint={t("screen_reader_hint")}
          accessibilityRole="button"
        />

        <SettingsRow
          title={t("color_blind")}
          subtitle={t("color_blind_sub")}
          value={colorBlind}
          onChange={toggleColorBlind}
        />

        <SettingsRow
          title={t("high_contrast")}
          subtitle={t("high_contrast_sub")}
          value={highContrast}
          onChange={toggleHighContrast}
        />

        {/* -------------------- LANGUAGE SECTION -------------------- */}
        <SectionTitle text={t("language")} />

        <SettingsRow
          title={t("urdu")}
          value={isUrdu}
          onChange={toggleUrdu}
        />

        {/* -------------------- GENERAL SECTION -------------------- */}
        <SectionTitle text={t("general")} />

        <SettingsRow
          title={t("dark_mode")}
          subtitle={t("dark_mode_sub")}
          value={isDarkMode}
          onChange={toggleTheme}
        />

        <SettingsRow
          title={t("larger_text")}
          subtitle={t("larger_text_sub")}
          value={largeText}
          onChange={() => setLargeText(!largeText)}
        />
      </ScrollView>

      <FloatingNextButton
        onPress={() => navigation.navigate("Home")}
        accessibilityLabel={t("go_home")}
        accessibilityHint={t("go_home_hint")}
        accessibilityRole="button"
      />
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    scroll: {
      paddingBottom: 120,
    },
  });

export default AccessibilityScreen;

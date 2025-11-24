import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  Platform,
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

  // System-level screen reader (TalkBack / VoiceOver)
  const [screenReaderOn, setScreenReaderOn] = useState(false);

  // Initial state + subscription to changes
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
        <SectionTitle text={t("vision")} />

        {/* SYSTEM SCREEN READER STATUS ROW */}
        <SettingsRow
          title={t("screen_reader")}
          subtitle={t("screen_reader_sub")}
          // New prop: shows "On"/"Off" instead of a switch
          valueText={screenReaderOn ? t("on") : t("off")}
          onPress={openSystemAccessibilitySettings}
          // Accessibility: clearly a button that opens system settings
          accessibilityLabel={t("screen_reader")}
          accessibilityHint={t("screen_reader_hint")} // e.g. "Opens device accessibility settings"
          accessibilityRole="button"
        />

        <SettingsRow
          title={t("color_blind")}
          subtitle={t("color_blind_sub")}
          value={colorBlind}
          onChange={toggleColorBlind}
        />

        <SettingsRow
          title="High Contrast"
          subtitle="Increase visibility & borders"
          value={highContrast}
          onChange={toggleHighContrast}
        />

        <SectionTitle text={t("language")} />
        <SettingsRow title={t("urdu")} value={isUrdu} onChange={toggleUrdu} />

        <SectionTitle text={t("general")} />
        <SettingsRow
          title="Dark Mode"
          subtitle="Toggle light/dark theme"
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
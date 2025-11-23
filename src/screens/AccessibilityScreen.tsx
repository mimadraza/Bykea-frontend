import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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
      largeText, setLargeText,
      isUrdu, toggleUrdu,
      isDarkMode, toggleTheme,
      colorBlind, toggleColorBlind,
      highContrast, toggleHighContrast, // <-- New Props
      colors
    } = useAccessibility();

  // Local state for unused screen reader
  const [screenReader, setScreenReader] = useState(false);

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <SectionTitle text={t("vision")} />

        <SettingsRow
          title={t("screen_reader")}
          subtitle={t("screen_reader_sub")}
          value={screenReader}
          onChange={() => setScreenReader(!screenReader)}
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
        <SettingsRow
          title={t("urdu")}
          value={isUrdu}
          onChange={toggleUrdu}
        />

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

      <FloatingNextButton onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
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
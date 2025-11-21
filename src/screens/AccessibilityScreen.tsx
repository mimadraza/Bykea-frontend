import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useTranslation } from "react-i18next"; //

import SectionTitle from "../Component/SectionTitle";
import SettingsRow from "../Component/SettingsRow";
import FloatingNextButton from "../Component/FloatingNextButton";

import { useAccessibility } from "../context/AccessibilityContext";

type NavProp = NativeStackNavigationProp<RootStackParamList, "Accessibility">;

const AccessibilityScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation(); //

  // Get global state
  const { largeText, setLargeText, isUrdu, toggleUrdu } = useAccessibility();

  const [screenReader, setScreenReader] = useState(false);
  const [colorBlind, setColorBlind] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Translate Section Titles */}
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
          onChange={() => setColorBlind(!colorBlind)}
        />

        <SectionTitle text={t("language")} />

        <SettingsRow
          title={t("urdu")} // Will show "اردو" or "English"
          value={isUrdu}
          onChange={toggleUrdu} //
        />

        <SectionTitle text={t("general")} />

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

export default AccessibilityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c333d",
    padding: 20,
  },
  scroll: {
    paddingBottom: 120,
  },
});
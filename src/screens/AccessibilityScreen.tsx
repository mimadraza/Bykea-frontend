import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

import SectionTitle from "../Component/SectionTitle";
import SettingsRow from "../Component/SettingsRow";
import FloatingNextButton from "../Component/FloatingNextButton";

type NavProp = NativeStackNavigationProp<RootStackParamList, "Accessibility">;

const AccessibilityScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [screenReader, setScreenReader] = useState(false);
  const [colorBlind, setColorBlind] = useState(false);
  const [urdu, setUrdu] = useState(false);
  const [largeText, setLargeText] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle text="VISION" />

        <SettingsRow
          title="Screen Reader"
          subtitle="Provides spoken feedback"
          value={screenReader}
          onChange={() => setScreenReader(!screenReader)}
        />

        <SettingsRow
          title="Colorblind Mode"
          subtitle="Adjust colors for clarity"
          value={colorBlind}
          onChange={() => setColorBlind(!colorBlind)}
        />

        <SectionTitle text="LANGUAGE" />

        <SettingsRow
          title="اردو"
          value={urdu}
          onChange={() => setUrdu(!urdu)}
        />

        <SectionTitle text="GENERAL" />

        <SettingsRow
          title="Larger Text"
          subtitle="Increase global font size"
          value={largeText}
          onChange={() => setLargeText(!largeText)}
        />
      </ScrollView>

      {/* ✅ Navigate to Home */}
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

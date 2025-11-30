// screens/HelplineScreen.tsx
import React from "react";
import { View, StyleSheet, ScrollView, Image, Linking } from "react-native";
import SectionTitle from "../Component/SectionTitle";
import CardButton from "../Component/CardButton";
import IconButton from "../Component/IconButton";
import AccessibleText from "../Component/AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext";
import { useTranslation } from "react-i18next";

// PNG assets
import ExternalLinkImage from "../assets/external-link.png";
import PhoneImage from "../assets/phone.png";

const HelplineScreen = () => {
  const { colors, borderWidth } = useAccessibility();
  const { t } = useTranslation();

  const openWebPortal = () => Linking.openURL("https://example.com");
  const callNumber = () => Linking.openURL("tel:123123123");

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.wrap}
    >
      {/* FAQs */}
      <SectionTitle title={t("hl_faq_1")} />
      <CardButton label={t("hl_faq_1")} />

      <CardButton label={t("hl_faq_2")} />

      <CardButton label={t("hl_faq_3")} />

      <View style={styles.chevron}>
        <AccessibleText
          style={[styles.chevronText, { color: colors.textSecondary }]}
        >
          {t("hl_chevron_down")}
        </AccessibleText>
      </View>

      {/* Lodge a Complaint */}
      <SectionTitle title={t("hl_complaint_title")} />

      <View
        style={[
          styles.tightCard,
          {
            backgroundColor: colors.surface,
            borderWidth,
            borderColor: colors.border,
            borderRadius: 12,
          },
        ]}
      >
        <CardButton
          label={t("hl_web_portal")}
          onPress={openWebPortal}
          rightIcon={
            <Image
              source={ExternalLinkImage}
              style={{ width: 18, height: 18, tintColor: colors.icon }}
              resizeMode="contain"
            />
          }
        />
      </View>

      <AccessibleText style={[styles.orText, { color: colors.textSecondary }]}>
        {t("hl_or")}
      </AccessibleText>

      {/* Contact Us */}
      <SectionTitle title={t("hl_contact_us")} />

      <View
        style={[
          styles.tightCard,
          {
            backgroundColor: colors.surface,
            borderWidth,
            borderColor: colors.border,
            borderRadius: 12,
          },
        ]}
      >
        <IconButton
          label="123-123-123"
          onPress={callNumber}
          icon={
            <Image
              source={PhoneImage}
              style={{ width: 20, height: 20, tintColor: colors.icon }}
              resizeMode="contain"
            />
          }
        />
      </View>
    </ScrollView>
  );
};

export default HelplineScreen;

/* ============================ STYLES ============================ */

const styles = StyleSheet.create({
  container: { flex: 1 },
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },

  tightCard: {
    marginVertical: 4,
    padding: 2, // internal padding for CardButton layout
  },

  chevron: { alignItems: "center", marginVertical: 6 },
  chevronText: { fontSize: 22, fontWeight: "700" },

  orText: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: 12,
    fontWeight: "600",
  },
});

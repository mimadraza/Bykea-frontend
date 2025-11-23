// screens/HelplineScreen.tsx
import React from "react";
import { View, StyleSheet, ScrollView, Image, Linking } from "react-native";
import SectionTitle from "../Component/SectionTitle";
import CardButton from "../Component/CardButton";
import IconButton from "../Component/IconButton";
import AccessibleText from "../Component/AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext";

// PNG assets
import ExternalLinkImage from "../assets/external-link.png";
import PhoneImage from "../assets/phone.png";

const HelplineScreen = () => {
  const openWebPortal = () => Linking.openURL("https://example.com");
  const callNumber = () => Linking.openURL("tel:123123123");
  const { colors } = useAccessibility();

  return (
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.wrap}>
        <SectionTitle title="FAQs" />
        <CardButton label="I got into an accident, now what?" />
        <CardButton label="What are my payment options?" />
        <CardButton label="My parcel got damaged during delivery, now what?" />

        <View style={styles.chevron}>
          <AccessibleText style={styles.chevronText}>⌄</AccessibleText>
        </View>

        <SectionTitle title="Lodge a Complaint" />
        <View style={styles.tightCard}>
          <CardButton
            label="Using our web portal"
            rightIcon={<Image source={ExternalLinkImage} style={{ width: 18, height: 18 }} resizeMode="contain" />}
          />
        </View>

        <AccessibleText style={styles.orText}>OR</AccessibleText>

        <SectionTitle title="Contact Us" />
        <View style={styles.tightCard}>
          <IconButton
            label="123-123-123"
            icon={<Image source={PhoneImage} style={{ width: 20, height: 20 }} resizeMode="contain" />}
          />
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: { flex: 1 },
    wrap: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 20 },
    tightCard: { marginVertical: 4 },
    chevron: { alignItems: "center", marginVertical: 2 },
    chevronText: { fontSize: 20 },
    orText: { textAlign: "center", fontSize: 12, marginVertical: 1 },
  });

  export default HelplineScreen;

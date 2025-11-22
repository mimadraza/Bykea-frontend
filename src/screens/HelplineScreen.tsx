// screens/HelplineScreen.tsx
import React from "react";
import { View, StyleSheet, ScrollView, Image, Linking } from "react-native";
import SectionTitle from "../Component/SectionTitle";
import CardButton from "../Component/CardButton";
import IconButton from "../Component/IconButton";
import AccessibleText from "../Component/AccessibleText";

// PNG assets
import ExternalLinkImage from "../assets/external-link.png";
import PhoneImage from "../assets/phone.png";

const HelplineScreen = () => {
  const openWebPortal = () => Linking.openURL("https://example.com");
  const callNumber = () => Linking.openURL("tel:123123123");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.wrap}>
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
          onPress={openWebPortal}
          rightIcon={
            <Image
              source={ExternalLinkImage}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          }
        />
      </View>

      <AccessibleText style={styles.orText}>OR</AccessibleText>

      <SectionTitle title="Contact Us" />

      <View style={styles.tightCard}>
        <IconButton
          label="123-123-123"
          onPress={callNumber}
          icon={
            <Image
              source={PhoneImage}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D2126"
  },
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20
  },

  // EXTREMELY TIGHT SPACING WRAPPER
  tightCard: {
    marginVertical: 4   // << super small gap
  },

  chevron: {
    alignItems: "center",
    marginVertical: 2
  },
  chevronText: {
    fontSize: 20,
    color: "white"
  },
  orText: {
    textAlign: "center",
    color: "white",
    fontSize: 12,
    marginVertical: 1    // << reduced!!
  }
});

export default HelplineScreen;

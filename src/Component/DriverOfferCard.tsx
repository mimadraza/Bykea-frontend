import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext";

export interface DriverOffer {
  id: string;
  name: string;
  eta: string;
  rating: number;
  price: number;
  avatarUrl?: string;
}

interface Props {
  offer: DriverOffer;
  onAccept: () => void;
  onReject: () => void;
}

const DriverOfferCard: React.FC<Props> = ({ offer, onAccept, onReject }) => {
  const { t } = useTranslation();
  const { colors, borderWidth } = useAccessibility();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          borderWidth,
        },
      ]}
    >
      {/* Top row: Avatar + Name + Rating + Price/ETA */}
      <View style={styles.topRow}>
        {/* Avatar */}
        {offer.avatarUrl ? (
          <Image source={{ uri: offer.avatarUrl }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth,
              },
            ]}
          >
            <AccessibleText
              style={[styles.avatarInitial, { color: colors.text }]}
            >
              {offer.name.charAt(0).toUpperCase()}
            </AccessibleText>
          </View>
        )}

        {/* Name + Rating */}
        <View style={styles.nameColumn}>
          <View style={styles.nameRow}>
            <AccessibleText
              style={[styles.nameText, { color: colors.text }]}
            >
              {offer.name}
            </AccessibleText>

            {/* Rating pill */}
            <View
              style={[
                styles.ratingPill,
                { backgroundColor: colors.surface },
              ]}
            >
              <AccessibleText
                style={[styles.ratingStar, { color: "#FFD700" }]}
              >
                ★
              </AccessibleText>
              <AccessibleText
                style={[styles.ratingValue, { color: colors.text }]}
              >
                {offer.rating.toFixed(1)}
              </AccessibleText>
            </View>
          </View>
        </View>

        {/* Price + ETA block (aligned right) */}
        <View style={styles.priceColumn}>
          <AccessibleText
            style={[styles.priceText, { color: colors.text }]}
          >
            PKR {offer.price}
          </AccessibleText>
          <AccessibleText
            style={[styles.etaText, { color: colors.textSecondary }]}
          >
            {offer.eta}
          </AccessibleText>
        </View>
      </View>

      {/* Buttons Row */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.rejectBtn,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth,
            },
          ]}
          onPress={onReject}
        >
          <AccessibleText
            style={[styles.rejectText, { color: colors.text }]}
          >
            {t("reject_btn")}
          </AccessibleText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.acceptBtn,
            { backgroundColor: colors.primary },
          ]}
          onPress={onAccept}
        >
          <AccessibleText
            style={[styles.acceptText, { color: colors.text }]}
          >
            {t("accept_btn")}
          </AccessibleText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverOfferCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 14,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarPlaceholder: {},
  avatarInitial: {
    fontSize: 22,
    fontWeight: "700",
  },

  nameColumn: {
    flex: 1,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  nameText: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },

  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  ratingStar: {
    fontSize: 14,
    marginRight: 3,
  },

  ratingValue: {
    fontSize: 13,
    fontWeight: "600",
  },

  priceColumn: {
    alignItems: "flex-end",
  },

  priceText: {
    fontSize: 16,
    fontWeight: "700",
  },

  etaText: {
    fontSize: 13,
    marginTop: 2,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  rejectBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 8,
    alignItems: "center",
  },

  acceptBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 8,
    alignItems: "center",
  },

  rejectText: {
    fontSize: 14,
    fontWeight: "600",
  },

  acceptText: {
    fontSize: 14,
    fontWeight: "700",
  },
});

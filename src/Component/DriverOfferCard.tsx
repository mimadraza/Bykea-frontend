import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText";
import { useTranslation } from "react-i18next";

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

  return (
    <View style={styles.card}>

      {/* Top row: Avatar + Name + Rating + Price/ETA */}
      <View style={styles.topRow}>

        {/* Avatar */}
        {offer.avatarUrl ? (
          <Image source={{ uri: offer.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <AccessibleText style={styles.avatarInitial}>
              {offer.name.charAt(0).toUpperCase()}
            </AccessibleText>
          </View>
        )}

        {/* Name + Rating */}
        <View style={styles.nameColumn}>
          <View style={styles.nameRow}>
            <AccessibleText style={styles.nameText}>{offer.name}</AccessibleText>

            {/* Rating pill */}
            <View style={styles.ratingPill}>
              <AccessibleText style={styles.ratingStar}>★</AccessibleText>
              <AccessibleText style={styles.ratingValue}>
                {offer.rating.toFixed(1)}
              </AccessibleText>
            </View>
          </View>
        </View>

        {/* Price + ETA block (aligned right) */}
        <View style={styles.priceColumn}>
          <AccessibleText style={styles.priceText}>PKR {offer.price}</AccessibleText>
          <AccessibleText style={styles.etaText}>{offer.eta}</AccessibleText>
        </View>

      </View>

      {/* Buttons Row */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.rejectBtn} onPress={onReject}>
          <AccessibleText style={styles.rejectText}>{t("reject_btn")}</AccessibleText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
          <AccessibleText style={styles.acceptText}>{t("accept_btn")}</AccessibleText>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default DriverOfferCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(28, 31, 37, 0.92)",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    width: "100%",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },

  avatarPlaceholder: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarInitial: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },

  nameColumn: {
    flex: 1,
    justifyContent: "center",
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  nameText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    marginRight: 8,
  },

  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#133A20",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },

  ratingStar: {
    color: "#00E676",
    fontSize: 12,
    marginRight: 2,
  },

  ratingValue: {
    color: "#00E676",
    fontSize: 12,
    fontWeight: "600",
  },

  priceColumn: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 90,
  },

  priceText: {
    color: "#00E676",
    fontWeight: "800",
    fontSize: 16,
  },

  etaText: {
    color: "#B5B5B5",
    marginTop: 4,
    fontSize: 12,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  rejectBtn: {
    backgroundColor: "#32363A",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
  },

  rejectText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },

  acceptBtn: {
    backgroundColor: "#00E676",
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 12,
  },

  acceptText: {
    color: "#0A0A0A",
    fontWeight: "800",
    fontSize: 14,
  },
});

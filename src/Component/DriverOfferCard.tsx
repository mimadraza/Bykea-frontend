// src/Component/DriverOfferCard.tsx
import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import AccessibleText from "./AccessibleText"; // Import your wrapper
export interface DriverOffer {
  id: string;
  name: string;
  eta: string;   // e.g. "5 mins away"
  rating: number;
  avatarUrl?: string;
}

interface Props {
  offer: DriverOffer;
  onAccept: () => void;
  onReject: () => void;
}

const DriverOfferCard: React.FC<Props> = ({ offer, onAccept, onReject }) => {
  return (
    <View style={styles.card}>
      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        {offer.avatarUrl ? (
          <Image source={{ uri: offer.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <AccessibleText style={styles.avatarInitial}>
              {offer.name.charAt(0).toUpperCase()}
            </AccessibleText>
          </View>
        )}
      </View>

      {/* AccessibleText */}
      <View style={styles.textCol}>
        <AccessibleText style={styles.eta}>{offer.eta}</AccessibleText>
        <AccessibleText style={styles.name}>{offer.name}</AccessibleText>
        <View style={styles.ratingRow}>
          <AccessibleText style={styles.star}>★</AccessibleText>
          <AccessibleText style={styles.rating}>{offer.rating.toFixed(2)}</AccessibleText>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.btnCol}>
        <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
          <AccessibleText style={styles.acceptAccessibleText}>Accept</AccessibleText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectBtn} onPress={onReject}>
          <AccessibleText style={styles.rejectAccessibleText}>Reject</AccessibleText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverOfferCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#25282B",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 18,
    marginBottom: 8,
    opacity: 0.97,
  },

  avatarWrapper: {
    marginRight: 10,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  avatarPlaceholder: {
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarInitial: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },

  textCol: {
    flex: 1,
  },

  eta: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },

  name: {
    color: "white",
    fontSize: 13,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  star: {
    color: "#FFC107",
    marginRight: 4,
    fontSize: 12,
  },

  rating: {
    color: "white",
    fontSize: 12,
  },

  btnCol: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 46,
  },

  acceptBtn: {
    backgroundColor: "#3dff73",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },

  acceptText: {
    color: "#1A1A1A",
    fontSize: 12,
    fontWeight: "700",
  },

  rejectBtn: {
    backgroundColor: "#3A3D41",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  rejectText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});

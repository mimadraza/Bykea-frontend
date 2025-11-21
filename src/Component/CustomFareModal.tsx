// src/Component/CustomFareModal.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

interface Props {
  visible: boolean;
  value: number;
  onClose: () => void;
  onConfirm: (newFare: number) => void;
  onDigitPress: (digit: string) => void;
  onDelete: () => void;
}

const CustomFareModal: React.FC<Props> = ({
  visible,
  value,
  onClose,
  onConfirm,
  onDigitPress,
  onDelete,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Enter Custom Fare</Text>

          <View style={styles.fareDisplay}>
            <Text style={styles.fareText}>PKR {value}</Text>
          </View>

          {/* Keypad */}
          <View style={styles.keypad}>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
              (digit, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.key}
                  onPress={() => onDigitPress(digit)}
                >
                  <Text style={styles.keyText}>{digit}</Text>
                </TouchableOpacity>
              )
            )}

            {/* Delete Button */}
            <TouchableOpacity style={styles.key} onPress={onDelete}>
              <Text style={styles.keyText}>⌫</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => onConfirm(value)}
          >
            <Text style={styles.confirmText}>APPLY FARE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomFareModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",
    backgroundColor: "#1F2124",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  fareDisplay: {
    backgroundColor: "#2c333d",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },

  fareText: {
    color: "white",
    fontSize: 32,
    fontWeight: "800",
  },

  keypad: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  key: {
    width: "30%",
    backgroundColor: "#2F3338",
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 6,
    alignItems: "center",
  },

  keyText: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },

  confirmButton: {
    width: "100%",
    backgroundColor: "#3dff73",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  confirmText: {
    color: "#1A1A1A",
    fontSize: 18,
    fontWeight: "800",
  },

  cancelText: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 4,
  },
});

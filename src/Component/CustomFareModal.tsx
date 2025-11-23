import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import AccessibleText from "./AccessibleText";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext";

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
  const { t } = useTranslation();
  const { colors, borderWidth } = useAccessibility();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[
          styles.modalBox,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderWidth: borderWidth
          }
        ]}>
          <AccessibleText style={styles.title}>{t("custom_fare_title")}</AccessibleText>

          <View style={[styles.fareDisplay, { backgroundColor: colors.surface }]}>
            <AccessibleText style={styles.fareText}>PKR {value}</AccessibleText>
          </View>

          <View style={styles.keypad}>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
              (digit, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.key, { backgroundColor: colors.inputBackground }]}
                  onPress={() => onDigitPress(digit)}
                >
                  <AccessibleText style={styles.keyText}>{digit}</AccessibleText>
                </TouchableOpacity>
              )
            )}

            <TouchableOpacity
              style={[styles.key, { backgroundColor: colors.inputBackground }]}
              onPress={onDelete}
            >
              <AccessibleText style={styles.keyText}>⌫</AccessibleText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.confirmButton, { backgroundColor: colors.primary }]}
            onPress={() => onConfirm(value)}
          >
            <AccessibleText style={[styles.confirmText, { color: "#1A1A1A" }]}>
              {t("apply_fare_btn")}
            </AccessibleText>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <AccessibleText style={[styles.cancelText, { color: colors.textSecondary }]}>
              {t("cancel_btn")}
            </AccessibleText>
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
    // backgroundColor: "#1F2124", // REMOVED
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  title: {
    // color: "white", // REMOVED
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  fareDisplay: {
    // backgroundColor: "#2c333d", // REMOVED
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  fareText: {
    // color: "white", // REMOVED
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
    // backgroundColor: "#2F3338", // REMOVED
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 6,
    alignItems: "center",
  },
  keyText: {
    // color: "white", // REMOVED
    fontSize: 24,
    fontWeight: "700",
  },
  confirmButton: {
    width: "100%",
    // backgroundColor: "#3dff73", // REMOVED
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  confirmText: {
    color: "#1A1A1A", // Keep this dark as Primary color is usually bright
    fontSize: 18,
    fontWeight: "800",
  },
  cancelText: {
    // color: "#bbb", // REMOVED
    fontSize: 14,
    marginTop: 4,
  },
});
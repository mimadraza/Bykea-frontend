import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import ToggleSwitch from "./ToggleSwitch";
import AccessibleText from "./AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext";

interface RowProps {
  title: string;
  subtitle?: string;

  // For toggle rows
  value?: boolean;
  onChange?: () => void;

  // For button rows (Screen Reader)
  valueText?: string;
  onPress?: () => void;

  icon?: React.ReactNode;

  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: "button" | "switch";
}

const SettingsRow: React.FC<RowProps> = ({
  title,
  subtitle,
  value,
  onChange,
  valueText,
  onPress,
  icon,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
}) => {
  const { colors, borderWidth } = useAccessibility();

  // Determine mode
  const isToggle = typeof value === "boolean" && !!onChange;
  const isButton = !!onPress;

  const RowComponent = isButton ? Pressable : View;

  return (
    <RowComponent
      style={[
        styles.row,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: borderWidth,
          borderBottomWidth: borderWidth,
        },
      ]}
      onPress={isButton ? onPress : undefined}
      accessible={true}
      accessibilityRole={
        accessibilityRole || (isButton ? "button" : isToggle ? "switch" : "text")
      }
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={isToggle ? { checked: value } : undefined}
    >
      {/* LEFT SIDE */}
      <View style={styles.left}>
        {/* Icon */}
        <View
          style={[
            styles.iconPlaceholder,
            { backgroundColor: colors.background },
          ]}
        >
          {icon}
        </View>

        {/* Title + Subtitle */}
        <View>
          <AccessibleText style={[styles.title, { color: colors.text }]}>
            {title}
          </AccessibleText>

          {subtitle && (
            <AccessibleText
              style={[styles.subtitle, { color: colors.textSecondary }]}
            >
              {subtitle}
            </AccessibleText>
          )}
        </View>
      </View>

      {/* RIGHT SIDE — SWITCH OR VALUE TEXT */}
      {isToggle && <ToggleSwitch value={value!} onChange={onChange!} />}

      {isButton && valueText && (
        <AccessibleText
          style={{
            fontSize: 14,
            color: colors.textSecondary,
            marginRight: 6,
          }}
        >
          {valueText}
        </AccessibleText>
      )}
    </RowComponent>
  );
};

export default SettingsRow;

const styles = StyleSheet.create({
  row: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});
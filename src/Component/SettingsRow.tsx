import React from "react";
import { View, StyleSheet } from "react-native";
import ToggleSwitch from "./ToggleSwitch";
import AccessibleText from "./AccessibleText";
import { useAccessibility } from "../context/AccessibilityContext"; // Import hook

interface RowProps {
  title: string;
  subtitle?: string;
  value: boolean;
  onChange: () => void;
  icon?: React.ReactNode;
}

const SettingsRow: React.FC<RowProps> = ({
  title,
  subtitle,
  value,
  onChange,
  icon,
}) => {
  // 1. Get the current theme colors
  const { colors, borderWidth } = useAccessibility();

  return (
    // 2. Override the static background color with the theme color
    <View style={[styles.row, {
        backgroundColor: colors.surface,
        // Add border logic here to match the card style
        borderColor: colors.border,
        borderWidth: borderWidth,
        // 1px normally, 3px in HC
        borderBottomWidth: borderWidth // Ensure bottom is thick too
        }]}>
      <View style={styles.left}>
        {/* Optional: Make the icon background blend with the theme */}
        <View style={[styles.iconPlaceholder, { backgroundColor: colors.background }]}>
          {icon}
        </View>

        <View>
          {/* 3. Override text colors dynamically */}
          <AccessibleText style={[styles.title, { color: colors.text }]}>
            {title}
          </AccessibleText>

          {subtitle && (
            <AccessibleText style={[styles.subtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </AccessibleText>
          )}
        </View>
      </View>

      <ToggleSwitch value={value} onChange={onChange} />
    </View>
  );
};

export default SettingsRow;

const styles = StyleSheet.create({
  row: {
    width: "100%",
    // backgroundColor: "#343b43", // Removed: Handled dynamically in the component
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
    // backgroundColor: "#20252b", // Removed: Handled dynamically
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    // color: "white", // Removed: Handled dynamically so it turns black in light mode
  },

  subtitle: {
    fontSize: 12,
    // color: "#9ea3aa", // Removed: Handled dynamically
    marginTop: 2,
  },
});
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ToggleSwitch from "./ToggleSwitch";

interface RowProps {
  title: string;
  subtitle?: string;
  value: boolean;
  onChange: () => void;
  icon?: React.ReactNode;   // placeholder — icons can be added later
}

const SettingsRow: React.FC<RowProps> = ({
  title,
  subtitle,
  value,
  onChange,
  icon,
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.iconPlaceholder}>{icon}</View>

        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
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
    backgroundColor: "#343b43",
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
    backgroundColor: "#20252b",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },

  subtitle: {
    fontSize: 12,
    color: "#9ea3aa",
    marginTop: 2,
  },
});

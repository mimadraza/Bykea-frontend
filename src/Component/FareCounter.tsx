// src/Component/FareCounter.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onOpenCustom: () => void;    // NEW
}

const FareCounter: React.FC<Props> = ({
  value,
  onIncrease,
  onDecrease,
  onOpenCustom,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDecrease}>
        <Text style={styles.button}>−</Text>
      </TouchableOpacity>

      {/* tap fare to open popup */}
      <TouchableOpacity onPress={onOpenCustom}>
        <Text style={styles.value}>{value}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onIncrease}>
        <Text style={styles.button}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FareCounter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1E1F22",
    borderRadius: 40,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  button: {
    fontSize: 26,
    color: "white",
    paddingHorizontal: 8,
  },
  value: {
    fontSize: 18,
    color: "white",
    width: 40,
    textAlign: "center",
    fontWeight: "600",
  },
});

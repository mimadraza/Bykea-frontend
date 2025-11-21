import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

import Logo from "../Component/Logo";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Logo size={48} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c333d",
    justifyContent: "center",
    alignItems: "center",
  },
});

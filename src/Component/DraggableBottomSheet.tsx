import React, { ReactNode, useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  initialOffset?: number; // how far from bottom it starts
};

const SCREEN_HEIGHT = Dimensions.get("window").height;

const DraggableBottomSheet: React.FC<Props> = ({
  children,
  style,
  initialOffset = 0,
}) => {
  const translateY = useRef(new Animated.Value(initialOffset)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dy) > 3,

      onPanResponderMove: (_, gesture) => {
        translateY.setValue(
          Math.max(0, gesture.dy + initialOffset)
        );
      },

      onPanResponderRelease: (_, gesture) => {
        const shouldOpen = gesture.dy < 100;

        Animated.spring(translateY, {
          toValue: shouldOpen ? 0 : SCREEN_HEIGHT * 0.4,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        style,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default DraggableBottomSheet;
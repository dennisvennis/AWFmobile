import { StyleSheet, View, Animated, useWindowDimensions } from "react-native";
import React from "react";

const Pagination = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        flexDirection: "row",
        height: 40,
        // backgroundColor: "yellow",
        alignItems: "center",
      }}
    >
      {/* {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + i) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 40, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })} */}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    width: 8,
    borderRadius: 5,
    backgroundColor: "red",
    marginHorizontal: 8,
  },
});

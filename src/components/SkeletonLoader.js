import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import SkeletonPlaceholder from "expo-react-native-skeleton-placeholder";
import Card from "./Card";
import { useTheme } from "@shopify/restyle";

const { height } = Dimensions.get("screen");

const SkeletonLoader = () => {
  const theme = useTheme();
  return (
    <SkeletonPlaceholder background={"#49945A"} highlight={"#ffffff"}>
      <View
        style={{
          flex: 1,
          paddingTop: 30,
          width: "100%",
          gap: 15,
          backgroundColor: "red",
        }}
      >
        <View
          style={{
            width: "100%",
            height: 200,
            backgroundColor: "#49945A",
            borderRadius: 10,
            marginBottom: 20,
          }}
        />

        <View style={{ height: 100 }}>
          <View
            style={{
              backgroundColor: "#49945A",
              width: "100%",
              height: 10,
              marginVertical: 4,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              backgroundColor: "#49945A",
              width: "100%",
              height: 10,
              borderRadius: 5,
              marginVertical: 4,
            }}
          />
          <View
            style={{
              backgroundColor: "#49945A",
              width: "100%",
              height: 10,
              borderRadius: 5,
              marginVertical: 4,
            }}
          />
        </View>
        <View
          style={{
            width: 300,
            height: 100,
            backgroundColor: "#49945A",
            borderRadius: 10,
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 130,
    // backgroundColor: "#999",
    // width: "100%",
  },
  top: {
    // width: "100%",
    // gap: height * 0.005,
    backgroundColor: "red",
  },
});

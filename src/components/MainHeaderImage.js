import { StyleSheet, Image, View } from "react-native";
import React from "react";
import Images from "../utils/images";
import { useTheme } from "@shopify/restyle";

const MainHeaderImage = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        position: "relative",
        // top: -theme.spacing.m,
      }}
    >
      <Image source={Images.mainHeader} />
    </View>
  );
};

export default MainHeaderImage;

const styles = StyleSheet.create({});

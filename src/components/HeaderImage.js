import { StyleSheet, Image, View } from "react-native";
import React from "react";
import Images from "../utils/images";
import { useTheme } from "@shopify/restyle";

const HeaderImage = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        position: "relative",
        top: -theme.spacing.m,
      }}
    >
      <Image source={Images.onBoardHeader} />
    </View>
  );
};

export default HeaderImage;

const styles = StyleSheet.create({
  header: {
    position: "relative",
  },
});

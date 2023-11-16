import { StyleSheet, Image, View, Dimensions } from "react-native";
import React from "react";
import Images from "../utils/images";
import { useTheme } from "@shopify/restyle";
const { width, height } = Dimensions.get("screen");
const HeaderImage = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        position: "relative",
        top: -theme.spacing.m,
      }}
    >
      <Image source={Images.onBoardHeader} style={styles.image} />
    </View>
  );
};

export default HeaderImage;

const styles = StyleSheet.create({
  header: {
    position: "relative",
  },
  image: {
    resizeMode: "cover",
    width: width,
  },
});

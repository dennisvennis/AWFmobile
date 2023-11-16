import React from "react";
import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import Texts from "../Texts";
import { useTheme } from "@shopify/restyle";

const { height, width } = Dimensions.get("window");

const OnboardingItem = ({ item }) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={[styles.image, { resizeMode: "contain" }]}
        />
      </View>
      <View style={{ marginTop: theme.spacing.s, width: "60%" }}>
        <Texts variant="h2" style={styles.title}>
          {item.title}
        </Texts>
        <Texts variant="p" style={styles.description}>
          {item.description}
        </Texts>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 100,
  },
  imageContainer: {
    width,
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    justifyContent: "center",
    width: "50%",
  },
  title: {
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    // fontSize: width * 0.04,
  },
});

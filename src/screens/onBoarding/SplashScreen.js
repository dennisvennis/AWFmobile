import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Images from "../../utils/images";
import SplashImage from "../../assets/svg/splash.svg";
import asyncStorage from "../../utils/asyncStorage";
const { width } = Dimensions.get("screen");

const SplashScreen = ({ navigation }) => {
  const updateScreen = async () => {
    const value = await asyncStorage.getData("viewedOnboarding");
    if (value) {
      navigation.navigate("combineNavigation");
    } else {
      navigation.navigate("introductionscreen");
    }
  };

  useEffect(() => {
    setTimeout(updateScreen, 5000);
  });
  return (
    <View style={styles.screen}>
      <Image style={styles.image} source={Images.spashImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  screen: {
    width,
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  image: {
    width: width,
    resizeMode: "cover",
    height: "60%",
  },
});

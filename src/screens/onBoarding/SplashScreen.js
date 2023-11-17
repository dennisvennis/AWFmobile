import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Images from "../../utils/images";
import SplashImage from "../../assets/svg/splash.svg";
const { width } = Dimensions.get("screen");
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("introductionscreen");
    }, 5000);
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
  },
  image: {
    width: width,
    resizeMode: "cover",
    height: "60%"  },
});

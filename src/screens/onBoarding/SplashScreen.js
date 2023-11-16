import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import Images from "../../utils/images";
import SvgImages from "../../components/SvgImages";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("introductionscreen");
    }, 5000);
  });
  return (
    <View style={styles.screen}>
      {/* <SvgImages source={Images.spashSvg} /> */}
      <Image style={styles.image} source={Images.spashImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
  },
});

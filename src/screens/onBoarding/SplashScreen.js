import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import Images from "../../utils/images";

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
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
  },
});

import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Images from "../utils/images";
import ArrowBack from "../assets/svg/arrowLeft.svg";
import LogoutIcon from "../assets/svg/logout.svg";
import { useTheme } from "@shopify/restyle";

const { width, height } = Dimensions.get("screen");

const OtherTabHeader = ({navigateTo,auth}) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <Image source={Images.mainHeader} style={styles.image} />
      <View style={{ ...styles.container, padding: theme.spacing.l }}>
        <TouchableOpacity style={styles.icons} onPress={()=>navigation.navigate(navigateTo)} activeOpacity={0.9}>
          <ArrowBack />
        </TouchableOpacity>

        <TouchableOpacity style={styles.notifyicon} onPress={()=>navigation.navigate(auth)} activeOpacity={0.9}>
          <LogoutIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtherTabHeader;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    resizeMode: "contain",
    height: "100%",
    position: "absolute",
    top: -height * 0.045,
  },
  imageMain: {
    width: "100%",
    resizeMode: "contain",
    height: 200,
    position: "absolute",
    top: -height * 0.045,
  },

  mainContainer: {
    position: "relative",
    height: 150,
  },

  container: {
    width: "100%",
    height: 80,
    position: "relative",
    top: height * 0.06,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "rgba(0,0,0,0.2)",
  },
  containerHead: {
    width: "100%",
    // height: 80,
    position: "relative",
    top: height * 0.095,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  notifyicon: {
    position: "relative",
    // top: -height * 0.009,
  },
});

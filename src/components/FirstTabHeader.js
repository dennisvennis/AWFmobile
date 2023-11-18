import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Images from "../utils/images";
import React from "react";
import NotificationIcon from "../assets/svg/notificationBell.svg";
import { useTheme } from "@shopify/restyle";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const FirstTabHeader = ({notify}) => {
  const theme = useTheme();
  const navigation = useNavigation()
  return (
    <View style={styles.mainContainer}>
      <Image source={Images.onBoardHeader} style={styles.imageMain} />
      <View style={{ ...styles.containerHead, padding: theme.spacing.l }}>
        <TouchableOpacity style={styles.notifyicon} onPress={()=> navigation.navigate(notify)} activeOpacity={0.9}>
          <NotificationIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FirstTabHeader;

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
    top: -height * 0.01,
  },
});

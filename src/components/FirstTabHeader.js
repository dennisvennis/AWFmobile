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
import LogoutIcon from "../assets/svg/logout.svg";
import { useTheme } from "@shopify/restyle";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/slices/usersSlice";
import asyncStorage from "../utils/asyncStorage";

const { width, height } = Dimensions.get("screen");

const FirstTabHeader = ({ auth }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(clearUser());
    await asyncStorage.clearData("token");
    navigation.navigate("combineNavigation");
  };

  return (
    <View style={styles.mainContainer}>
      <Image source={Images.onBoardHeader} style={styles.imageMain} />
      <View style={{ ...styles.containerHead, padding: theme.spacing.l }}>
        <TouchableOpacity
          style={styles.notifyicon}
          onPress={handleLogout}
          activeOpacity={0.9}
        >
          <LogoutIcon />
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

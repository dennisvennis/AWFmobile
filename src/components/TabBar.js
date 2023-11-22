import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import Images from "../utils/images";
import Texts from "./Texts";
import { Height, Width } from "../utils/dimensions";
import { useTheme } from "@shopify/restyle";
import dashboardOutline from "../assets/svg/dashboardOutline.svg";
import dashboardFill from "../assets/svg/dashboardFill.svg";
import logoutOutline from "../assets/svg/logoutOutline.svg";
import logoutFill from "../assets/svg/logoutFill.svg";
import receiveOutline from "../assets/svg/receiveOutline.svg";
import receiveFill from "../assets/svg/receiveFill.svg";
import NotificationFill from "../assets/svg/notificationFill.svg"
import NotificationOutline from "../assets/svg/notificationOutline.svg"

const { width, height } = Dimensions.get("screen");

const TabBar = (props) => {
  const theme = useTheme();
  const routes = [
    {
      title: "Dashboard",
      Icon: dashboardOutline,
      routeName: "dashboardscreen",
      SelectedIcon: dashboardFill,
    },
    {
      title: "Receive",
      Icon: receiveOutline,
      routeName: "receivescreen",
      SelectedIcon: receiveFill,
    },
    {
      title: "Notification",
      Icon: NotificationOutline,
      routeName: "notificationscreen",
      SelectedIcon: NotificationFill,
    },
  ];
  const onPress = (item) => {
    props.navigation.navigate(item.routeName);
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.mainBackground,
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      {routes.map((item, index) => (
        <TouchableOpacity
          onPress={() => onPress(item)}
          style={styles.button}
          key={index}
        >
          <React.Fragment>
            {props?.state?.index === index ? (
              <item.SelectedIcon />
            ) : (
              <item.Icon />
            )}
            <Texts
              style={{
                fontSize: Height(1.8),
                color:
                  props?.state?.index === index
                    ? theme.colors.greenText
                    : theme.colors.textLight,
                marginTop: 2,
              }}
              variant="p"
            >
              {item?.title}
            </Texts>
          </React.Fragment>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Height(2),
    paddingBottom: Height(2),
    width: Width(20),
    width: width * 0.3,
    //borderRadius: Width(30),
  },
  container: {
    shadowColor: "#000",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 10,
  },
});

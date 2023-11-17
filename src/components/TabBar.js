import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import Images from "../utils/images";
import Texts from "./Texts";
import { Height, Width } from "../utils/dimensions";
import { useTheme } from "@shopify/restyle";
import dashboardOutline from "../assets/svg/dashboardOutline.svg";
import dashboardFill from "../assets/svg/dashboardFill.svg";
import logoutOutline from "../assets/svg/logoutOutline.svg";
import logoutFill from "../assets/svg/logoutOutFill.svg";
import receiveOutline from "../assets/svg/receiveOutline.svg";
import receiveFill from "../assets/svg/receiveFill.svg";

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
      title: "Logout",
      Icon: logoutOutline,
      routeName: "logoutscreen",
      SelectedIcon: logoutFill,
    },
  ];
  const onPress = (item) => {
    props.navigation.navigate(item.routeName);
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.mainBackgorund,
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
              <Image source={item.SelectedIcon} />
            ) : (
              <Image source={item.Icon} />
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
    //borderRadius: Width(30),
  },
});

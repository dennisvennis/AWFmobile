import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Texts from "../Texts";
import ChatSvg from "../../assets/svg/chat.svg";
const { height, width } = Dimensions.get("screen");

const Notifications = (props) => {
  return (
    <View style={{ ...styles.activity, ...props.style }}>
      <View style={styles.activity_img}>
        <ChatSvg width="20" height="20" />
      </View>
      <View style={styles.activity_text}>
        <Texts
          variant="p"
          style={{
            textTransform: "capitalize",
            color: "#84919A",
          }}
        >
          {props.title}
        </Texts>
        <Texts variant="p" style={{ ...styles.message }}>
          {props.body}
        </Texts>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  activity: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: height * 0.019,
  },
  message: {
    maxWidth: 300,
  },
});

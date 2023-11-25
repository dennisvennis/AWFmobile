import { StyleSheet, ScrollView, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@shopify/restyle";
import Notifications from "../../components/UI/Notifications";
import Texts from "../../components/Texts";
const { width, height } = Dimensions.get("screen");

const NotificationsScreen = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const data = require("../../utils/notificationDummy.json");
    setNotifications(data);
  }, []);

  return (
    <View style={{ ...styles.screen, paddingHorizontal: theme.spacing.l }}>
    <View
      style={{
        ...styles.activitesHeader,
        marginBottom: theme.spacing.m,
      }}
    >
      <View
        style={{
          borderRadius: theme.borderRadius.s,
          backgroundColor: theme.colors.lighterGreen,
        }}
      >
        <Texts
          variant="p"
          style={{
            ...styles.cardHeadertxt,
            color: theme.colors.greenText,
          }}
        >
         Notifications
        </Texts>
      </View>
    </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ ...styles.container }}
      >
        <View style={styles.activity_cont}>
          {notifications.map((data) => (
            <Notifications key={data.id} {...data} style={styles.notify}/>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 130,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20
  },
  container: {
    flex: 1,
    width: "100%",
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0ECE1",
    paddingTop: height * 0.02,
    paddingBottom: height * 0.015,
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeadertxt: {
    paddingVertical: height * 0.003,
    paddingHorizontal: height * 0.01,
    fontSize: height * 0.019,
  },
  activitesHeader: {
    width: "100%",
    padding: 1,
    alignItems: "flex-start",
    marginTop: 15
  },
  activity_cont: {
    rowGap: height * 0.02,
  },
  activity: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: height * 0.019,
  },
  notify:{
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
    paddingBottom: 16
  }
});

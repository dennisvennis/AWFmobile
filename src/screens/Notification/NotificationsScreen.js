import { StyleSheet, ScrollView, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@shopify/restyle";
import Notifications from "../../components/UI/Notifications";
import Texts from "../../components/Texts";
import ApiServices from "../../services/ApiServices";
import NotFoundSvg from "../../assets/svg/notFound.svg";
const { width, height } = Dimensions.get("screen");

const NotificationsScreen = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const fecthData = async () => {
      setIsLoading(true);
      try {
        const {
          data: { content },
          status,
        } = await ApiServices.getAllNotifications(5, 0, false);
        if (status === 200) {
          setNotification(content);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, []);

  return isLoading ? (
    <View style={{ ...styles.screen, paddingHorizontal: theme.spacing.l }}>
      <SkeletonLoader />
    </View>
  ) : (
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
          {notification?.length >= 1 ? (
            notification.map((data) => (
              <Notifications key={data.id} {...data} />
            ))
          ) : (
            <View style={styles.notFound}>
              <NotFoundSvg width={height * 0.06} height={height * 0.06} />
              <Texts
                variant="p"
                style={{
                  ...styles.notFoundTxt,
                  paddingVertical: theme.spacing.m,
                }}
              >
                No Requests
              </Texts>
            </View>
          )}
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
    paddingBottom: 20,
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
    marginTop: 15,
  },
  activity_cont: {
    rowGap: height * 0.02,
  },
  activity: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: height * 0.019,
  },
  notify: {
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
    paddingBottom: 16,
  },
  notFound: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: height * 0.25,
  },
  notFoundTxt: {
    fontSize: height * 0.02,
    textAlign: "center",
    color: "#A2AAB1",
  },
});

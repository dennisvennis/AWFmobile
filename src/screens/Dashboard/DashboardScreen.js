import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@shopify/restyle";
import Card from "../../components/Card";
import Texts from "../../components/Texts";
import PieChart from "../../components/PieChart";
import notificationDummy from "../../utils/notificationDummy.json";
import ChatSvg from "../../assets/svg/chat.svg";

const { height } = Dimensions.get("screen");

const DashboardScreen = () => {
  const theme = useTheme();
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const selectedActivities = notificationDummy.filter(
      (data, index) => index < 5
    );
    setRecentActivities(selectedActivities);
  }, []);
  return (
    <View style={{ ...styles.screen, paddingHorizontal: theme.spacing.l }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          ...styles.container,
        }}
      >
        <Card
          style={{
            ...styles.cardContainer1,
            marginBottom: theme.spacing.xl,
          }}
        >
          <Texts variant="p" style={{ fontSize: theme.spacing.m }}>
            Good morning,
          </Texts>
          <Texts variant="h1" style={{ fontSize: theme.spacing.l }}>
            Maryam
          </Texts>
          <Texts
            variant="p"
            style={{
              fontSize: height * 0.018,
              color: theme.colors.textLight,
              width: "80%",
            }}
          >
            Here is what is happeneing with your requests today
          </Texts>
        </Card>
        <Card
          style={{
            ...styles.cardContainer2,
            marginBottom: theme.spacing.xl,
          }}
        >
          <View style={styles.cardHeader}>
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
                Received Request Status
              </Texts>
            </View>
          </View>
          <View style={{ ...styles.cardBody, padding: theme.spacing.l }}>
            <PieChart />
          </View>
        </Card>
        <View
          style={{
            ...styles.activitesContainer,
            marginBottom: theme.spacing.xl,
            paddingBottom: theme.spacing.xl,
          }}
        >
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
                Recent Activities
              </Texts>
            </View>
          </View>
          <View style={styles.activity_cont}>
            {recentActivities.map((data) => (
              <View style={styles.activity} key={data.id}>
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
                    {data.title}
                  </Texts>
                  <Texts variant="p" style={{}}>
                    {data.message}
                  </Texts>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 130,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 20,
  },
  cardContainer1: {
    width: "100%",
    gap: height * 0.005,
    backgroundColor: "#FDFDFD",
  },
  cardContainer2: {
    width: "100%",
    padding: 1,
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
    fontSize: height * 0.016,
  },
  activitesHeader: {
    width: "100%",
    padding: 1,
    alignItems: "flex-start",
  },
  activity_cont: {
    rowGap: height * 0.02,
  },
  activity: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: height * 0.019,
  },
});

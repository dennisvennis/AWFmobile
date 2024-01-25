import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Texts from "../../components/Texts";
import { useTheme } from "@shopify/restyle";
import ExpenseSvg from "../../assets/svg/expense.svg";
import TagSvg from "../../assets/svg/tag.svg";
import CalenderSvg from "../../assets/svg/calendar.svg";
import { dateFormatter } from "../../utils/dateFormatter";
import Timeline from "./components/Timeline";
import Comment from "./components/Comment";
import ExpenseDetails from "./components/ExpenseDetails";
import RequestManager from "./components/RequestManager";
import Document from "./components/Document";
import ApiServices from "../../services/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../../store/slices/requestSlice";

const { width, height } = Dimensions.get("screen");

const SingleReceiveScreen = ({ route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [request, setRequest] = useState({});
  const [update, setUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [comments, setComments] = useState([]);

  const { data } = route.params;
  const dataId = data.id;
  const statusStyle = () => {
    switch (data.status) {
      case "approved":
        return styles.successStyle;
      case "rejected":
        return styles.failureStyle;
      case "pending":
        return styles.pendingStyle;
      case "returned":
        return styles.returnedStyle;
      case "paid":
        return styles.paidStyle;
      case "declined":
        return styles.declinedStyle;
      case "payment_in_progress":
        return styles.paymentStyle;
      default:
        return styles.defaultStyle;
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const {
          data: { data },
          status: statusCode,
        } = await ApiServices.veiwComments(dataId);
        if (statusCode === 200) {
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [update]);

  useEffect(() => {
    let params = {
      type: "received",
    };
    dispatch(getRequests(params));
  }, [refresh, dispatch]);

  return (
    <View
      style={{
        ...styles.screen,
        paddingHorizontal: theme.spacing.l,
        gap: theme.spacing.xl,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.header}>
          <Texts
            variant="p"
            style={{ ...styles.hedHeader, color: theme.colors.greenText }}
          >
            {data.title}
          </Texts>
          <View style={styles.hed_name}>
            <Texts
              style={{
                ...styles.hed_namTxt,
                color: theme.colors.textColor,
              }}
            >
              by
            </Texts>
            <Texts
              style={{
                ...styles.hed_namTxt,
                color: theme.colors.greenText,
                textTransform: "capitalize",
              }}
            >
              {data.requester.firstName}
            </Texts>
          </View>
          <View style={styles.hed_flex_cont}>
            <View style={styles.hed_flex}>
              <ExpenseSvg width={height * 0.025} height={height * 0.025} />
              <Texts
                variant="p"
                style={{ ...styles.hed_flex_txt, color: "#8B938D" }}
              >
                {data.dasTypes}
              </Texts>
            </View>
            <View style={styles.hed_flex}>
              <TagSvg width={height * 0.025} height={height * 0.025} />
              <Texts
                variant="p"
                style={{ ...styles.hed_flex_txt, color: "#8B938D" }}
              >
                {data.ticketNumber}
              </Texts>
            </View>
            <View style={styles.hed_flex}>
              <CalenderSvg width={height * 0.025} height={height * 0.025} />
              <Texts
                variant="p"
                style={{ ...styles.hed_flex_txt, color: "#8B938D" }}
              >
                {dateFormatter(data.createdAt)}
              </Texts>
            </View>
          </View>
          <View style={[styles.topSectionrght, statusStyle()]}>
            <Texts
              style={{
                ...styles.topSectionrghtTxt,
                color: data === "pending" ? "#8F5E14" : "#fff",
              }}
            >
              {data.status}
            </Texts>
          </View>
        </View>
        <RequestManager
          data={data}
          comments={comments}
          setUpdate={setRefresh}
        />
        <ExpenseDetails data={data} />
        <Document data={data} />
        <Timeline update={update} comments={comments} />
        <Comment data={data} setUpdate={setUpdate} />
      </ScrollView>
    </View>
  );
};

export default SingleReceiveScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 130,
  },
  container: {
    // flex: 1,
    width: "100%",
  },
  header: {
    rowGap: height * 0.005,
  },
  hedHeader: {
    paddingTop: 20,
    textTransform: "capitalize",
    fontSize: height * 0.03,
  },
  hed_name: {
    flexDirection: "row",
    gap: 5,
  },
  hed_namTxt: {
    fontSize: height * 0.02,
    fontWeight: 600,
  },
  hed_flex_cont: {
    rowGap: height * 0.01,
    marginTop: 10,
  },
  hed_flex: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  hed_flex_txt: {
    fontSize: height * 0.018,
    textTransform: "capitalize",
  },
  successStyle: {
    backgroundColor: "#49945A",
  },
  failureStyle: {
    backgroundColor: "#ED3232",
  },
  pendingStyle: {
    backgroundColor: "#F2C523",
  },
  returnedStyle: {
    backgroundColor: "#3258BA",
  },
  paidStyle: {
    backgroundColor: "#1487AB",
  },
  declinedStyle: {
    backgroundColor: "#E86F3B",
  },
  paymentStyle: {
    backgroundColor: "#3258BA",
  },
  topSectionrght: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    width: width * 0.25,
    marginVertical: height * 0.03,
  },
  topSectionrghtTxt: {
    textTransform: "capitalize",
    fontWeight: 600,
  },
});

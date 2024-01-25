import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Texts from "../../../components/Texts";
import { useTheme } from "@shopify/restyle";
import { useNavigation } from "@react-navigation/native";
import { dateFormatter } from "../../../utils/dateFormatter";

const { width, height } = Dimensions.get("screen");

const Request = ({
  id,
  title,
  dasTypes,
  requester,
  status,
  createdAt,
  data,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();

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

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={
        () =>
          navigation.navigate("singlereceive", {
            data,
          })
        // navigation.navigate("singlereceive")
      }
    >
      <View style={styles.topSection}>
        <Texts
          style={{ ...styles.topSectionlft, color: theme.colors.greenText }}
        >
          {data.dasTypes}
        </Texts>
        <View style={[styles.topSectionrght, statusStyle()]}>
          <Texts
            style={{
              ...styles.topSectionrghtTxt,
              color: data.status === "pending" ? "#8F5E14" : "#fff",
            }}
          >
            {data.status}
          </Texts>
        </View>
      </View>
      <View style={styles.midSection}>
        <Texts style={styles.midTxt1}>{data.title}</Texts>
        <Texts style={styles.midTxt2}>
          {data.requester.firstName} {data.requester.lastName}
        </Texts>
      </View>
      <View style={styles.lstSection}>
        <Texts
          style={{ ...styles.lstSectionTxt, color: theme.colors.greenText }}
        >
          {dateFormatter(data.createdAt)}
        </Texts>
      </View>
    </TouchableOpacity>
  );
};

export default Request;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#E0ECE1",
    borderRadius: 5,
    padding: 16,
    paddingTop: 20,
    marginBottom: height * 0.025,
  },
  topSection: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topSectionlft: {
    textTransform: "capitalize",
  },
  topSectionrght: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
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
  topSectionrghtTxt: {
    textTransform: "capitalize",
    // color: "#fff",
    fontWeight: 600,
  },
  midTxt1: {
    fontWeight: 600,
    fontSize: height * 0.022,
    textTransform: "capitalize",
  },
  midTxt2: {
    textTransform: "capitalize",
  },
  lstSection: {
    marginTop: height * 0.02,
    borderTopWidth: 1,
    borderTopColor: "#E0ECE1",
    paddingTop: height * 0.02,
  },
  lstSectionTxt: {
    fontWeight: 600,
    textTransform: "capitalize",
  },
});

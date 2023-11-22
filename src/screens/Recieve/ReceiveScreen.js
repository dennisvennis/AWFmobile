import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@shopify/restyle";
import Texts from "../../components/Texts";
import ArrowUpDownSvg from "../../assets/svg/arrowupdown.svg";
const { width, height } = Dimensions.get("screen");
import DatePickers from "./components/DataPickers";

const ReceiveScreen = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.screen,
        paddingHorizontal: theme.spacing.l,
        gap: theme.spacing.xl,
      }}
    >
      <View style={styles.container}>
        <View style={{ paddingVertical: theme.spacing.l }}>
          <Texts variant="h1">Received Requests</Texts>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            ...styles.dateContainer,
            padding: theme.spacing.m,
            borderRadius: theme.borderRadius.s,
          }}
        >
          <Texts
            style={styles.dateContainerTxt}
          >{`2021/04/08 - 2021/04/10`}</Texts>
          <ArrowUpDownSvg />
        </TouchableOpacity>
        <DatePickers/>
      </View>
    </View>
  );
};

export default ReceiveScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#dadada",
  },
  dateContainerTxt: {
    fontSize: width * 0.04,
  },
});

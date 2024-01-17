import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@shopify/restyle";
import Texts from "../../components/Texts";
import ArrowUpDownSvg from "../../assets/svg/arrowupdown.svg";
import DatePickers from "./components/DataPickers";
import TabHeaders from "./components/TabHeaders";
import Request from "./components/Request";
import NotFoundSvg from "../../assets/svg/notFound.svg";
import ApiServices from "../../services/ApiServices";

const { width, height } = Dimensions.get("screen");

const ReceiveScreen = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("all");
  const [isLoading, setIsLoading] = useState("");

  let params = {};
  if (status === "all") {
    params = {};
  } else if (status === "payment in progress") {
    params = {
      status: "payment_in_ progress",
    };
  } else {
    params = {
      status,
    };
  }
  if (startDate && startDate !== "") {
    params.startDate = startDate;
  }

  if (endDate && endDate !== "") {
    params.endDate = endDate;
  }
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const {
          data: {
            data: { content },
          },
          status: statusCode,
        } = await ApiServices.getRequest(params);
        if (statusCode === 200) {
          setData(content);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [status, startDate, endDate]);

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
          onPress={() => setIsModalOpen(true)}
          style={{
            ...styles.dateContainer,
            padding: theme.spacing.m,
            borderRadius: theme.borderRadius.s,
          }}
        >
          <Texts style={styles.dateContainerTxt}>
            {startDate && endDate
              ? `${startDate}- ${endDate}`
              : "Filter by date"}
          </Texts>
          <ArrowUpDownSvg />
        </TouchableOpacity>
        <DatePickers
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <TabHeaders setStatus={setStatus} status={status} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.requesContainer}>
            {data.length > 0 &&
              data.map((data) => {
                return <Request key={data.id} data={data} />;
              })}
            {data.length == 0 && (
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
  requesContainer: {
    marginTop: 24,
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

import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Svg, Circle } from "react-native-svg";
import { useTheme } from "@shopify/restyle";
import Texts from "./Texts";
import ApiServices from "../services/ApiServices";
const { height, width } = Dimensions.get("screen");

const statusList = [
  { name: "Approved", color: "#49945A" },
  { name: "Pending", color: "#F2C523" },
  { name: "Returned", color: "#3258BA" },
  { name: "Paid", color: "#1487AB" },
  { name: "Rejected", color: "#ED3232" },
];

const PieChart = ({ size = 150, strokeWidth = 40 }) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startAngles, setStartAngles] = useState([]);
  const [request, setRequest] = useState([]);
  const [pendingRequest, setPendingRequest] = useState([]);
  const [approvedRequest, setApprovedRequest] = useState([]);
  const [rejectedRequest, setRejectedRequest] = useState([]);
  const [returnedRequest, setReturnedRequest] = useState([]);
  const [paidRequest, setPaidRequest] = useState([]);
  const [fetchedData, setFetchedData] = useState([
    { name: "", percentage: 0, color: "" },
  ]);
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const fetch = async () => {
      const params = { type: "received" };
      setIsLoading(true);
      try {
        const {
          data: {
            data: { content },
          },
          status,
        } = await ApiServices.getRequest(params);
        if (status === 200) {
          setRequest(content);
          content.forEach((data) => {
            switch (data.status) {
              case "pending":
                setPendingRequest((prev) => [...prev, data]);
                break;
              case "rejected":
                setRejectedRequest((prev) => [...prev, data]);
                break;
              case "approved":
                setApprovedRequest((prev) => [...prev, data]);
                break;
              case "returned":
                setReturnedRequest((prev) => [...prev, data]);
                break;
              case "paid":
                setPaidRequest((prev) => [...prev, data]);
                break;
            }
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    let approvedObj = {
      name: "Approved",
      color: "#49945A",
      percentage: approvedRequest.length / request.length,
    };

    let rejectedObj = {
      name: "Rejected",
      color: "#ED3232",
      percentage: rejectedRequest.length / request.length,
    };
    let pendingObj = {
      name: "Pending",
      color: "#F2C523",
      percentage: pendingRequest.length / request.length,
    };
    let returnedObj = {
      name: "Returned",
      color: "#3258BA",
      percentage: returnedRequest.length / request.length,
    };
    let paidObj = {
      name: "Paid",
      color: "#1487AB",
      percentage: paidRequest.length / request.length,
    };
    if (
      approvedObj.percentage !== NaN &&
      pendingObj.percentage !== NaN &&
      returnedObj.percentage !== NaN &&
      paidObj.percentage !== NaN &&
      rejectedObj.percentage !== NaN
    ) {
      let dataArray = [
        approvedObj,
        rejectedObj,
        pendingObj,
        returnedObj,
        paidObj,
      ];
      dataArray.sort((a, b) => b.percentage - a.percentage);
      setFetchedData([...dataArray]);
    }
  }, [
    approvedRequest,
    pendingRequest,
    rejectedRequest,
    returnedRequest,
    paidRequest,
  ]);

  const refresh = () => {
    let angle = 0;
    const angles = [];
    fetchedData.forEach((item) => {
      angles.push(angle);
      angle += item.percentage * 360;
    });
    setStartAngles(angles);
    // console.log("?????????///////", fetchedData);
    setData(fetchedData);
  };

  useEffect(() => {
    refresh();
  }, [fetchedData]);

  return (
    <View style={styles.container}>
      <View style={[{ width: size, height: size }, styles.rotate]}>
        <Svg viewBox={`0 0 ${size} ${size} `}>
          {data.map((item, index) => (
            <Circle
              key={index}
              fill={theme.colors.mainBackground}
              cy={center}
              cx={center}
              r={radius}
              strokeWidth={strokeWidth}
              stroke={item.color}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - item.percentage)}
              originX={center}
              originY={center}
              rotation={startAngles[index]}
            />
          ))}
        </Svg>
      </View>
      <View style={styles.indicatorContainer}>
        {statusList.map((data, index) => {
          return (
            <View key={index} style={styles.indict}>
              <View
                style={{ ...styles.indicator, backgroundColor: data.color }}
              ></View>
              <Texts
                variant="p"
                style={{
                  fontSize: height * 0.018,
                  color: theme.colors.textLight,
                }}
              >
                {data.name}
              </Texts>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PieChart;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  rotate: {
    transform: [{ rotateZ: "-90deg" }],
  },
  indicatorContainer: {
    rowGap: 10,
  },
  indict: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
});

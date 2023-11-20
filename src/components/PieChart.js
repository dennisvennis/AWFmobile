import { StyleSheet, Text, View ,Dimensions} from "react-native";
import React, { useEffect, useState } from "react";
import { Svg, Circle } from "react-native-svg";
import { useTheme } from "@shopify/restyle";
import Texts from "./Texts";
const {height, width} = Dimensions.get("screen")

const fetchedData = [
  { name: "Declined", percentage: 0.462068965517242, color: "#E86F3B" },
  { name: "Approved", percentage: 0.393103448275861, color: "#49945A" },
  { name: "Pending", percentage: 0.310344827586203, color: "#F2C523" },
  { name: "Returned", percentage: 0, color: "#3258BA" },
  { name: "Paid", percentage: 0, color: "#1487AB" },
  { name: "Rejected", percentage: 0, color: "#ED3232" },
];

const PieChart = ({ size = 150, strokeWidth = 40 }) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [startAngles, setStartAngles] = useState([]);
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const refresh = () => {
    let angle = 0;
    const angles = [];
    fetchedData.forEach((item) => {
      angles.push(angle);
      angle += item.percentage * 360;
    });
    setStartAngles(angles);
    setData(fetchedData);
  };

  useEffect(() => {
    refresh();
  }, []);

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
      <View  style={styles.indicatorContainer}>
      {data.map((data,index) => {
        return (
          <View key={index} style={styles.indict}>
            <View style={{...styles.indicator,backgroundColor: data.color}}></View>
            <Texts variant="p"  style={{
                fontSize: height * 0.018,
                color: theme.colors.textLight,
              }}>{data.name}</Texts>
          </View>
        );
      })}
    </View>
    </View>
  );
};

export default PieChart;

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-between"
    },
  rotate: {
    transform: [{ rotateZ: "-90deg" }],
  },
  indicatorContainer:{
    rowGap: 10
  },
  indict:{
    flexDirection:"row",
    gap: 10,
    alignItems:"center"
  },
  indicator:{
    width: 10,
    height: 10,
    borderRadius: 50
  }
});

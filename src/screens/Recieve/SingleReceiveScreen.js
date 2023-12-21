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
import ExpenseSvg from '../../assets/svg/expense.svg'
import TagSvg from '../../assets/svg/tag.svg'
import CalenderSvg from '../../assets/svg/calendar.svg'

const { width, height } = Dimensions.get("screen");

const SingleReceiveScreen = ({ route }) => {
  const theme = useTheme();
  const [request, setRequest] = useState([]);

  const { requestId , requestStatus} = route.params;

  const statusStyle = () => {
    switch (requestStatus) {
      case 'approved':
        return styles.successStyle;
      case 'rejected':
        return styles.failureStyle;
      case 'pending':
        return styles.pendingStyle;
      default:
        return styles.defaultStyle;
    }
  };

  useEffect(() => {
    const res = require("../../utils/request.json");
    const data = res.filter((data) => data.id === requestId);
    setRequest(data);
  }, []);

  return (
    <View
      style={{
        ...styles.screen,
        paddingHorizontal: theme.spacing.l,
        gap: theme.spacing.xl,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {request.map((request) => {
          const { id, title, staff ,category,status} = request;
          return (
            <View style={styles.header} key={id}>
              <Texts
                variant="p"
                style={{ ...styles.hedHeader, color: theme.colors.greenText }}
              >
                {title}
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
                  {staff}
                </Texts>
              </View>
              <View style={styles.hed_flex_cont}>
              <View style={styles.hed_flex}>
                  <ExpenseSvg width={height*0.025} height={height*0.025}/>
                  <Texts variant="p" style={{...styles.hed_flex_txt,color: "#8B938D"}}>{category}</Texts>
              </View>
              <View style={styles.hed_flex}>
                  <TagSvg width={height*0.025} height={height*0.025}/>
                  <Texts variant="p" style={{...styles.hed_flex_txt,color: "#8B938D"}}>AWF-6813353681</Texts>
              </View>
              <View style={styles.hed_flex}>
                  <CalenderSvg width={height*0.025} height={height*0.025}/>
                  <Texts variant="p" style={{...styles.hed_flex_txt,color: "#8B938D"}}>september 29,20203, 11:29:46 AM</Texts>
              </View>
              </View>
              <View style={[styles.topSectionrght,statusStyle()]}>
                <Texts style={{...styles.topSectionrghtTxt,color: requestStatus==="pending"? "#8F5E14": "#fff"}}>{status}</Texts>
              </View>
            </View>
          );
        })}
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
    flex: 1,
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
  hed_flex_cont:{
    rowGap: height * 0.01,
    marginTop: 10
  },
  hed_flex:{
    flexDirection:"row",
    gap: 10,
    alignItems:"center",
  },
  hed_flex_txt:{
    fontSize: height*0.018,
    textTransform:"capitalize",
  },
  successStyle:{
    backgroundColor:"#49945A"
  },
  failureStyle:{
    backgroundColor:"#ED3232"
  },
  pendingStyle:{
    backgroundColor:"#F2C523"
  },
  topSectionrght: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems:"center",
    width: width*0.22,
    marginVertical: height*0.03

  },
  topSectionrghtTxt: {
    textTransform: "capitalize",
    fontWeight: 600,
  },
});

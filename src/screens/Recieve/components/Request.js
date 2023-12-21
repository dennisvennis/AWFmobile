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

const { width, height } = Dimensions.get("screen");

const Request = ({id,title,staff,status,date,category}) => {
  const theme = useTheme();
  const navigation = useNavigation()

  const statusStyle = () => {
    switch (status) {
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

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={()=> navigation.navigate('singlereceive',{requestId:id,requestStatus: status})}>
      <View style={styles.topSection}>
        <Texts
          style={{ ...styles.topSectionlft, color: theme.colors.greenText }}
        >
          {category}
        </Texts>
        <View style={[styles.topSectionrght,statusStyle()]}>
          <Texts style={{...styles.topSectionrghtTxt,color: status==="pending"? "#8F5E14": "#fff"}}>{status}</Texts>
        </View>
      </View>
      <View style={styles.midSection}>
        <Texts style={styles.midTxt1}>{title}</Texts>
        <Texts style={styles.midTxt2}>{staff}</Texts>
      </View>
      <View style={styles.lstSection}>
        <Texts style={{...styles.lstSectionTxt,color:theme.colors.greenText}}>
          september 29,20203, 11:29:46 AM
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
    marginBottom: height*0.025,
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
  successStyle:{
backgroundColor:"#49945A"
  },
  failureStyle:{
backgroundColor:"#ED3232"
  },
  pendingStyle:{
backgroundColor:"#F2C523"
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
  midTxt2:{
    textTransform:"capitalize"
  },
  lstSection:{
    marginTop: height*0.02,
    borderTopWidth:1,
    borderTopColor: "#E0ECE1",
    paddingTop:height*0.02
  },
  lstSectionTxt:{
    fontWeight:600,
    textTransform:"capitalize"
  }
});

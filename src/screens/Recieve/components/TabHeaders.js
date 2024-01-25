import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import Texts from "../../../components/Texts";
const { width, height } = Dimensions.get("window");

const TabHeaders = ({ setStatus, status }) => {
  const filterBy = [
    "all",
    "pending",
    "approved",
    "returned",
    "rejected",
    "paid",
    "payment in progress",
  ];
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.navContainer}>
          {filterBy.map((data, index) => (
            <TouchableOpacity
              activeOpacity={0.9}
              key={index}
              style={status === data ? styles.navItem_active : styles.navItem}
              onPress={() => setStatus(data)}
            >
              <Texts
                variant="p"
                style={status === data ? styles.item_active : styles.item}
              >
                {data}
              </Texts>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TabHeaders;

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // marginTop: 16,
    // gap: height * 0.03,
    // backgroundColor: "yellow",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    gap: height * 0.03,
  },
  navItem: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0ECE1",
  },
  navItem_active: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#49945A",
  },
  item: {
    textTransform: "capitalize",
    color: "#252C32",
  },
  item_active: {
    textTransform: "capitalize",
    color: "#49945A",
  },
});

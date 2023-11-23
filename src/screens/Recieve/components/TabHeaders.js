import { StyleSheet, View,TouchableOpacity } from "react-native";
import React from "react";
import Texts from "../../../components/Texts";

const TabHeaders = ({ setStatus, status }) => {
  const filterBy = ["all", "approved", "rejected", "pending"];
  return (
    <View style={styles.navContainer}>
      {filterBy.map((data, index) => (
        <TouchableOpacity
        activeOpacity={0.9}
          key={index}
          style={status === data ? styles.navItem_active : styles.navItem}
          onPress={()=> setStatus(data)}
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
  );
};

export default TabHeaders;

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
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

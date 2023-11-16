import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderImage from "../../components/HeaderImage";

const DashboardScreen = () => {
  return (
    <View style={styles.screen}>
      <HeaderImage />
      <View style={styles.container}>
        <Text style={styles.text}>DashboardScreen</Text>
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});

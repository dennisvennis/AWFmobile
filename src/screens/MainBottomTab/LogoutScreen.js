import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainHeaderImage from "../../components/MainHeaderImage";

const LogoutScreen = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.text}>LogoutScreen</Text>
      </View>
    </View>
  );
};

export default LogoutScreen;

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

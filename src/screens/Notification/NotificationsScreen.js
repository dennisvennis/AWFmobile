import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NotificationsScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>NotificationsScreen</Text>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  }
});
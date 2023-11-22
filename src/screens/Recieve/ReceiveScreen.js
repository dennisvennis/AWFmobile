import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReceiveScreen = () => {
  return (
    <View style={styles.screen}>
    <View style={styles.container}>
      <Text style={styles.text}>ReceiveScreens</Text>
    </View>
  </View>
  )
}

export default ReceiveScreen

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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
  
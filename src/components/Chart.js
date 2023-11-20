import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit';


const data = [
    { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)' },
    { name: 'Toronto', population: 2800000, color: 'rgba(255, 123, 89, 1)' },
    { name: 'New York', population: 8538000, color: 'rgba(123, 255, 123, 1)' },
    { name: 'Moscow', population: 11920000, color: 'rgba(0, 0, 255, 0.7)' },
  ];

const Chart = () => {
  return (
    <View style={styles.container}>
    <PieChart
      data={data}
      width={300}
      height={200}
      chartConfig={{
        backgroundColor: 'transparent',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15" 
      style={{ borderRadius: 15 }}
      hasLegend={false}
      absolute
    />
  </View>
  )
}

export default Chart

const styles = StyleSheet.create({})
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickers = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  const handleQuery = () => {
    // Perform your query using the startDate and endDate
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showStartDatePickerModal}>
        <Text>Select Start Date</Text>
      </TouchableOpacity>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="spinner"
          onChange={handleStartDateChange}
        />
      )}

      <TouchableOpacity onPress={showEndDatePickerModal}>
        <Text>Select End Date</Text>
      </TouchableOpacity>

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="spinner"
          onChange={handleEndDateChange}
        />
      )}

      <TouchableOpacity onPress={handleQuery} style={styles.queryButton}>
        <Text style={styles.queryButtonText}>Query</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DatePickers;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    datePicker: {
      width: 200,
      marginBottom: 20,
    },
    queryButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    queryButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import Texts from "../../../components/Texts";
import { useTheme } from "@shopify/restyle";
import Toast from "react-native-toast-message";
import Button from "../../../components/Button";

const DatePickers = ({
  setIsModalOpen,
  isModalOpen,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [isStartDate, setIsStartDate] = useState(false);
  const [isEndDate, setIsEndDate] = useState(false);
  const [presentDate, setPresentdate] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setPresentdate(formattedDate);
  }, []);

  const handleStartButton = () => {
    setIsStartDate(true);
    setIsEndDate(false);
  };
  const handleSelectedStartDate = (date) => {
    setStartDate(date);
    setIsStartDate(false);
  };
  const handleEndButton = () => {
    setIsEndDate(true);
    setIsStartDate(false);
  };
  const handleSelectedEndDate = (date) => {
    if (startDate === "") {
      Toast.show({
        type: "error",
        text1: "Please select start date",
        visibilityTime: 3000,
      });

      setIsEndDate(false);
      return;
    }
    setEndDate(date);
    setIsEndDate(false);
    setIsModalOpen(false)
  };
  const handleCloseModal = () => {
    setStartDate(false);
    setEndDate(false);
    setIsStartDate(false);
    setIsEndDate(false);
    setIsModalOpen(false);
  };
  return (
    <Modal transparent={true} visible={isModalOpen}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={handleStartButton}
              activeOpacity={0.9}
            >
              <Texts variant="p" style={{ color: theme.colors.greenText }}>
                Start Date
              </Texts>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={handleEndButton}
              activeOpacity={0.9}
            >
              <Texts variant="p" style={{ color: theme.colors.greenText }}>
                End Date
              </Texts>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer2}>
            <Texts variant="p">{startDate && startDate}</Texts>
            <Texts variant="p">{startDate && "-"}</Texts>
            <Texts variant="p">{endDate && "-"}</Texts>
            <Texts variant="p">{endDate && endDate}</Texts>
          </View>
          {isStartDate && (
            <View style={{marginBottom: theme.spacing.m}}>
              <Texts
                variant="h2"
                style={{ marginBottom: theme.spacing.m, color: "#49945A" }}
              >
                Select start date
              </Texts>
              <DatePicker
                options={{
                  backgroundColor: "#111",
                  textHeaderColor: "#fff",
                  textDefaultColor: "#fff",
                  selectedTextColor: "#fff",
                  mainColor: "#49945A",
                  textSecondaryColor: "#D4F3DB",
                  borderColor: "rgba(122, 146, 165, 0.1)",
                }}
                current={presentDate}
                selected={presentDate}
                mode="datepicker"
                minuteInterval={5}
                style={{ borderRadius: 10 }}
                onDateChange={(date) => handleSelectedStartDate(date)}
              />
            </View>
          )}
          {isEndDate && (
            <View style={{marginBottom: theme.spacing.m}}>
              <Texts
                variant="h2"
                style={{ marginBottom: theme.spacing.m, color: "#49945A" }}
              >
                Select End date
              </Texts>
              <DatePicker
                options={{
                  backgroundColor: "#111",
                  textHeaderColor: "#fff",
                  textDefaultColor: "#fff",
                  selectedTextColor: "#fff",
                  mainColor: "#49945A",
                  textSecondaryColor: "#D4F3DB",
                  borderColor: "rgba(122, 146, 165, 0.1)",
                }}
                current={presentDate}
                selected={presentDate}
                mode="datepicker"
                minuteInterval={5}
                style={{ borderRadius: 10 }}
                onDateChange={(date) => handleSelectedEndDate(date)}
              />
            </View>
          )}
          <Button
            value="Cancel"
            onPress={handleCloseModal}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 20,
  },
  btnContainer2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 16,
  },
  btn: {
    borderWidth: 1,
    borderColor: "#49945A",
    borderRadius: 3,
    padding: 10,
  },
});

export default DatePickers;

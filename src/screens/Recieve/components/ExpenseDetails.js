import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useTheme } from "@shopify/restyle";
import { useEffect, useState } from "react";
import Texts from "../../../components/Texts";
import ApiServices from "../../../services/ApiServices";

const { width, height } = Dimensions.get("screen");

const ExpenseDetails = ({ data }) => {
  const { expenseInfo } = data;
  const theme = useTheme();
  const [expensesType, setExpensesType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { content },
          },
          status: statusCode,
        } = await ApiServices.getAllExpenseTypes();
        if (statusCode === 200) {
          let newArray;
          content.forEach((data) => {
            if (data.id === expenseInfo.expenseType) {
              newArray = data.name;
            }
          });
          setExpensesType(newArray);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.screen}>
      <Texts
        variant="p"
        style={{
          fontWeight: 700,
          fontSize: height * 0.023,
          marginVertical: 15,
          color: "#49945A",
        }}
      >
        Expense Details
      </Texts>
      <View style={styles.container}>
        <Texts
          variant="p"
          style={{ ...styles.bnkDet }}
        >{`${expenseInfo.bankName}    ${expenseInfo.accountNumber}`}</Texts>
        <View style={styles.bnkListCont}>
          <View>
            <Texts
              variant="p"
              style={{ ...styles.bnkEchHed, color: theme.colors.greenText }}
            >
              Name on Account
            </Texts>
            <Texts variant="p" style={{ ...styles.bnkEchTxt }}>
              {expenseInfo.accountName}
            </Texts>
          </View>
          <View>
            <Texts
              variant="p"
              style={{ ...styles.bnkEchHed, color: theme.colors.greenText }}
            >
              Expense Type
            </Texts>
            <Texts variant="p" style={{ ...styles.bnkEchTxt }}>
              {expensesType}
            </Texts>
          </View>
          <View>
            <Texts
              variant="p"
              style={{ ...styles.bnkEchHed, color: theme.colors.greenText }}
            >
              Payment Type
            </Texts>
            <Texts variant="p" style={{ ...styles.bnkEchTxt }}>
              {expenseInfo.paymentType}
            </Texts>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExpenseDetails;

const styles = StyleSheet.create({
  screen: {
    marginVertical: height * 0.03,
  },
  container: {
    borderWidth: 1,
    padding: height * 0.03,
    borderColor: "#c9c9c9",
    borderRadius: height * 0.005,
  },
  bnkDet: {
    textTransform: "capitalize",
    fontSize: height * 0.02,
    color: "#666",
    fontWeight: 700,
    marginBottom: height * 0.02,
  },
  bnkListCont: {
    gap: 15,
  },
  bnkEchHed: {
    textTransform: "capitalize",
    fontSize: height * 0.02,
    fontWeight: 700,
  },
  bnkEchTxt: {
    textTransform: "capitalize",
    fontSize: height * 0.02,
    color: "#666",
    fontWeight: 700,
  },
});

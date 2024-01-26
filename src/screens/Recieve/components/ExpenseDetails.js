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
  const [currency, setCurrency] = useState("");
  const [departments, setDepartments] = useState("");

  useEffect(() => {
    const fetchExpenseTypeData = async () => {
      try {
        const {
          data: {
            data: { content },
          },
          status: statusCode,
        } = await ApiServices.getAllExpenseTypes();
        if (statusCode === 200) {
          let expensesTypeName;
          content.forEach((data) => {
            if (data.id === expenseInfo.expenseType) {
              expensesTypeName = data.name;
            }
          });
          setExpensesType(expensesTypeName);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchCurrenciesData = async () => {
      try {
        const {
          data: {
            data: { content },
          },
          status: statusCode,
        } = await ApiServices.getAllCurrencies();
        if (statusCode === 200) {
          let currency;
          content.forEach((data) => {
            if (data.id === expenseInfo.currency) {
              currency = data.name;
            }
          });
          setCurrency(currency);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchDepartmentsData = async () => {
      try {
        const {
          data: {
            data: { content },
          },
          status: statusCode,
        } = await ApiServices.getAlldepartments();
        if (statusCode === 200) {
          let department;
          content.forEach((item) => {
            if (item.id === data.department) {
              department = item.department;
            }
          });
          setDepartments(department);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchExpenseTypeData();
    fetchCurrenciesData();
    fetchDepartmentsData();
    console.log(expenseInfo)
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
              {expenseInfo?.paymentType || "-"}
            </Texts>
          </View>
        </View>
      </View>
      <View style={{ ...styles.container, marginTop: theme.spacing.l }}>
        <Texts variant="p" style={{ ...styles.bnkDet }}>
          {departments ? departments : "No Department"}
        </Texts>
        <View style={styles.deptMainCont}>
          <View style={styles.deptListCont}>
            <View style={styles.deptEch}>
              <Texts
                variant="p"
                style={{ ...styles.bnkEchHed, color: theme.colors.greenText }}
              >
                Currency
              </Texts>
              <Texts
                variant="p"
                style={{ ...styles.bnkEchTxt, textTransform: "uppercase" }}
              >
                {currency}
              </Texts>
            </View>
            <View style={styles.deptEch}>
              <Texts
                variant="p"
                style={{ ...styles.bnkEchHed, color: theme.colors.greenText }}
              >
                VAT Rate
              </Texts>
              <Texts variant="p" style={{ ...styles.bnkEchTxt }}>
                {expenseInfo.vat === null ? "-" : expenseInfo.vat}
              </Texts>
            </View>
            <View style={styles.deptEch}>
              <Texts
                variant="p"
                style={{ ...styles.bnkEchHed, color: theme.colors.greenText }}
              >
                WHT Rate
              </Texts>
              <Texts variant="p" style={{ ...styles.bnkEchTxt }}>
                {expenseInfo.wht === null ? "-" : expenseInfo.wht}
              </Texts>
            </View>
          </View>
          <View style={styles.deptListCont}>
            <View style={styles.deptEch}>
              <Texts
                variant="p"
                style={{ ...styles.bnkEchHed, color: theme.colors.greenText }}
              >
                Sub-total
              </Texts>
              <Texts variant="p" style={{ ...styles.bnkEchTxt }}>
                {expenseInfo.subTotal === null
                  ? "-"
                  : expenseInfo.subTotal.toLocaleString()}
              </Texts>
            </View>
            <View style={styles.deptEch}>
              <Texts
                variant="p"
                style={{ ...styles.bnkEchHed, color: theme.colors.greenText }}
              >
                Tax
              </Texts>
              <Texts variant="p" style={{ ...styles.bnkEchTxt }}>
                0.92
              </Texts>
            </View>
            <View style={styles.deptEch}>
              <Texts
                variant="p"
                style={{ ...styles.bnkEchHed, color: theme.colors.greenText }}
              >
                Total
              </Texts>
              <Texts variant="p" style={{ ...styles.bnkEchTxt }}>
                {expenseInfo.totalAmount === null
                  ? "-"
                  : expenseInfo.totalAmount.toLocaleString()}
              </Texts>
            </View>
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
    fontSize: height * 0.018,
    color: "#666",
    fontWeight: 700,
  },
  deptMainCont: {
    gap: 15,
  },
  deptListCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deptEch: {
    
    width: height * 0.1, 

  },
});

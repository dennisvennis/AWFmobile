import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { ProgressBar, Colors } from "react-native-paper";
import { useTheme } from "@shopify/restyle";
import Texts from "../../../components/Texts";
import RejectLightSvg from "../../../assets/svg/rejectLight.svg";
import ReturnDarkSvg from "../../../assets/svg/returnDark.svg";
import DeclineLightSvg from "../../../assets/svg/declineLight.svg";
import ApproveLightSvg from "../../../assets/svg/approveLight.svg";

const { width, height } = Dimensions.get("screen");

const RequestManager = ({ data }) => {
  const theme = useTheme();
  const { expenseInfo } = data;
  const [approvedCount, setApprovedCount] = useState(0);
  const [approvedAvg, setApprovedAvg] = useState(0);
  const [reviewersLength, setreviewersLength] = useState(0);

  useEffect(() => {
    const { reviewers } = data;
    setreviewersLength(reviewers.length);
    let count = 0;

    reviewers.forEach((item) => {
      if (item.status === "approved") {
        count++;
      }
    });
    let approvedPercent = count / reviewers.length;
    setApprovedCount(count);
    setApprovedAvg(approvedPercent);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <View style={styles.btnTopCont}>
          <TouchableOpacity activeOpacity={0.7}>
            <View
              style={{
                ...styles.btnHolder,
                borderColor: "#ED3232",
                backgroundColor: "#ED3232",
              }}
            >
              <RejectLightSvg />
              <Texts
                variant="p"
                style={{ ...styles.btnHolderTxt, color: "#fff" }}
              >
                Reject
              </Texts>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <View
              style={{
                ...styles.btnHolder,
                borderColor: "#219653",
                backgroundColor: "#fff",
              }}
            >
              <ReturnDarkSvg />
              <Texts
                variant="p"
                style={{ ...styles.btnHolderTxt, color: "#219653" }}
              >
                Return
              </Texts>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <View
              style={{
                ...styles.btnHolder,
                borderColor: "#59615C",
                backgroundColor: "#59615C",
              }}
            >
              <DeclineLightSvg />
              <Texts
                variant="p"
                style={{ ...styles.btnHolderTxt, color: "#fff" }}
              >
                Decline
              </Texts>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.btnBtmCont}>
          <TouchableOpacity activeOpacity={0.7}>
            <View
              style={{
                ...styles.btnHolder,
                borderColor: "#219653",
                backgroundColor: "#219653",
              }}
            >
              <ApproveLightSvg />
              <Texts
                variant="p"
                style={{ ...styles.btnHolderTxt, color: "#fff" }}
              >
                Approve
              </Texts>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.reqAbt}>
        <Texts variant="p" style={styles.reqAbtTxt}>
          {expenseInfo.expenseNaration !== null
            ? expenseInfo.expenseNaration
            : "No Expense narration available"}
        </Texts>
      </View>
      <View style={styles.reviewCont}>
        <Texts style={styles.reviewContHed}>Reviewers</Texts>
        <View style={styles.reviewRev}>
          {data.reviewers.map((reviewer) => {
            let { reviewerInfo } = reviewer;
            if (reviewer.actorType === "review") {
              return (
                <View
                  key={reviewerInfo.id}
                  style={
                    reviewer.status === "approved"
                      ? styles.reviewRevEchActive
                      : styles.reviewRevEch
                  }
                >
                  <Texts
                    style={
                      reviewer.status === "approved"
                        ? styles.reviewRevEchTxtActive
                        : styles.reviewRevEchTxt
                    }
                  >
                    {reviewerInfo.firstName} {reviewerInfo.lastName}
                  </Texts>
                </View>
              );
            }
            return (
              <Texts
                variant="p"
                style={{
                  fontWeight: 700,
                  fontSize: height * 0.02,
                  color: "#777",
                }}
              >
                No reveiwers
              </Texts>
            );
          })}
        </View>
        <Texts style={{ ...styles.reviewContHed, marginTop: 10 }}>
          Approver
        </Texts>
        <View style={styles.reviewApprv}>
          {data.reviewers.map((reviewer) => {
            let { reviewerInfo } = reviewer;
            if (reviewer.actorType === "approver") {
              return (
                <View
                  key={reviewerInfo.id}
                  style={
                    reviewer.status === "approved"
                      ? styles.reviewAppEchActive
                      : styles.reviewAppEch
                  }
                >
                  <Texts
                    style={
                      reviewer.status === "approved"
                        ? styles.reviewAppEchTxtActive
                        : styles.reviewAppEchTxt
                    }
                  >
                    {reviewerInfo.firstName} {reviewerInfo.lastName}
                  </Texts>
                </View>
              );
            }
          })}
        </View>
      </View>
      <View style={styles.progressCont}>
        <View style={styles.progressContCont}>
          <Texts variant="p" style={styles.progressTxt}>
            Request Progess
          </Texts>
          <Texts variant="p" style={styles.progressTxt}>
            {`${approvedCount}/${reviewersLength} Reviewed`}
          </Texts>
        </View>
        <ProgressBar
          progress={approvedAvg}
          color={"#27AE60"}
          style={styles.progressBar}
        />
      </View>
    </View>
  );
};

export default RequestManager;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  btnContainer: {
    gap: height * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: "#D4F3DB",
    paddingBottom: height * 0.03,
  },
  btnTopCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnHolder: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "yellow",
    paddingVertical: height * 0.015,
    paddingHorizontal: height * 0.015,
    borderRadius: 10,
    justifyContent: "center",
    borderWidth: 1,
  },
  btnHolderTxt: {
    fontSize: height * 0.02,
    fontWeight: 700,
  },
  reqAbt: {
    marginVertical: height * 0.04,
  },
  reqAbtTxt: {
    fontWeight: 700,
    fontSize: height * 0.018,
    color: "#555",
  },
  reviewContHed: {
    fontSize: height * 0.023,
    fontWeight: 700,
    color: "#0C4128",
    marginBottom: 10,
  },
  reviewRev: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  reviewRevEch: {
    backgroundColor: "#F3FAF5",
    padding: 5,
    borderRadius: 5,
  },
  reviewRevEchActive: {
    backgroundColor: "#D1F5D9",
    padding: 5,
    borderRadius: 5,
  },
  reviewRevEchTxt: {
    fontWeight: 700,
    fontSize: height * 0.017,
    color: "#0C4128",
    textTransform: "capitalize",
  },
  reviewRevEchTxtActive: {
    fontWeight: 700,
    fontSize: height * 0.017,
    color: "#49945A",
    textTransform: "capitalize",
  },
  reviewApprv: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  reviewAppEch: {
    backgroundColor: "#F3FAF5",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  reviewAppEchActive: {
    backgroundColor: "#0C4128",
    padding: 5,
    borderRadius: 5,

    alignItems: "center",
  },
  reviewAppEchTxt: {
    fontWeight: 700,
    fontSize: height * 0.017,
    color: "#0C4128",
    textTransform: "capitalize",
  },
  reviewAppEchTxtActive: {
    fontWeight: 700,
    fontSize: height * 0.017,
    color: "#fff",
    textTransform: "capitalize",
  },
  progressCont: {
    marginVertical: height * 0.03,
    gap: 10,
  },
  progressContCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressTxt: {
    color: "#555",
    fontWeight: 700,
  },
  progressBar: {
    height: height * 0.01,
    borderRadius: 5,
  },
});

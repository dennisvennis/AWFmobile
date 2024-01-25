import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { ProgressBar, Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import { useTheme } from "@shopify/restyle";
import Texts from "../../../components/Texts";
import RejectLightSvg from "../../../assets/svg/rejectLight.svg";
import ReturnDarkSvg from "../../../assets/svg/returnDark.svg";
import DeclineLightSvg from "../../../assets/svg/declineLight.svg";
import ApproveLightSvg from "../../../assets/svg/approveLight.svg";
import ApiServices from "../../../services/ApiServices";
import Button from "../../../components/Button";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("screen");

const RequestManager = ({ data, setUpdate }) => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { expenseInfo } = data;
  const dataId = data.id;
  const [approvedCount, setApprovedCount] = useState(0);
  const [approvedAvg, setApprovedAvg] = useState(0);
  const [reviewersLength, setreviewersLength] = useState(0);
  const [noReviewer, setNoReviewer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusHandler, setStatusHandler] = useState("");
  const [reason, setReason] = useState("");
  const [requestHandlers, setRequestHandlers] = useState(true);
  const [hideBtn, setHideBtn] = useState(false);

  const handleReasonChange = (text) => {
    setReason(text);
  };

  const handleRequestReaction = async () => {
    let formData;
    if (statusHandler === "rejected") {
      if (reason === "") {
        Toast.show({
          type: "error",
          text1: "Comment reason for rejecting request",
        });
        setLoading(false);
        return;
      } else {
        formData = {
          comment: reason,
          status: statusHandler,
        };
      }
    }
    if (statusHandler === "returned") {
      if (reason === "") {
        Toast.show({
          type: "error",
          text1: "Comment reason for returned request",
        });
        setLoading(false);
        return;
      } else {
        formData = {
          comment: reason,
          status: statusHandler,
        };
      }
    }
    if (statusHandler === "declined") {
      if (reason === "") {
        Toast.show({
          type: "error",
          text1: "Comment reason for declined request",
        });
        setLoading(false);
        return;
      } else {
        formData = {
          comment: reason,
          status: statusHandler,
        };
      }
    }
    if (statusHandler === "approved") {
      if (reason === "") {
        Toast.show({
          type: "error",
          text1: "Drop a comment bore approving Approving request",
        });
        setLoading(false);
        return;
      } else {
        formData = {
          comment: reason,
          status: statusHandler,
        };
      }
    }

    try {
      setUpdate(false);
      const {
        data: { message },
        status: statusCode,
      } = await ApiServices.reactToRequest(dataId, formData);
      if (statusCode === 200) {
        Toast.show({
          type: "success",
          text2: message,
        });
        setUpdate(true);
        setLoading(false);
        setStatusHandler("");
        setRequestHandlers(false);
      }
    } catch (error) {
      console.log(error);
      setRequestHandlers(true);
      setUpdate(false);
    }
  };

  useEffect(() => {
    const { reviewers } = data;
    setreviewersLength(reviewers.length);
    let count = 0;

    reviewers.forEach((item) => {
      if (item.firstReactionTime !== null) {
        count++;
      }
    });
    let approvedPercent = count / reviewers.length;
    setApprovedCount(count);
    setApprovedAvg(approvedPercent);

    let macthingReviewer = data.reviewers.find(
      (reviewer) => reviewer.actorType === "reviewer"
    );
    if (!macthingReviewer) {
      setNoReviewer(true);
    }
  }, []);

  useEffect(() => {
    const { reviewers } = data;
    let matchedUser = reviewers.find((data) => data.actor === user.userId);
    if (matchedUser) {
      if (matchedUser.firstReactionTime !== null) {
        setHideBtn(true);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      {!hideBtn && (
        <View style={styles.btnContainer}>
          <View style={styles.btnTopCont}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setStatusHandler("rejected")}
            >
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
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setStatusHandler("returned")}
            >
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
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setStatusHandler("declined")}
            >
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
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setStatusHandler("approved")}
            >
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
          {statusHandler && (
            <View style={styles.reasonCont}>
              <TextInput
                placeholder={`Enter a reason for ${
                  statusHandler === "returned"
                    ? "returning"
                    : statusHandler === "rejected"
                    ? "rejecting"
                    : statusHandler === "declined"
                    ? "declining"
                    : "approving"
                } request`}
                style={styles.comment}
                onChangeText={handleReasonChange}
              />
              <View style={styles.reasonBtnCont}>
                <TouchableOpacity
                  onPress={handleRequestReaction}
                  activeOpacity={0.7}
                >
                  <View style={styles.reasonBtn}>
                    <Texts variant="p" style={styles.reasonBtnTxt}>
                      {loading ? "Sending..." : "Submit Request"}
                    </Texts>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setStatusHandler("")}
                  activeOpacity={0.7}
                >
                  <View style={styles.reasonBtnCancel}>
                    <Texts variant="p" style={styles.reasonBtnTxt}>
                      Cancel
                    </Texts>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}

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
          {noReviewer ? (
            <View>
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
            </View>
          ) : (
            data.reviewers.map((reviewer) => {
              let { reviewerInfo } = reviewer;
              if (reviewer.actorType === "reviewer") {
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
            })
          )}
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
                    key={reviewerInfo.id}
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
  comment: {
    borderWidth: 1,
    padding: 10,
    height: height * 0.1,
    borderColor: "#999",
    borderRadius: height * 0.005,
  },
  reasonBtn: {
    padding: 10,
    backgroundColor: "#111",
    borderRadius: height * 0.005,
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  reasonBtnTxt: {
    color: "#fff",
    fontWeight: "700",
    fontSize: height * 0.02,
  },
  reasonBtnCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  reasonBtnCancel: {
    padding: 10,
    backgroundColor: "#59615C",
    borderRadius: height * 0.005,
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

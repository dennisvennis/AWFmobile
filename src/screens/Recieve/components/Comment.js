import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "@shopify/restyle";
import Texts from "../../../components/Texts";
import Button from "../../../components/Button";
import Toast from "react-native-toast-message";
import ApiServices from "../../../services/ApiServices";

const { height, width } = Dimensions.get("screen");

const Comment = ({ data, setUpdate }) => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dataId = data.id;

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValidEmail(text.includes("@"));
  };
  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = async () => {
    if (!isValidEmail) {
      Toast.show({
        type: "error",
        text1: "Invalid email address",
      });
      return;
    }
    if (!email || !comment) {
      Toast.show({
        type: "error",
        text1: "Input email address and comment",
      });
      return;
    }

    // Check if entered email matches any reviewers
    const matchReviewerId = data.reviewers
      .filter((reviewer) => reviewer.reviewerInfo.email === email)
      .map((reviewer) => reviewer.reviewerInfo.id)
      .filter((id) => id !== "");

    // Check if entered email matches approval
    const matchApprovalId =
      data.approver.email === email ? data.approver.id : "";

    if (matchReviewerId.length === 0 && matchApprovalId === "") {
      Toast.show({
        type: "error",
        text1: "Email doesn't match reviewers or approver email",
      });
      return;
    }

    const commentToId =
      matchReviewerId.length > 0 ? matchReviewerId[0] : matchApprovalId;

    const formData = {
      comment: comment,
      mentions: [],
      to: [commentToId],
      cc: [],
    };
    try {
      setIsLoading(true);
      setUpdate(false);
      const { data, status: statusCode } =
        await ApiServices.addCommentToRequest(dataId, formData);
      if (statusCode === 200) {
        setIsLoading(false);
        setUpdate(true);
        Toast.show({
          type: "success",
          text1: "Comment succesfully added",
        });
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.emailContainer}>
        <Texts variant="p" style={styles.to}>
          To
        </Texts>
        <TextInput
          placeholder="Enter email addres of receiver"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoComplete="email"
          onChangeText={handleEmailChange}
        />
      </View>
      <TextInput
        placeholder="Enter a comment..."
        style={styles.comment}
        onChangeText={handleCommentChange}
      />
      <Button
        value={isLoading ? "Sending..." : "Comment"}
        style={styles.button}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    marginVertical: height * 0.05,
    gap: height * 0.04,
  },
  emailContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    borderColor: "#999",
    borderRadius: height * 0.005,
  },
  to: {
    fontWeight: 700,
  },
  comment: {
    borderWidth: 1,
    padding: 10,
    borderColor: "#999",
    borderRadius: height * 0.005,
  },
});

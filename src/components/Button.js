import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import Texts from "./Texts";
import { useTheme } from "@shopify/restyle";

const { height, width } = Dimensions.get("window");
const Button = (props) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      {...props}
      style={{
        backgroundColor: theme.colors.buttonBackground,
        padding: theme.spacing.xl,
        marginBottom: theme.spacing.s,
        borderRadius: theme.borderRadius.m,
        ...styles.button,
        ...props.style,
      }}
      activeOpacity={0.7}
    >
      <Texts
        style={{
          color: theme.colors.buttonText,
          ...styles.buttonText,
          ...props.style,
        }}
      >
        {props.value}
      </Texts>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    paddingVertical: height * 0.02,
  },
  buttonText: {
    // color: theme.colors.buttonText,
    textAlign: "center",
    fontWeight: "800",
    fontSize: width * 0.05,
  },
});

import { StyleSheet, View } from "react-native";
import React from "react";
import { createText } from "@shopify/restyle";

const Text = createText();

const Texts = ({ variant, children, style }) => {
  return (
    <Text variant={variant} style={style}>
      {children}
    </Text>
  );
};

export default Texts;

const styles = StyleSheet.create({});

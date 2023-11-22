import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@shopify/restyle";

const Card = (props) => {
  const theme = useTheme();
  return (
    <View
      style={{
        ...props.style,
        ...styles.card,
        backgroundColor: props.style.backgroundColor
          ? props.style.backgroundColor
          : theme.colors.mainBackground,
        borderRadius: theme.borderRadius.m,
        padding: props.style.padding ? props.style.padding : theme.spacing.m,
        width: props.style.width ? props.style.width : "100%"
      }}
    >
      {props.children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
});

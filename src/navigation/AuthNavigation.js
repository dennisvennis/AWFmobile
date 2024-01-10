import { StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import Login from "../screens/Auth/Login";
import Images from "../utils/images";
const { height } = Dimensions.get("screen");
import { useTheme } from "@shopify/restyle";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: () => (
          <Image source={Images.onBoardHeader} style={styles.image} />
        ),
        headerTransparent: true,
        contentStyle: { backgroundColor: theme.colors.mainBackground },
      }}
    >
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    resizeMode: "contain",
    height: 200,
    position: "relative",
    top: -height * 0.045,
  },
});

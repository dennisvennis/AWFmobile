import { StyleSheet, Platform } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import transition from "../utils/transition";
import ReceiveScreen from "../screens/Recieve/ReceiveScreen";
import SingleReceiveScreen from "../screens/Recieve/SingleReceiveScreen";
import OtherTabHeader from "../components/OtherTabHeader";
import Notifications from "../screens/Notification";
import NotificationHeader from "../components/NotificationHeader";
import { useTheme } from "@shopify/restyle";
import AuthNavigation from "./AuthNavigation";

const Stack = createNativeStackNavigator();

const ReceivedNavigation = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        contentStyle: { backgroundColor: theme.colors.mainBackground },
      }}
    >
      <Stack.Screen
        name="receive"
        component={ReceiveScreen}
        options={{
          header: () => (
            <OtherTabHeader navigateTo="dashboard" auth="combineNavigation" />
          ),
          gestureDirection: "vertical",
          transitionSpec: {
            open: transition.config,
            close: transition.closeConfig,
          },
          cardStyleInterpolator:
            Platform.OS === "ios"
              ? CardStyleInterpolators.forModalPresentationIOS
              : CardStyleInterpolators.forBottomSheetAndroid,
        }}
      />
      <Stack.Screen
        name="singlereceive"
        component={SingleReceiveScreen}
        options={{
          header: () => (
            <OtherTabHeader navigateTo="receive" auth="combineNavigation" />
          ),
          gestureDirection: "vertical",
          transitionSpec: {
            open: transition.config,
            close: transition.closeConfig,
          },
          cardStyleInterpolator:
            Platform.OS === "ios"
              ? CardStyleInterpolators.forModalPresentationIOS
              : CardStyleInterpolators.forBottomSheetAndroid,
        }}
      />
    </Stack.Navigator>
  );
};

export default ReceivedNavigation;

const styles = StyleSheet.create({});

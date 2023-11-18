import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import transition from "../utils/transition";
import ReceiveScreen from "../screens/Recieve/ReceiveScreen";
import OtherTabHeader from "../components/OtherTabHeader";
import Notifications from "../screens/Notification";
import NotificationHeader from "../components/NotificationHeader";
import { useTheme } from "@shopify/restyle";

const Stack = createNativeStackNavigator();

const ReceivedNavigation = () => {
  const theme = useTheme()
  return (
    <Stack.Navigator screenOptions={{
      headerTransparent: true,
      contentStyle: { backgroundColor: theme.colors.mainBackground}
    }}>
      <Stack.Screen
        name="receive"
        component={ReceiveScreen}
        options={{
          header: () => (
            <OtherTabHeader
              navigateTo="dashboard"
              notify="notificationscreen"
            />
          ),
          gestureDirection: "vertical",
          transitionSpec: {
            open: transition.config,
            close: transition.closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      {/*NOTIFICATION SCREENS*/}

      <Stack.Screen
        name="notificationscreen"
        component={Notifications.NotificationsScreen}
        options={{
          header: () => <NotificationHeader navigateTo="receive" />,
          gestureDirection: "vertical",
          transitionSpec: {
            open: transition.config,
            close: transition.closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="singlenotificationscreen"
        component={Notifications.SingleNotifcationScreen}
        options={{
          header: () => <NotificationHeader />,
          gestureDirection: "vertical",
          transitionSpec: {
            open: transition.config,
            close: transition.closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default ReceivedNavigation;

const styles = StyleSheet.create({});

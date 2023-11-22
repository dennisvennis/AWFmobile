import { StyleSheet , Platform} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import transition from "../utils/transition";
import {CardStyleInterpolators} from "@react-navigation/stack";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import FirstTabHeader from "../components/FirstTabHeader";
import Notifications from "../screens/Notification";
import NotificationHeader from "../components/NotificationHeader";
import { useTheme } from "@shopify/restyle";

const Stack = createNativeStackNavigator();

const DashboardNavigation = () => {
  const theme = useTheme()
  return (
    <Stack.Navigator screenOptions={{
      headerTransparent: true,
      contentStyle: { backgroundColor: theme.colors.mainBackground}
    }} >
      <Stack.Screen
        name="dashboard"
        component={DashboardScreen}
        options={{
          header: () => <FirstTabHeader notify="notificationscreen" />,
          
        }}
      />
      {/*NOTIFICATION SCREENS*/}

      <Stack.Screen
        name="notificationscreen"
        component={Notifications.NotificationsScreen}
        options={{
          header: () => <NotificationHeader navigateTo="dashboard"/>,
          gestureDirection: 'vertical',
          transitionSpec: {
            open: transition.config,
            close: transition.closeConfig,
          },
          cardStyleInterpolator: Platform.OS === 'ios'? CardStyleInterpolators.forModalPresentationIOS: CardStyleInterpolators.forBottomSheetAndroid
        }}
      />
      <Stack.Screen
        name="singlenotificationscreen"
        component={Notifications.SingleNotifcationScreen}
        options={{
          header: () => <NotificationHeader />,
          gestureDirection: 'vertical',
        transitionSpec: {
          open: transition.config,
          close: transition.closeConfig,
        },
        cardStyleInterpolator: Platform.OS === 'ios'? CardStyleInterpolators.forModalPresentationIOS: CardStyleInterpolators.forBottomSheetAndroid
        }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;

const styles = StyleSheet.create({});

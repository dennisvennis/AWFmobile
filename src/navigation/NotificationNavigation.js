import { StyleSheet , Platform} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import transition from "../utils/transition";
import {CardStyleInterpolators} from "@react-navigation/stack";
import Notifications from "../screens/Notification";
import OtherTabHeader from "../components/OtherTabHeader";
import { useTheme } from "@shopify/restyle";

const Stack = createNativeStackNavigator();

const NotificationNavigation = () => {
  const theme = useTheme()
  return (
    <Stack.Navigator screenOptions={{
      headerTransparent: true,
      contentStyle: { backgroundColor: theme.colors.mainBackground}
    }}>

      <Stack.Screen
        name="notifications"
        component={Notifications.NotificationsScreen}
        options={{
          header: () => <OtherTabHeader navigateTo="dashboard"
          auth="auth" />,
          gestureDirection: "vertical",
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
          header: () => <OtherTabHeader navigateTo="notifications"
          auth="auth" />,
          gestureDirection: "vertical",
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

export default NotificationNavigation;

const styles = StyleSheet.create({});

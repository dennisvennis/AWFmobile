import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../components/TabBar";
import DashboardNavigation from "./DashboardNavigation";
import ReceivedNavigation from "./ReceiveNavigation";
import AuthNavigation from "./AuthNavigation";

const MainNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />} >
      <Tab.Screen
        name="dashboardscreen"
        component={DashboardNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="receivescreen"
        component={ReceivedNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="logoutscreen"
        component={AuthNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreens from "../screens/MainBottomTab";
import TabBar from "../components/TabBar";

const MainNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="dashboardscreen"
        component={MainScreens.DashboardScreen}
      />
      <Tab.Screen name="receivescreen" component={MainScreens.ReceiveScreen} />
      <Tab.Screen name="logoutscreen" component={MainScreens.LogoutScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigation;

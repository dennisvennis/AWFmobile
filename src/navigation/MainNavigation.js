import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreens from "../screens/MainBottomTab";
import TabBar from "../components/TabBar";
import Images from "../utils/images";
import { Image, Dimensions } from "react-native";
import PrimaryHeader from "../assets/svg/primaryheader.svg";

const { width, height } = Dimensions.get("screen");

const MainNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <PrimaryHeader width={width} />,
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

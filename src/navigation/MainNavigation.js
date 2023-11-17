import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreens from "../screens/MainBottomTab";
import TabBar from "../components/TabBar";
import Images from "../utils/images";
import { Image, Dimensions, StyleSheet } from "react-native";
import PrimaryHeader from "../assets/svg/primaryheader.svg";

const { width, height } = Dimensions.get("screen");

const MainNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <Image source={Images.mainHeader} style={styles.image} />,
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

const styles = StyleSheet.create({
  image: {
    width: "100%",
    resizeMode: "contain",
    height: 200,
    position: "relative",
    top: -height * 0.045,
  },
});

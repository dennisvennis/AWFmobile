import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreens from "../screens/MainBottomTab";
import TabBar from "../components/TabBar";
import Images from "../utils/images";
import {
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import PrimaryHeader from "../assets/svg/primaryheader.svg";
import ArrowBack from "../assets/svg/arrowLeft.svg";
import NotificationIcon from "../assets/svg/notificationBell.svg";
import { useTheme } from "@shopify/restyle";

const { width, height } = Dimensions.get("screen");

const MainNavigation = () => {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();

  const FirstTabHeader = () => {
    return <View style={styles.mainContainer}>
    <Image source={Images.onBoardHeader} style={styles.imageMain} />
    <View style={{ ...styles.containerHead, padding: theme.spacing.l }}>
      <TouchableOpacity style={styles.notifyicon}>
        <NotificationIcon />
      </TouchableOpacity>
    </View>
  </View>
  };
  const otherTabHeader = () => {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.mainHeader} style={styles.image} />
        <View style={{ ...styles.container, padding: theme.spacing.l }}>
          <TouchableOpacity style={styles.icons}>
            <ArrowBack />
          </TouchableOpacity>

          <TouchableOpacity style={styles.notifyicon}>
            <NotificationIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
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
        options={{
          header: FirstTabHeader,
        }}
      />
      <Tab.Screen name="receivescreen" component={MainScreens.ReceiveScreen}    options={{
          header: otherTabHeader,
        }}/>
      <Tab.Screen name="logoutscreen" component={MainScreens.LogoutScreen}    options={{
          header: otherTabHeader,
        }}/>
    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    resizeMode: "contain",
    height: "100%",
    position: "absolute",
    top: -height * 0.045,
  },
  imageMain: {
    width: "100%",
    resizeMode: "contain",
    height: 200,
    position: "absolute",
    top: -height * 0.045,
  },

  mainContainer: {
    position: "relative",
    height: 150,
  },

  container: {
    width: "100%",
    height: 80,
    position: "relative",
    top: height * 0.06,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "rgba(0,0,0,0.2)",
  },
  containerHead:{
    width: "100%",
    // height: 80,
    position: "relative",
    top: height * 0.095,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  notifyicon:{
    position: "relative",
    top: -height * 0.01,
  }
});

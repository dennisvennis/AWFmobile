import { StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/onBoarding/SplashScreen";
import IntroductionScreen from "../screens/onBoarding/IntroductionScreen";
import MainNavigation from "./MainNavigation";
import Images from "../utils/images";
import OnboardHeader from "../assets/svg/onboardHeader.svg";
const { width, height } = Dimensions.get("screen");

const Stack = createNativeStackNavigator();

const OnboardingNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        // header: () => <OnboardHeader width={width} />,
        header: () => (
          <Image source={Images.onBoardHeader} style={styles.image} />
        ),
      }}
    >
      <Stack.Screen
        name="splashscreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="introductionscreen" component={IntroductionScreen} />
      <Stack.Screen
        name="mainnavigation"
        component={MainNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigation;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    resizeMode: "contain",
    height: 200,
    position: "relative",
    top: -height * 0.045,
  },
});

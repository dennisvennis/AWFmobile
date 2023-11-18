import { StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import transition from "../utils/transition";
import { CardStyleInterpolators } from "@react-navigation/stack";
import SplashScreen from "../screens/onBoarding/SplashScreen";
import IntroductionScreen from "../screens/onBoarding/IntroductionScreen";
import MainNavigation from "./MainNavigation";
import Images from "../utils/images";
import AuthNavigation from "./AuthNavigation";
const { width, height } = Dimensions.get("screen");

const Stack = createNativeStackNavigator();

const OnboardingNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
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
          gestureDirection: "vertical",
          transitionSpec: {
            open: transition.config,
            close: transition.closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="introductionscreen"
        component={IntroductionScreen}
        options={{
          gestureDirection: "vertical",
          transitionSpec: {
            open: transition.config,
            close: transition.closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="auth"
        component={AuthNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="mainnavigation"
        component={MainNavigation}
        options={{
          headerShown: false,
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

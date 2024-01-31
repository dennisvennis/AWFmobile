import { StyleSheet, Dimensions, Image, Platform, BackHandler } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import transition from "../utils/transition";
import { CardStyleInterpolators } from "@react-navigation/stack";
import SplashScreen from "../screens/onBoarding/SplashScreen";
import MainNavigation from "./MainNavigation";
import Images from "../utils/images";
import AuthNavigation from "./AuthNavigation";
import asyncStorage from "../utils/asyncStorage";
const { width, height } = Dimensions.get("screen");

const Stack = createNativeStackNavigator();

const CombineNavigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleBackButton = () => {
      // Disable the back button behavior
      return true;
    };

    // Add event listener for the back button
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    // Clean up the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
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
              cardStyleInterpolator:
                Platform.OS === "ios"
                  ? CardStyleInterpolators.forModalPresentationIOS
                  : CardStyleInterpolators.forBottomSheetAndroid,
            }}
          />
          {/* <Stack.Screen
            name="auth"
            component={AuthNavigation}
            options={{
              headerShown: false,
            }}
          /> */}
        </>
      ) : (
        <>
          <Stack.Screen
            name="auth"
            component={AuthNavigation}
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen
            name="mainnavigation"
            component={MainNavigation}
            options={{
              headerShown: false,
              gestureDirection: "vertical",
              transitionSpec: {
                open: transition.config,
                close: transition.closeConfig,
              },
              cardStyleInterpolator:
                Platform.OS === "ios"
                  ? CardStyleInterpolators.forModalPresentationIOS
                  : CardStyleInterpolators.forBottomSheetAndroid,
            }}
          /> */}
        </>
      )}
    </Stack.Navigator>
  );
};

export default CombineNavigation;

import { StyleSheet, Dimensions, Image, Platform, BackHandler } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import transition from "../utils/transition";
import { CardStyleInterpolators } from "@react-navigation/stack";
import SplashScreen from "../screens/onBoarding/SplashScreen";
import IntroductionScreen from "../screens/onBoarding/IntroductionScreen";
import MainNavigation from "./MainNavigation";
import Images from "../utils/images";
import AuthNavigation from "./AuthNavigation";
import CombineNavigation from "./CombineNavigation";
import asyncStorage from "../utils/asyncStorage";
const { width, height } = Dimensions.get("screen");

const Stack = createNativeStackNavigator();

const OnboardingNavigation = () => {
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const checkOnboarding = async () => {
    try {
      const value = await asyncStorage.getData("viewedOnboarding");

      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    checkOnboarding();
  }, []);
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
          cardStyleInterpolator:
            Platform.OS === "ios"
              ? CardStyleInterpolators.forModalPresentationIOS
              : CardStyleInterpolators.forBottomSheetAndroid,
        }}
      />
      {!viewedOnboarding && (
        <Stack.Screen
          name="introductionscreen"
          component={IntroductionScreen}
          options={{
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
      )}

      <Stack.Screen
        name="combineNavigation"
        component={CombineNavigation}
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

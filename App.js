import { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, AppState, View, SafeAreaView, LogBox } from "react-native";
import * as Font from "expo-font";
import { ThemeProvider, createText } from "@shopify/restyle";
import theme from "./src/utils/theme";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import OnboardingNavigation from "./src/navigation/OnboardingNavigation";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { clearUser } from "./src/store/slices/usersSlice";
import Toast from "react-native-toast-message";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const Text = createText();

export default function AppWrapper() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  //LOADING FONTS TO THE APP
  let customFonts = {
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
  };
  const loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  };
  useEffect(() => {
    loadFontsAsync();
  }, []);
  if (!fontsLoaded) {
    return null;
  }

  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const App = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let inactivityTimeout = null;

  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
      "ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package."
    ]);
  }, []);

  const startInactivityTimeout = () => {
    inactivityTimeout = setTimeout(handleInactivityTimeout, 60 * 1000 * 30);
  };

  const clearInactivityTimeout = () => {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }
  };

  const resetInactivityTimeout = () => {
    clearInactivityTimeout();
    startInactivityTimeout();
  };

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      resetInactivityTimeout();
    } else {
      clearInactivityTimeout();
    }
  };

  const handleInactivityTimeout = () => {
    // Perform any logout or other action upon timeout
    dispatch(clearUser());
    navigation.navigate("combineNavigation");
  };

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    startInactivityTimeout();

    return () => {
      clearInactivityTimeout();
    };
  }, [clearUser]);

  return (
    <>
      <OnboardingNavigation />
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

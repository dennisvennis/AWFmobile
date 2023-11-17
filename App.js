import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import { ThemeProvider, createText } from "@shopify/restyle";
import theme from "./src/utils/theme";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingNavigation from "./src/navigation/OnboardingNavigation";

const Text = createText();

export default function App() {
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

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
      <OnboardingNavigation />
      <StatusBar style="auto" />
      </ThemeProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

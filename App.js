import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import MainNavigation from "./src/navigation/MainNavigation";
import ProductsContextProvider from "./src/context/ProductsContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FontNames } from "./src/utils/constants/fonts";

export default function App() {
  const [fontsLoaded] = useFonts({
    [FontNames.avenir]: require("./assets/fonts/Avenir-Regular.ttf"),
    [FontNames["avenir-bold"]]: require("./assets/fonts/Avenir-Black.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ProductsContextProvider>
      <StatusBar style="dark" />
      <MainNavigation onReady={onLayoutRootView}></MainNavigation>
    </ProductsContextProvider>
  );
}

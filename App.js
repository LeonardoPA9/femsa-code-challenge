import React from "react";
import { StatusBar } from "expo-status-bar";
import MainNavigation from "./src/navigation/MainNavigation";
import ProductsContextProvider from "./src/context/ProductsContext";

export default function App() {
  return (
    <ProductsContextProvider>
      <StatusBar style="dark" />
      <MainNavigation></MainNavigation>
    </ProductsContextProvider>
  );
}

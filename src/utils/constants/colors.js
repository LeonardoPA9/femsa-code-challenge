import { StyleSheet } from "react-native";

export const GlobalStyles = Object.freeze({
  colors: {
    background: "#F8F8F8",
    primary: "#334FFA",
    accent: "#CFD6FF",
    success: "#00B833",
    error: "#FF0000",
  },
  text: {
    secondary: "#9B9898",
    white: "#ffffff",
  },
  boxShadow: {
    primary: "black",
  },
});

export const primaryBoxShadow = StyleSheet.create({
  shadowOffset: {
    width: 2,
    height: 4,
  },
  shadowOpacity: 0.5,
  shadowRadius: 4,
  shadowColor: GlobalStyles.boxShadow.primary,
  elevation: 20,
});

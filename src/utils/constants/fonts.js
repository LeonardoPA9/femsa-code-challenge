import { StyleSheet } from "react-native";
import { getResponsiveStyle } from "../helpers/styleHelpers";

export const FontNames = Object.freeze({
  avenir: "avenir",
  "avenir-bold": "avenir-bold",
});

export const primaryTextStyle = StyleSheet.create({
  fontFamily: FontNames["avenir-bold"],
  lineHeight: getResponsiveStyle("height", {
    xs: 25,
    lg: 39,
  }),
  fontSize: getResponsiveStyle("height", {
    xs: 18,
    lg: 23,
    xl: 30,
  }),
});

export const secondaryFontStyle = StyleSheet.create({
  fontFamily: FontNames.avenir,
  fontSize: getResponsiveStyle("height", {
    xs: 17,
    xl: 21,
  }),
  lineHeight: getResponsiveStyle("height", {
    md: 23,
    xl: 27,
  }),
});

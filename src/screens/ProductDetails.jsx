import React, { memo } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";
import OptimizedImage from "../components/ui/OptimizedImage";
import { GlobalStyles } from "../utils/constants/colors";
import { FontNames, primaryTextStyle } from "../utils/constants/fonts";
import { getResponsiveStyle } from "../utils/helpers/styleHelpers";

const ProductDetails = ({ navigation, route }) => {
  const { image, points, createdAt, is_redemption } = route.params;

  return (
    <SafeAreaView style={safeAreaView}>
      <View style={container}>
        <View style={imageContainer}>
          <OptimizedImage style={imageStyle} source={{ uri: image }} />
        </View>
        <View style={textSectionContainer}>
          <Text
            fontName={FontNames["avenir-bold"]}
            style={[primaryTextStyle, subtitleStyle]}
          >
            Detalles del producto:
          </Text>
          <Text
            fontName={FontNames["avenir-bold"]}
            style={[primaryTextStyle, subtitleStyle, blackText]}
          >
            Comprado el {createdAt}
          </Text>
          <Text
            fontName={FontNames["avenir-bold"]}
            style={[primaryTextStyle, subtitleStyle]}
          >
            Con esta compra {is_redemption ? "usaste" : "acumulaste"}:
          </Text>
        </View>
        <View style={pointsContainer}>
          <Text style={[primaryTextStyle, subtitleStyle, pointsStyle]}>
            {points} puntos
          </Text>
        </View>
        <Button onPress={() => navigation.goBack()}>aceptar</Button>
      </View>
    </SafeAreaView>
  );
};

export default memo(ProductDetails);

const {
  container,
  imageContainer,
  imageStyle,
  textSectionContainer,
  subtitleStyle,
  safeAreaView,
  pointsStyle,
  blackText,
  pointsContainer,
  shadowContainer,
} = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  blackText: {
    color: "black",
  },

  container: {
    flex: 1,
    paddingTop: getResponsiveStyle("height", {
      xs: 15,
      lg: 19,
      xl: 24,
    }),
    paddingHorizontal: 24,
  },
  imageContainer: {
    paddingHorizontal: 20,
    maxHeight: getResponsiveStyle("height", {
      xs: 300,
      lg: 340,
      xl: 360,
    }),
  },
  textSectionContainer: {
    marginVertical: getResponsiveStyle("height", {
      xs: 25,
      lg: 35,
      xl: 40,
    }),
    rowGap: 20,
  },
  subtitleStyle: {
    fontSize: getResponsiveStyle("height", {
      xs: 16,
      lg: 18,
      xl: 20,
    }),
    lineHeight: getResponsiveStyle("height", {
      xs: 20,
      md: 25,
      xl: 28,
    }),
    color: GlobalStyles.text.secondary,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  pointsContainer: {
    marginBottom: getResponsiveStyle("height", {
      xs: "5%",
      lg: "10%",
      xl: "12%",
    }),
  },
  pointsStyle: {
    fontSize: getResponsiveStyle("height", {
      xs: 32,
      xl: 35,
    }),
    lineHeight: getResponsiveStyle("height", {
      xs: 44,
      xl: 50,
    }),
    color: "black",
  },
  shadowContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
});

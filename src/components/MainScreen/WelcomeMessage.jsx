import { View, StyleSheet, Text } from "react-native";
import {
  primaryTextStyle,
  secondaryFontStyle,
} from "../../utils/constants/fonts";
import { memo } from "react";
import { getResponsiveStyle } from "../../utils/helpers/styleHelpers";

const WelcomeMessage = ({ username }) => {
  return (
    <View style={container}>
      <Text style={primaryTextStyle}>Bienvenido de vuelta!</Text>
      <Text style={secondaryFontStyle}>{username}</Text>
    </View>
  );
};

export default memo(WelcomeMessage);

const { container } = StyleSheet.create({
  container: {
    marginTop: getResponsiveStyle("height", {
      xs: 20,
      lg: 25,
      xl: 30,
    }),
  },
});

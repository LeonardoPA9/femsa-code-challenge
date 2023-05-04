import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles, primaryBoxShadow } from "../../utils/constants/colors";
import { primaryTextStyle } from "../../utils/constants/fonts";
import { memo } from "react";
import { getResponsiveStyle } from "../../utils/helpers/styleHelpers";

const MessageCard = ({ subtitle, mainMessage }) => (
  <View style={container}>
    <View style={[messageCard, primaryBoxShadow]}>
      <Text style={[primaryTextStyle, subtitleStyle]}>{subtitle}</Text>
      <View style={mainMessageWrapper}>
        <Text style={[primaryTextStyle, scoreStyle]}>{mainMessage}</Text>
      </View>
    </View>
  </View>
);

export default memo(MessageCard);

const {
  messageCard,
  container,
  subtitleStyle,
  scoreStyle,
  mainMessageWrapper,
} = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: getResponsiveStyle("height", {
      xs: 15,
      lg: 20,
    }),
  },
  messageCard: {
    height: getResponsiveStyle("height", {
      xs: 130,
      lg: 143,
    }),
    width: getResponsiveStyle("height", {
      xs: 260,
      lg: 286,
      xl: 315,
    }),
    marginHorizontal: 53,
    paddingHorizontal: 19,
    paddingVertical: 21,
    borderRadius: 20,
    backgroundColor: GlobalStyles.colors.primary,
  },
  subtitleStyle: {
    fontSize: getResponsiveStyle("height", {
      xs: 14,
      lg: 16,
    }),
    lineHeight: getResponsiveStyle("height", {
      xs: 19,
      lg: 22,
    }),
    color: GlobalStyles.text.white,
  },
  mainMessageWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreStyle: {
    fontSize: getResponsiveStyle("height", {
      xs: 29,
      lg: 32,
      xl: 37,
    }),
    lineHeight: getResponsiveStyle("height", {
      xs: 40,
      lg: 44,
      xl: 50,
    }),
    color: GlobalStyles.text.white,
  },
});

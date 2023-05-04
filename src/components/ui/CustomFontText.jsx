import { StyleSheet, Text } from "react-native";
import { FontNames } from "../../utils/constants/fonts";

const CustomFontText = ({ style, children, fontName = "avenir", ...rest }) => (
  <Text {...rest} style={[styles[fontName], style]}>
    {children}
  </Text>
);

export default CustomFontText;

const styles = StyleSheet.create({
  "avenir-bold": {
    fontFamily: FontNames["avenir-bold"],
  },
  avenir: {
    fontFamily: FontNames.avenir,
  },
});

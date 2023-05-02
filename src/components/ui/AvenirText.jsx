import { StyleSheet, Text } from "react-native";
import { FontNames } from "../../utils/constants/fonts";

const AvenirText = ({ style, children, ...rest }) => (
  <Text {...rest} style={[textStyle, style]}>
    {children}
  </Text>
);

export default AvenirText;

const { textStyle } = StyleSheet.create({
  textStyle: {
    fontFamily: FontNames.avenir,
  },
});

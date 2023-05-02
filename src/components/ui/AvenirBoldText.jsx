import { StyleSheet, Text } from "react-native";
import { FontNames } from "../../utils/constants/fonts";

const AvenirBoldText = ({ style, children, ...rest }) => (
  <Text {...rest} style={[textStyle, style]}>
    {children}
  </Text>
);

export default AvenirBoldText;

const { textStyle } = StyleSheet.create({
  textStyle: {
    fontFamily: FontNames["avenir-bold"],
  },
});

import { View, Pressable, StyleSheet } from "react-native";
import { memo } from "react";
import { GlobalStyles } from "../../utils/constants/colors";
import AvenirBoldText from "./AvenirBoldText";

const CustomButton = ({ onPress, children }) => {
  return (
    <View style={container}>
      <Pressable
        style={({ pressed }) => pressed && pressedStyle}
        onPress={onPress}
      >
        <View style={button}>
          <AvenirBoldText style={buttonText}>{children}</AvenirBoldText>
        </View>
      </Pressable>
    </View>
  );
};

export default memo(CustomButton);

const { pressedStyle, button, buttonText, container } = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    backgroundColor: GlobalStyles.colors.primary,
  },
  buttonText: {
    color: GlobalStyles.text.white,
    textAlign: "center",
    textTransform: "capitalize",
  },
  pressedStyle: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.accent,
    borderRadius: 4,
  },
});

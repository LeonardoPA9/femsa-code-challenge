import { View, Pressable, StyleSheet, Text } from "react-native";
import { memo } from "react";
import { GlobalStyles } from "../../utils/constants/colors";
import { primaryTextStyle } from "../../utils/constants/fonts";

const CustomButton = ({ onPress, children }) => {
  return (
    <View style={container}>
      <Pressable
        style={({ pressed }) => pressed && pressedStyle}
        onPress={onPress}
      >
        <View style={button}>
          <Text style={[primaryTextStyle, buttonText]}>{children}</Text>
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
    paddingVertical: 12,
    backgroundColor: GlobalStyles.colors.primary,
  },
  buttonText: {
    color: GlobalStyles.text.white,
    textAlign: "center",
    fontSize: 16,
    textTransform: "capitalize",
  },
  pressedStyle: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.accent,
    borderRadius: 4,
  },
});

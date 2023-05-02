import { View, StyleSheet } from "react-native";
import AvenirText from "../ui/AvenirText";
import AvenirBoldText from "../ui/AvenirBoldText";

const WelcomeMessage = ({ username }) => {
  return (
    <View style={container}>
      <AvenirBoldText style={mainText}>Bienvenido de vuelta!</AvenirBoldText>
      <AvenirText style={userText}>{username}</AvenirText>
    </View>
  );
};

export default WelcomeMessage;

const { container, mainText, userText } = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  mainText: {
    lineHeight: 32,
    fontSize: 25,
    fontWeight: 800,
  },
  userText: {
    fontSize: 20,
    lineHeight: 27,
  },
});

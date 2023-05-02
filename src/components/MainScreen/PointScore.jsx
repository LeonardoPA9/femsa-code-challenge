import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../utils/constants/colors";
import AvenirBoldText from "../ui/AvenirBoldText";

const PointScore = ({ timeLapse, score }) => {
  return (
    <View style={scoreContainer}>
      <View style={scoreCard}>
        <AvenirBoldText style={timeLapseText}>{timeLapse}</AvenirBoldText>
        <View style={scoreWrapper}>
          <AvenirBoldText style={scoreStyle}>
            {score.toFixed(2)} pts
          </AvenirBoldText>
        </View>
      </View>
    </View>
  );
};

export default PointScore;

const { scoreCard, scoreContainer, timeLapseText, scoreStyle, scoreWrapper } =
  StyleSheet.create({
    scoreContainer: {
      alignItems: "center",
      paddingTop: 20,
    },
    scoreCard: {
      height: 143,
      width: 286,
      marginHorizontal: 53,
      paddingHorizontal: 19,
      paddingVertical: 21,
      borderRadius: 20,
      backgroundColor: GlobalStyles.colors.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      shadowColor: GlobalStyles.boxShadow.primary,
      elevation: 20,
    },
    timeLapseText: {
      fontSize: 16,
      lineHeight: 22,
      color: GlobalStyles.text.white,
    },
    scoreWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    scoreStyle: {
      fontSize: 32,
      lineHeight: 44,
      color: GlobalStyles.text.white,
    },
  });

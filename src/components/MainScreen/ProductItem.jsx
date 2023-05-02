import { View, StyleSheet, Image, Pressable } from "react-native";
import AvenirBoldText from "../ui/AvenirBoldText";
import AvenirText from "../ui/AvenirText";
import useDate from "../../hooks/useDate";
import { AntDesign } from "@expo/vector-icons";
import { GlobalStyles } from "../../utils/constants/colors";
import { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../utils/constants/routes";

const ProductItem = ({ createdAt, product, points, is_redemption, image }) => {
  const formattedDate = useDate(createdAt);
  const { navigate } = useNavigation();

  const itemsBasedOnIsRedemption = useMemo(
    () => ({
      style: {
        color: is_redemption
          ? GlobalStyles.colors.error
          : GlobalStyles.colors.success,
      },
      icon: is_redemption ? "-" : "+",
    }),
    [is_redemption]
  );

  const onPress = () => {
    navigate(RouteNames.PRODUCT_DETAILS, { image, points, createdAt, product });
  };

  return (
    <Pressable
    testID="productItem"
      onPress={onPress}
      style={({ pressed }) => pressed && pressedStyle}
    >
      <View style={container}>
        <View style={wrapper}>
          <Image
          testID="productImage"
            style={imageStyle}
            source={{
              uri: image,
            }}
          />
          <View style={infoContainer}>
            <AvenirBoldText testID="productText" style={boldTextStyle}>
              {product}
            </AvenirBoldText>
            <AvenirText testID="dateText" style={regularTextStyle}>
              {formattedDate}
            </AvenirText>
          </View>
        </View>
        <View style={wrapper}>
          <AvenirBoldText testID="pointsText" style={pointsStyle}>
            <AvenirBoldText style={[iconStyle, itemsBasedOnIsRedemption.style]}>
              {itemsBasedOnIsRedemption.icon}
            </AvenirBoldText>
            {points}
          </AvenirBoldText>
          <AntDesign name="right" size={15} color="black" />
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const {
  container,
  infoContainer,
  imageStyle,
  wrapper,
  regularTextStyle,
  boldTextStyle,
  iconStyle,
  pointsStyle,
  pressedStyle,
} = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  pressedStyle: {
    backgroundColor: GlobalStyles.colors.accent,
    opacity: 0.4,
    borderRadius: 8,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageStyle: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 8,
  },
  infoContainer: {
    flexDirection: "column",
  },
  boldTextStyle: {
    fontSize: 14,
  },
  regularTextStyle: {
    fontSize: 12,
  },
  iconStyle: {
    fontSize: 16,
  },
  pointsStyle: {
    marginRight: 8,
  },
});

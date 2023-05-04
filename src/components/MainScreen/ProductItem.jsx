import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { memo } from "react";
import {
  primaryTextStyle,
  secondaryFontStyle,
} from "../../utils/constants/fonts";
import { getResponsiveStyle } from "../../utils/helpers/styleHelpers";

const ProductItem = ({
  createdAt,
  product,
  points,
  image,
  onPress,
  is_redemption,
  iconConditionalStyle,
  icon,
}) => (
  <TouchableWithoutFeedback
    testID="product-item-touchable"
    onPress={() =>
      onPress({ image, points, createdAt, product, is_redemption })
    }
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
          <Text testID="productText" style={[primaryTextStyle, boldTextStyle]}>
            {product}
          </Text>
          <Text
            testID="dateText"
            style={[secondaryFontStyle, regularTextStyle]}
          >
            {createdAt}
          </Text>
        </View>
      </View>
      <View style={wrapper}>
        <Text
          testID="pointsText"
          style={[primaryTextStyle, boldTextStyle, pointsStyle]}
        >
          <Text style={[primaryTextStyle, iconStyle, iconConditionalStyle]}>
            {icon}
          </Text>
          {points}
        </Text>
        <AntDesign name="right" size={15} color="black" />
      </View>
    </View>
  </TouchableWithoutFeedback>
);

export default memo(ProductItem);

const {
  container,
  infoContainer,
  imageStyle,
  wrapper,
  regularTextStyle,
  boldTextStyle,
  iconStyle,
  pointsStyle,
} = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 3,
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
    fontSize: getResponsiveStyle("height", {
      xl: 15,
    }),
  },
});

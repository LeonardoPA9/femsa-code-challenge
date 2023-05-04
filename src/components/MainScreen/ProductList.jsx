import React, { useCallback, memo } from "react";
import { StyleSheet, View } from "react-native";
import ProductItem from "./ProductItem";
import { GlobalStyles } from "../../utils/constants/colors";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../utils/constants/routes";
import useDate from "../../hooks/useDate";
import { FlashList } from "@shopify/flash-list";
import { getResponsiveStyle } from "../../utils/helpers/styleHelpers";

const ProductList = ({ products }) => {
  const formatDate = useDate();
  const { navigate } = useNavigation();

  const itemBasedOnRedemption = useCallback(
    (is_redemption) => ({
      iconConditionalStyle: {
        color: is_redemption
          ? GlobalStyles.colors.error
          : GlobalStyles.colors.success,
      },
      icon: is_redemption ? "-" : "+",
    }),
    []
  );

  const onPress = useCallback((product) => {
    navigate(RouteNames.PRODUCT_DETAILS, product);
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <ProductItem
        {...{
          ...item,
          ...itemBasedOnRedemption(item.is_redemption),
          createdAt: formatDate(item.createdAt),
          onPress,
        }}
      />
    ),
    []
  );

  return (
    <View style={container}>
      <FlashList
        data={products}
        renderItem={renderItem}
        estimatedItemSize={55}
      />
    </View>
  );
};

export default memo(ProductList);

const { container } = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.text.white,
    marginTop: getResponsiveStyle("height", {
      xs: 10,
      lg: 15,
      xl: 20,
    }),
    marginBottom: 10,
    height: getResponsiveStyle("height", {
      xs: 275,
      lg: 290,
      xl: 330,
    }),
    paddingHorizontal: 20,
    borderRadius: 15,
  },
});

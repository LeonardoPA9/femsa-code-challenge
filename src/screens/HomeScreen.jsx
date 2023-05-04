import { useContext, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  View,
  Text,
} from "react-native";
import { ProductsContext } from "../context/ProductsContext";
import WelcomeMessage from "../components/MainScreen/WelcomeMessage";
import MessageCard from "../components/ui/MessageCard";
import { GlobalStyles } from "../utils/constants/colors";
import ProductList from "../components/MainScreen/ProductList";
import Button from "../components/ui/Button";
import { primaryTextStyle } from "../utils/constants/fonts";
import { getResponsiveStyle } from "../utils/helpers/styleHelpers";

const redemptionTypes = Object.freeze({
  redeemed: "redeemed",
  notRedeemed: "not redeemed",
  all: "all",
});

const HomeScreen = ({ navigation, route }) => {
  const { products, getProducts, errorFetchingProducts } =
    useContext(ProductsContext);

  useEffect(() => {
    if (products.length) return;
    getProducts();
  }, []);

  const totalPoints = useMemo(
    () =>
      products.reduce((prev, curr) => {
        if (curr.is_redemption) {
          return prev - curr.points;
        } else {
          return prev + curr.points;
        }
      }, 0),
    [products]
  );

  const setFilterParam = (redemptionType) => {
    navigation.setParams({ redemptionType });
  };

  const productsFilteredByRedemptionType = useMemo(() => {
    switch (route.params?.redemptionType) {
      case redemptionTypes.redeemed:
        return products.filter((product) => product.is_redemption);
      case redemptionTypes.notRedeemed:
        return products.filter((product) => !product.is_redemption);
      case redemptionTypes.all:
      default:
        return products;
    }
  }, [route.params?.redemptionType, products]);

  const areProductsFiltered = useMemo(
    () =>
      [redemptionTypes.notRedeemed, redemptionTypes.redeemed].includes(
        route.params?.redemptionType
      ),
    [route.params?.redemptionType]
  );

  if (errorFetchingProducts) {
    return (
      <SafeAreaView style={AndroidSafeArea}>
        <View style={sectionContainer}>
          <MessageCard subtitle="Lo sentimos" mainMessage="Hubo un error" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={AndroidSafeArea}>
      <View style={container}>
        <WelcomeMessage username="Leonardo Pesina" />
        <View style={sectionContainer}>
          <Text style={[primaryTextStyle, subtitleText]}>TUS PUNTOS</Text>
          <MessageCard
            subtitle="Diciembre"
            mainMessage={`${totalPoints.toFixed(2)} pts`}
          />
        </View>
        <View style={sectionContainer}>
          <Text style={[primaryTextStyle, subtitleText]}>TUS MOVIMIENTOS</Text>
          <ProductList products={productsFilteredByRedemptionType} />
        </View>
        <View style={[sectionContainer, buttonSection]}>
          {areProductsFiltered ? (
            <Button onPress={() => setFilterParam(redemptionTypes.all)}>
              todos
            </Button>
          ) : (
            <>
              <Button
                onPress={() => setFilterParam(redemptionTypes.notRedeemed)}
              >
                ganados
              </Button>
              <Button onPress={() => setFilterParam(redemptionTypes.redeemed)}>
                canjeados
              </Button>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const {
  AndroidSafeArea,
  container,
  subtitleText,
  sectionContainer,
  buttonSection,
} = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  subtitleText: {
    fontSize: getResponsiveStyle("height", {
      xs: 15,
      lg: 18,
    }),
    lineHeight: getResponsiveStyle("height", {
      xs: 20,
      lg: 25,
    }),
    color: GlobalStyles.text.secondary,
  },
  sectionContainer: {
    marginTop: getResponsiveStyle("height", {
      xs: 15,
      lg: 25,
    }),
  },
  buttonSection: {
    flexDirection: "row",
    columnGap: 10,
  },
});

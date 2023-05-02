import { useContext, useLayoutEffect, useMemo } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  View,
} from "react-native";
import { ProductsContext } from "../context/ProductsContext";
import WelcomeMessage from "../components/MainScreen/WelcomeMessage";
import PointScore from "../components/MainScreen/PointScore";
import AvenirBoldText from "../components/ui/AvenirBoldText";
import { GlobalStyles } from "../utils/constants/colors";
import ProductList from "../components/MainScreen/ProductList";
import Button from "../components/ui/Button";
import { RouteNames } from "../utils/constants/routes";

const redemptionTypes = Object.freeze({
  redeemed: "redeemed",
  notRedeemed: "not redeemed",
  all: "all",
});

const HomeScreen = ({ navigation, route }) => {
  const { products, getProducts } = useContext(ProductsContext);

  useLayoutEffect(() => {
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

  const goToFilterPage = (redemptionType) => {
    navigation.navigate(RouteNames.HOME, { redemptionType });
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

  return (
    <SafeAreaView style={AndroidSafeArea}>
      <View style={container}>
        <WelcomeMessage username="Leonardo Pesina" />
        <View style={sectionContainer}>
          <AvenirBoldText style={subtitleText}>TUS PUNTOS</AvenirBoldText>
          <PointScore timeLapse="Diciembre" score={totalPoints} />
        </View>
        <View style={sectionContainer}>
          <AvenirBoldText style={subtitleText}>TUS MOVIMIENTOS</AvenirBoldText>
          <ProductList products={productsFilteredByRedemptionType} />
        </View>
        <View style={[sectionContainer, buttonSection]}>
          {[redemptionTypes.notRedeemed, redemptionTypes.redeemed].includes(
            route.params?.redemptionType
          ) ? (
            <Button onPress={() => goToFilterPage(redemptionTypes.all)}>
              todos
            </Button>
          ) : (
            <>
              <Button
                onPress={() => goToFilterPage(redemptionTypes.notRedeemed)}
              >
                ganados
              </Button>
              <Button onPress={() => goToFilterPage(redemptionTypes.redeemed)}>
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
    paddingHorizontal: 24,
    flex: 1,
  },
  subtitleText: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: 800,
    color: GlobalStyles.text.secondary,
  },
  sectionContainer: {
    marginTop: 25,
  },
  buttonSection: {
    flexDirection: "row",
    columnGap: 10,
  },
});

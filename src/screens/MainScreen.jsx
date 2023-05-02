import { useContext, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
  View,
  FlatList,
} from "react-native";
import { ProductsContext } from "../context/ProductsContext";
import { Ionicons } from "@expo/vector-icons";

const MainScreen = () => {
  const { products, getProducts } = useContext(ProductsContext);

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

  return (
    <SafeAreaView style={AndroidSafeArea}>
      <View style={container}>
        <View>
          <Text>Bienvenido de vuelta!</Text>
          <Text>Username</Text>
        </View>
        <View>
          <Text>Tus puntos</Text>
          <View>
            <Text>Diciembre</Text>
            <Text>{totalPoints}</Text>
          </View>
        </View>

        <View>
          <Text>Tus movimientos</Text>
          <FlatList data={[]} />
        </View>

        <View></View>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const { AndroidSafeArea, container } = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flex: 1,
  },
});

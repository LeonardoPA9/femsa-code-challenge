import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ProductItem from "./ProductItem";
import { GlobalStyles } from "../../utils/constants/colors";

const ProductList = ({ products }) => {
  return (
    <FlatList
      style={container}
      data={products}
      renderItem={({ item }) => <ProductItem {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ProductList;

const { container } = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.text.white,
    marginTop: 20,
    maxHeight: 250,
    padding: 20,
    borderRadius: 15,
  },
});

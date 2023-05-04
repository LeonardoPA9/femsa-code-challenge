import { createContext, useState } from "react";
import { fetchAllProducts } from "../api/endpoints";
import { Alert } from "react-native";

export const ProductsContext = createContext({
  products: [],
  errorFetchingProducts: false,
  getProducts: async () => {},
});

const ProductsContextProvider = ({ children }) => {
  const [{ products, errorFetchingProducts }, setContextStatus] = useState({
    products: [],
    errorFetchingProducts: false,
  });

  const getProducts = async () => {
    try {
      const products = await fetchAllProducts();
      setContextStatus({
        products: products.data.map(({ id, ...rest }) => ({
          key: id,
          ...rest,
        })),
        errorFetchingProducts: false,
      });
    } catch (error) {
      Alert.alert("Oops...", "Hubo un error obteniendo los productos");
      setContextStatus({ products: [], errorFetchingProducts: true });
    }
  };

  return (
    <ProductsContext.Provider
      value={{ products, errorFetchingProducts, getProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;

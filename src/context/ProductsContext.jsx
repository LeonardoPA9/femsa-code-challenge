import { createContext, useState } from "react";
import { fetchAllProducts } from "../api/endpoints";
import { Alert } from "react-native";

export const ProductsContext = createContext({
  products: [],
  getProducts: async () => {},
});

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const products = await fetchAllProducts();
      setProducts(products.data);
    } catch (error) {
      Alert.alert("Oops...", "Hubo un error obteniendo los productos");
    }
  };

  return (
    <ProductsContext.Provider value={{ products, getProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;

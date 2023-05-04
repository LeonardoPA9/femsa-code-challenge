import React, { useContext } from "react";
import { act, render } from "@testing-library/react-native";
import ProductsContextProvider, {
  ProductsContext,
} from "../../context/ProductsContext";
import { Alert, Text } from "react-native";
import { renderHook } from "@testing-library/react-hooks";
import { fetchAllProducts } from "../../api/endpoints";

const mocked_response = [
  {
    createdAt: "2022-12-09T06:34:25.607Z",
    product: "Handmade Metal Shoes",
    points: 16434,
    image: "https://loremflickr.com/640/480/transport",
    is_redemption: false,
    id: "1",
  },
  {
    createdAt: "2022-12-09T17:02:51.904Z",
    product: "Recycled Plastic Tuna",
    points: 92984,
    image: "https://loremflickr.com/640/480/technics",
    is_redemption: false,
    id: "2",
  },
];

jest.mock("../../api/endpoints", () => ({
  fetchAllProducts: jest.fn(() => ({
    data: mocked_response,
  })),
}));

describe("ProductsContext", () => {
  it("renders without errors", () => {
    const { getByTestId } = render(
      <ProductsContextProvider>
        <Text testID="child">Hello world</Text>
      </ProductsContextProvider>
    );
    expect(getByTestId("child")).toBeDefined();
  });

  it("sets a default value for products and getProducts", () => {
    const { result } = renderHook(() => useContext(ProductsContext));
    expect(result.current.products).toEqual([]);
    expect(result.current.getProducts).toBeInstanceOf(Function);
  });

  it("retrieves products from the API and updates the state", async () => {
    const { result } = renderHook(() => useContext(ProductsContext), {
      wrapper: ProductsContextProvider,
    });
    await act(async () => {
      await result.current.getProducts();
    });

    expect(result.current.products).toEqual(
      mocked_response.map(({ id, ...rest }) => ({ key: id, ...rest }))
    );
  });

  it("handles errors and sets products state to an empty array", async () => {
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
    fetchAllProducts.mockImplementationOnce(() => {
      throw new Error("Network error");
    });

    const { result } = renderHook(() => useContext(ProductsContext), {
      wrapper: ProductsContextProvider,
    });
    await act(async () => {
      await result.current.getProducts();
    });

    expect(result.current.products).toEqual([]);
    expect(Alert.alert).toHaveBeenCalled();
  });
});

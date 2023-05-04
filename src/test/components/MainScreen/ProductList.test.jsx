import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import ProductList from "../../../components/MainScreen/ProductList";
import { RouteNames } from "../../../utils/constants/routes";
/**In order to improve the flat list performance, I added the flash list library
 * however, by doing this, it caused the unit tests for this and all of the
 * tests related to the list to crash, and to fix it, I'd need to set up the tests for
 * the flash list
 *
 * Given this is a code challenge, and not the actual project I think that leaving it as is, is a good call
 */
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const mockedProducts = [
  {
    key: 1,
    product: "Product 1",
    is_redemption: true,
    createdAt: "2023-05-01T00:00:00Z",
    image: "testImage",
    points: 50,
  },
  {
    key: 2,
    product: "Product 2",
    is_redemption: false,
    createdAt: "2023-05-02T00:00:00Z",
    image: "this.is.a.test.url",
    points: 100,
  },
];

describe("ProductList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getAllByTestId } = render(
      <ProductList products={mockedProducts} />
    );
    const productItems = getAllByTestId("product-item-touchable");
    expect(productItems.length).toBe(2);
  });

  it("calls navigate with the correct product when a ProductItem is pressed", () => {
    const { getAllByTestId } = render(
      <ProductList products={mockedProducts} />
    );
    const productItems = getAllByTestId("product-item-touchable");

    fireEvent.press(productItems[0]);
    expect(mockNavigate).toHaveBeenCalledWith(RouteNames.PRODUCT_DETAILS, {
      createdAt: "1 de Mayo, 2023",
      image: mockedProducts[0].image,
      points: mockedProducts[0].points,
      product: mockedProducts[0].product,
      is_redemption: mockedProducts[0].is_redemption,
    });

    fireEvent.press(productItems[1]);
    expect(mockNavigate).toHaveBeenCalledWith(RouteNames.PRODUCT_DETAILS, {
      createdAt: "2 de Mayo, 2023",
      image: mockedProducts[1].image,
      points: mockedProducts[1].points,
      product: mockedProducts[1].product,
      is_redemption: mockedProducts[1].is_redemption,
    });
  });
});

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import ProductDetails from "../../screens/ProductDetails";

describe("ProductDetails component", () => {
  const mockGoBack = jest.fn();
  const navigation = { goBack: mockGoBack };
  const route = {
    params: {
      image: "https://example.com/image.jpg",
      points: 100,
      createdAt: "2023-05-04",
      is_redemption: false,
    },
  };

  test("renders product details correctly", () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <ProductDetails navigation={navigation} route={route} />
      </NavigationContainer>
    );

    expect(getByText("Detalles del producto:")).toBeTruthy();
    expect(getByText("Comprado el 2023-05-04")).toBeTruthy();
    expect(getByText("Con esta compra acumulaste:")).toBeTruthy();
    expect(getByText("100 puntos")).toBeTruthy();
    expect(getByTestId("optimized-image")).toBeTruthy();
  });

  test("button triggers navigation.goBack", () => {
    const { getByText } = render(
      <NavigationContainer>
        <ProductDetails navigation={navigation} route={route} />
      </NavigationContainer>
    );

    fireEvent.press(getByText("aceptar"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});

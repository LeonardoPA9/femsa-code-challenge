import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { ProductsContext } from "../../context/ProductsContext";
import HomeScreen from "../../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { RouteNames } from "../../utils/constants/routes";

describe("HomeScreen", () => {
  const mockProducts = [
    {
      id: "1",
      product: "Product 1",
      points: 100,
      is_redemption: false,
    },
    {
      id: "2",
      product: "Product 2",
      points: 50,
      is_redemption: false,
    },
  ];

  const mockGetProducts = jest.fn();

  it("should display the welcome message and point score", async () => {
    const { getByText } = render(
      <ProductsContext.Provider
        value={{ products: mockProducts, getProducts: mockGetProducts }}
      >
        <NavigationContainer>
          <HomeScreen
            navigation={{ navigate: jest.fn() }}
            route={{ params: {} }}
          />
        </NavigationContainer>
      </ProductsContext.Provider>
    );

    await waitFor(() => expect(mockGetProducts).not.toHaveBeenCalled());
    expect(getByText("Leonardo Pesina")).not.toBeNull();
    expect(getByText("Bienvenido de vuelta!")).not.toBeNull();
    expect(getByText("TUS PUNTOS")).not.toBeNull();
    expect(getByText("150.00 pts")).not.toBeNull();
  });

  it("should display the product list", async () => {
    const { getByText } = render(
      <ProductsContext.Provider
        value={{ products: mockProducts, getProducts: mockGetProducts }}
      >
        <NavigationContainer>
          <HomeScreen
            navigation={{ navigate: jest.fn() }}
            route={{ params: {} }}
          />
        </NavigationContainer>
      </ProductsContext.Provider>
    );

    await waitFor(() => expect(mockGetProducts).not.toHaveBeenCalled());
    expect(getByText("TUS MOVIMIENTOS")).not.toBeNull();
    expect(getByText("Product 1")).not.toBeNull();
    expect(getByText("+100")).not.toBeNull();
    expect(getByText("Product 2")).not.toBeNull();
    expect(getByText("+50")).not.toBeNull();
  });

  it("renders products filtered by redemption type", () => {
    const mockGetProducts = jest.fn();
    const mockProducts = [
      { id: 1, product: "Product 1", points: 10, is_redemption: false },
      { id: 2, product: "Product 2", points: 20, is_redemption: true },
      { id: 3, product: "Product 3", points: 30, is_redemption: false },
    ];

    const { getByText, queryByText } = render(
      <ProductsContext.Provider
        value={{ products: mockProducts, getProducts: mockGetProducts }}
      >
        <NavigationContainer>
          <HomeScreen
            navigation={{ navigate: jest.fn() }}
            route={{ params: { redemptionType: "redeemed" } }}
          />
        </NavigationContainer>
      </ProductsContext.Provider>
    );

    expect(getByText("TUS MOVIMIENTOS")).not.toBeNull();
    expect(queryByText("Product 1")).toBeNull();
    expect(queryByText("Product 3")).toBeNull();
    expect(getByText("Product 2")).not.toBeNull();
  });

  it("navigates to the filter page", () => {
    const mockGetProducts = jest.fn();
    const mockNavigate = jest.fn();
    const mockProducts = [
      { id: 1, product: "Product 1", points: 10, is_redemption: false },
      { id: 2, product: "Product 2", points: 20, is_redemption: true },
      { id: 3, product: "Product 3", points: 30, is_redemption: false },
    ];

    const { getByText } = render(
      <ProductsContext.Provider
        value={{ products: mockProducts, getProducts: mockGetProducts }}
      >
        <NavigationContainer>
          <HomeScreen
            navigation={{ navigate: mockNavigate }}
            route={{ params: {} }}
          />
        </NavigationContainer>
      </ProductsContext.Provider>
    );

    const notRedeemedButton = getByText("ganados");
    fireEvent.press(notRedeemedButton);
    expect(mockNavigate).toHaveBeenCalledWith(RouteNames.HOME, {
      redemptionType: "not redeemed",
    });

    const redeemedButton = getByText("canjeados");
    fireEvent.press(redeemedButton);
    expect(mockNavigate).toHaveBeenCalledWith(RouteNames.HOME, {
      redemptionType: "redeemed",
    });
  });
});

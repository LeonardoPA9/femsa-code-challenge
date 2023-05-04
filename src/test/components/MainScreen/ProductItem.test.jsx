import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProductItem from "../../../components/MainScreen/ProductItem";

jest.mock("../../../hooks/useDate");
jest.mock("@react-navigation/native");

describe("ProductItem", () => {
  const mockOnPress = jest.fn();
  const mockProps = {
    createdAt: "2022-05-10T18:20:00.000Z",
    product: "Test Product",
    points: 10,
    image: "https://example.com/test.jpg",
    onPress: mockOnPress,
    iconConditionalStyle: { color: "red" },
    is_redemption: false,
    icon: "+",
  };

  it("renders component correctly", () => {
    const { getByTestId, getByText } = render(<ProductItem {...mockProps} />);

    expect(getByTestId("product-item-touchable")).toBeDefined();
    expect(getByTestId("productImage")).toBeDefined();
    expect(getByText(mockProps.product)).toBeDefined();
    expect(getByText(mockProps.createdAt)).toBeDefined();
    expect(getByText(`${mockProps.icon}${mockProps.points}`)).toBeDefined();
  });

  it("calls onPress when item pressed", () => {
    const { getByTestId } = render(<ProductItem {...mockProps} />);
    fireEvent.press(getByTestId("product-item-touchable"));
    expect(mockOnPress).toHaveBeenCalledWith({
      image: mockProps.image,
      points: mockProps.points,
      createdAt: mockProps.createdAt,
      product: mockProps.product,
      is_redemption: mockProps.is_redemption,
    });
  });

  it("formats date correctly", () => {
    const formattedDate = "11 de Mayo, 2022";
    const { getByText } = render(
      <ProductItem {...mockProps} createdAt={formattedDate} />
    );
    expect(getByText(formattedDate)).toBeDefined();
  });

  it("displays the proper icon and color", () => {
    const { getByTestId } = render(
      <ProductItem
        {...mockProps}
        icon="-"
        iconConditionalStyle={{ color: "green" }}
      />
    );
    expect(getByTestId("pointsText").props.children[0].props.style[2]).toEqual({
      color: "green",
    });
    expect(getByTestId("pointsText").props.children[0].props.children).toEqual(
      "-"
    );
  });
});

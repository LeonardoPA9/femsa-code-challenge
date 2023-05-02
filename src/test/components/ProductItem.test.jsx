import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";
import useDate from "../../hooks/useDate";
import ProductItem from "../../components/MainScreen/ProductItem";
import { RouteNames } from "../../utils/constants/routes";

jest.mock("../../hooks/useDate");
jest.mock("@react-navigation/native");

describe("ProductItem", () => {
  const props = {
    product: "Product",
    points: 100,
    createdAt: "2022-01-01T00:00:00.000Z",
    is_redemption: false,
    image: "https://example.com/image.jpg",
    navigate: jest.fn(),
  };

  beforeAll(() => {
    useDate.mockReturnValue("01/01/2022");
    useNavigation.mockReturnValue({ navigate: props.navigate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with the correct props", () => {
    const { getByText, getByTestId } = render(<ProductItem {...props} />);

    expect(getByText(props.product)).toBeDefined();
    expect(getByText("01/01/2022")).toBeDefined();
    expect(getByText("+100")).toBeDefined();
    expect(getByTestId("productImage")).toBeDefined();
  });

  it("should navigate to the product details screen when pressed", () => {
    const { getByTestId } = render(<ProductItem {...props} />);

    fireEvent.press(getByTestId("productItem"));

    expect(props.navigate).toHaveBeenCalledWith(RouteNames.PRODUCT_DETAILS, {
      product: props.product,
      points: props.points,
      createdAt: props.createdAt,
      image: props.image,
    });
  });

  it("should render correctly when is_redemption prop is true", () => {
    const { getByText } = render(
      <ProductItem {...{ ...props, is_redemption: true }} />
    );

    expect(getByText("-100")).toBeDefined();
  });
});

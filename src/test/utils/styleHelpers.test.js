import { Dimensions } from "react-native";
import {
  getResponsiveStyle,
  isBetween,
} from "../../utils/helpers/styleHelpers";

describe("isBetween", () => {
  test("returns true when value is within the range", () => {
    expect(isBetween(5, 1, 10)).toBe(true);
  });

  test("returns true when value is at the range boundaries", () => {
    expect(isBetween(1, 0, 10)).toBe(true);
    expect(isBetween(9, 1, 10)).toBe(true);
  });

  test("returns false when value is outside the range", () => {
    expect(isBetween(0, 1, 10)).toBe(false);
    expect(isBetween(11, 1, 10)).toBe(false);
  });
});

const mockDimensionsGet = (width, height) => {
  Dimensions.get = jest.fn(() => ({
    width,
    height,
  }));
};

describe("getResponsiveStyle", () => {
  const style = {
    xs: { color: "red" },
    sm: { color: "green" },
    md: { color: "blue" },
    lg: { color: "yellow" },
    xl: { color: "purple" },
  };

  it("returns correct style for xs breakpoint", () => {
    mockDimensionsGet(300, 600);
    expect(getResponsiveStyle("width", style)).toEqual(style.xs);
  });

  it("returns correct style height for xl breakpoint", () => {
    mockDimensionsGet(605, 1200);
    expect(getResponsiveStyle("height", style)).toEqual(style.xl);
  });

  it("returns correct style for xl breakpoint", () => {
    mockDimensionsGet(1200, 2400);
    expect(getResponsiveStyle("width", style)).toEqual(style.xl);
  });

  it("returns correct fallback style when a breakpoint style is missing", () => {
    const incompleteStyle = {
      xs: { color: "red" },
      md: { color: "blue" },
      xl: { color: "purple" },
    };

    mockDimensionsGet(350, 1200);
    expect(getResponsiveStyle("width", incompleteStyle)).toEqual(style.xs);


    mockDimensionsGet(1600, 3200);
    expect(getResponsiveStyle("width", incompleteStyle)).toEqual(style.xl);
  });
});

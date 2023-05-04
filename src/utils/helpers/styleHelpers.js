import { Dimensions } from "react-native";
import { breakpoints, BreakpointValues } from "../constants/breakpoints";

export const isBetween = (value, minRange, maxRange) => {
  return value > minRange && value < maxRange;
};

export const getResponsiveStyle = (screenProperty, style) => {
  const value = Dimensions.get("window")[screenProperty];

  if (value < BreakpointValues[screenProperty].xs) {
    return style[breakpoints.xs];
  } else if (
    isBetween(
      value,
      BreakpointValues[screenProperty].xs,
      BreakpointValues[screenProperty].sm
    )
  ) {
    return style[breakpoints.sm] ?? style[breakpoints.xs];
  } else if (
    isBetween(
      value,
      BreakpointValues[screenProperty].sm,
      BreakpointValues[screenProperty].md
    )
  ) {
    return (
      style[breakpoints.md] ?? style[breakpoints.sm] ?? style[breakpoints.xs]
    );
  } else if (
    isBetween(
      value,
      BreakpointValues[screenProperty].md,
      BreakpointValues[screenProperty].lg
    )
  ) {
    return (
      style[breakpoints.lg] ??
      style[breakpoints.md] ??
      style[breakpoints.sm] ??
      style[breakpoints.xs]
    );
  } else if (value >= BreakpointValues[screenProperty].xl) {
    return (
      style[breakpoints.xl] ??
      style[breakpoints.lg] ??
      style[breakpoints.md] ??
      style[breakpoints.sm] ??
      style[breakpoints.xs]
    );
  }

  return style[breakpoints.xs];
};

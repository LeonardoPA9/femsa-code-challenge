import React from "react";
import { render } from "@testing-library/react-native";
import MainNavigation from "../../navigation/MainNavigation";

describe("MainNavigation", () => {
  it("matches snapshot", () => {
    const { toJSON } = render(<MainNavigation />);
    expect(toJSON()).toMatchSnapshot();
  });
});

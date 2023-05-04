import React from "react";
import { render } from "@testing-library/react-native";
import CustomFontText from "../../../components/ui/CustomFontText";
import { FontNames } from "../../../utils/constants/fonts";

describe("CustomFontText", () => {
  it("should render the text with the avenir font by default", () => {
    const { getByText } = render(<CustomFontText>Avenir Text</CustomFontText>);
    const textComponent = getByText("Avenir Text");

    expect(textComponent.props.style[0]).toMatchObject({
      fontFamily: FontNames.avenir,
    });
  });

  it("should render the text with the avenir-bold font when specified", () => {
    const { getByText } = render(
      <CustomFontText fontName={FontNames["avenir-bold"]}>
        Avenir Bold Text
      </CustomFontText>
    );
    const textComponent = getByText("Avenir Bold Text");

    expect(textComponent.props.style[0]).toMatchObject({
      fontFamily: FontNames["avenir-bold"],
    });
  });

  it("should apply custom styles passed as props", () => {
    const customStyle = { color: "red", fontSize: 18 };
    const { getByText } = render(
      <CustomFontText style={customStyle}>Styled Avenir Text</CustomFontText>
    );
    const textComponent = getByText("Styled Avenir Text");

    expect(textComponent.props.style).toContainEqual(customStyle);
  });
});

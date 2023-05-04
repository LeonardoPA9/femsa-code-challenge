import React from "react";
import { render } from "@testing-library/react-native";
import MessageCard from "../../../components/ui/MessageCard";
import { GlobalStyles } from "../../../utils/constants/colors";

describe("MessageCard", () => {
  const props = {
    subtitle: "Subtitle",
    mainMessage: "Main Message",
  };

  it("should render the component with the provided subtitle and mainMessage", () => {
    const { getByText } = render(<MessageCard {...props} />);

    expect(getByText(props.subtitle)).toBeDefined();
    expect(getByText(props.mainMessage)).toBeDefined();
  });

  it("should apply the correct styles to the subtitle", () => {
    const { getByText } = render(<MessageCard {...props} />);
    const subtitleComponent = getByText(props.subtitle);

    expect(subtitleComponent.props.style[1]).toMatchObject({
      fontSize: 16,
      lineHeight: 22,
      color: GlobalStyles.text.white,
    });
  });

  it("should apply the correct styles to the mainMessage", () => {
    const { getByText } = render(<MessageCard {...props} />);
    const mainMessageComponent = getByText(props.mainMessage);

    expect(mainMessageComponent.props.style[1]).toMatchObject({
      fontSize: 37,
      lineHeight: 50,
      color: GlobalStyles.text.white,
    });
  });
});

import { render } from "@testing-library/react-native";
import WelcomeMessage from "../../../components/MainScreen/WelcomeMessage";

describe("Welcome Message", () => {
  it("Should render properly with appropiate props", () => {
    const { getByText } = render(<WelcomeMessage username="Leonardo" />);
    const username = getByText("Leonardo");
    expect(username).toBeTruthy();
  });
});

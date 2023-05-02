import { render, screen } from "@testing-library/react-native";
import "@testing-library/jest-native";
import "@testing-library/jest-dom";
import App from "./App";

describe("<App />", () => {
  it("renders Hello World message on the home page", async () => {
    const { getByText } = render(<App />);
    const message = getByText(/Hello/i);
    expect(message).toBeTruthy();
  });
});

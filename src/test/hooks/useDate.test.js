import { renderHook } from "@testing-library/react-hooks";
import useDate from "../../hooks/useDate";

describe("useDate", () => {
  it("formats date correctly", () => {
    const { result } = renderHook(() => useDate());
    const formattedDate = result.current("2022-05-10T18:20:00.000Z");
    expect(formattedDate).toEqual("10 de Mayo, 2022");
  });
});

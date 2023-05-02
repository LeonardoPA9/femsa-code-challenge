import { renderHook } from "@testing-library/react-hooks";
import useDate from "../../hooks/useDate";

describe("useDate", () => {
  it("returns the expected date string", () => {
    const { result } = renderHook(() => useDate("2022-05-02T00:00:00.000Z"));
    expect(result.current).toBe("2 de Mayo, 2022");
  });

  it("returns the expected date string for a different date", () => {
    const { result } = renderHook(() => useDate("2022-12-25T00:00:00.000Z"));
    expect(result.current).toBe("25 de Diciembre, 2022");
  });

  it("returns the expected date string for an invalid date", () => {
    const { result } = renderHook(() => useDate("invalid date"));
    expect(result.current).toBe("NaN de undefined, NaN");
  });
});

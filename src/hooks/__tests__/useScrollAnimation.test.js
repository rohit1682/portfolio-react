import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScrollAnimation } from "../useScrollAnimation";

describe("useScrollAnimation", () => {
  it("returns ref and inView", () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.inView).toBe("boolean");
  });

  it("accepts custom threshold", () => {
    const { result } = renderHook(() => useScrollAnimation(0.5));
    expect(result.current).toBeDefined();
  });
});

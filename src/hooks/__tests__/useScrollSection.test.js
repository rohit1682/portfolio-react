import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useScrollSection from "../useScrollSection";

describe("useScrollSection", () => {
  it("returns ref and transforms object", () => {
    const { result } = renderHook(() => useScrollSection());
    expect(result.current.ref).toBeDefined();
    expect(result.current.scrollYProgress).toBeDefined();
    expect(result.current.transforms).toBeDefined();
    expect(result.current.transforms.opacity).toBeDefined();
    expect(result.current.transforms.y).toBeDefined();
    expect(result.current.transforms.scale).toBeDefined();
    expect(result.current.transforms.rotateX).toBeDefined();
  });

  it("accepts custom options", () => {
    const { result } = renderHook(() =>
      useScrollSection({ offset: ["start start", "end end"] })
    );
    expect(result.current.ref).toBeDefined();
  });
});

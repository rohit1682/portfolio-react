import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useScrollSection from "../useScrollSection";

describe("useScrollSection", () => {
  it("returns ref and style object", () => {
    const { result } = renderHook(() => useScrollSection());
    expect(result.current.ref).toBeDefined();
    expect(result.current.scrollYProgress).toBeDefined();
    expect(result.current.style).toBeDefined();
    expect(result.current.style.opacity).toBeDefined();
    expect(result.current.style.y).toBeDefined();
    expect(result.current.style.scale).toBeDefined();
    expect(result.current.style.rotateX).toBeDefined();
  });

  it("accepts custom options", () => {
    const { result } = renderHook(() =>
      useScrollSection({ offset: ["start start", "end end"] })
    );
    expect(result.current.ref).toBeDefined();
  });

  it("accepts a preset name", () => {
    const { result } = renderHook(() =>
      useScrollSection({ preset: "flipIn" })
    );
    expect(result.current.style).toBeDefined();
    expect(result.current.style.opacity).toBeDefined();
  });

  it("falls back to zoomFade for invalid preset", () => {
    const { result } = renderHook(() =>
      useScrollSection({ preset: "nonexistent" })
    );
    expect(result.current.style).toBeDefined();
    expect(result.current.style.opacity).toBeDefined();
  });

  it("returns all PROPS in style", () => {
    const { result } = renderHook(() => useScrollSection());
    const props = ["opacity", "x", "y", "z", "scale", "scaleX", "scaleY", "rotateX", "rotateY"];
    for (const prop of props) {
      expect(result.current.style[prop]).toBeDefined();
    }
  });
});

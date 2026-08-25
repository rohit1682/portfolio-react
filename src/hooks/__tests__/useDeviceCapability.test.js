import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useDeviceCapability from "../useDeviceCapability";

describe("useDeviceCapability", () => {
  beforeEach(() => {
    vi.stubGlobal("innerWidth", 1440);
    Object.defineProperty(navigator, "hardwareConcurrency", {
      value: 8,
      configurable: true,
    });
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({}));
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
  });

  it("returns high tier for powerful devices", () => {
    const { result } = renderHook(() => useDeviceCapability());
    expect(result.current.tier).toBe("high");
  });

  it("returns low tier when prefers-reduced-motion is set", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    const { result } = renderHook(() => useDeviceCapability());
    expect(result.current.tier).toBe("low");
  });

  it("returns low tier for narrow screens", () => {
    vi.stubGlobal("innerWidth", 600);
    const { result } = renderHook(() => useDeviceCapability());
    expect(result.current.tier).toBe("low");
  });

  it("returns medium tier for mid-range devices", () => {
    vi.stubGlobal("innerWidth", 900);
    Object.defineProperty(navigator, "hardwareConcurrency", {
      value: 2,
      configurable: true,
    });
    const { result } = renderHook(() => useDeviceCapability());
    expect(result.current.tier).toBe("medium");
  });

  it("returns low tier when WebGL is unavailable", () => {
    HTMLCanvasElement.prototype.getContext = vi.fn(() => null);
    const { result } = renderHook(() => useDeviceCapability());
    expect(result.current.tier).toBe("low");
  });

  it("returns low tier when hardwareConcurrency < 2", () => {
    Object.defineProperty(navigator, "hardwareConcurrency", {
      value: 1,
      configurable: true,
    });
    const { result } = renderHook(() => useDeviceCapability());
    expect(result.current.tier).toBe("low");
  });
});

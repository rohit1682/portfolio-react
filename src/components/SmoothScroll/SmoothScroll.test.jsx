import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SmoothScroll from "./SmoothScroll";

describe("SmoothScroll", () => {
  it("renders children", () => {
    render(
      <SmoothScroll>
        <div>Child content</div>
      </SmoothScroll>
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("does not crash on mount/unmount", () => {
    const { unmount } = render(
      <SmoothScroll><p>Test</p></SmoothScroll>
    );
    unmount();
  });

  it("initializes Lenis when reduced motion is not preferred", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    const rafSpy = vi.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
    const { unmount } = render(
      <SmoothScroll><p>Content</p></SmoothScroll>
    );
    expect(rafSpy).toHaveBeenCalled();
    unmount();
    rafSpy.mockRestore();
  });

  it("skips Lenis when reduced motion is preferred", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    const rafSpy = vi.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
    const callsBefore = rafSpy.mock.calls.length;
    render(
      <SmoothScroll><p>Content</p></SmoothScroll>
    );
    const callsAfter = rafSpy.mock.calls.length;
    expect(callsAfter - callsBefore).toBe(0);
    rafSpy.mockRestore();
  });

  it("cleans up on unmount with active Lenis", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    const cancelSpy = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    vi.spyOn(window, "requestAnimationFrame").mockReturnValue(42);
    const { unmount } = render(
      <SmoothScroll><p>Content</p></SmoothScroll>
    );
    unmount();
    expect(cancelSpy).toHaveBeenCalledWith(42);
    cancelSpy.mockRestore();
  });
});

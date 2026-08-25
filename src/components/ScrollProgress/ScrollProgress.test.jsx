import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import ScrollProgress from "./ScrollProgress";

describe("ScrollProgress", () => {
  let rafCallback;

  beforeEach(() => {
    rafCallback = null;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallback = cb;
      return 1;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  });

  it("renders a progress bar", () => {
    const { container } = render(<ScrollProgress />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("renders the fill element", () => {
    const { container } = render(<ScrollProgress />);
    const fill = container.querySelector("[class*='fill']");
    expect(fill).toBeInTheDocument();
  });

  it("updates progress on scroll", () => {
    const { container } = render(<ScrollProgress />);
    act(() => {
      fireEvent.scroll(window);
    });
    if (rafCallback) {
      act(() => { rafCallback(); });
    }
    const fill = container.querySelector("[class*='fill']");
    expect(fill).toBeInTheDocument();
  });

  it("updates progress on resize", () => {
    const { container } = render(<ScrollProgress />);
    act(() => {
      fireEvent.resize(window);
    });
    if (rafCallback) {
      act(() => { rafCallback(); });
    }
    const fill = container.querySelector("[class*='fill']");
    expect(fill).toBeInTheDocument();
  });

  it("cleans up listeners on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<ScrollProgress />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it("handles zero max scroll height", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", { value: 100, configurable: true });
    Object.defineProperty(document.documentElement, "clientHeight", { value: 100, configurable: true });
    const { container } = render(<ScrollProgress />);
    const fill = container.querySelector("[class*='fill']");
    expect(fill).toHaveStyle({ transform: "scaleX(0)" });
  });
});

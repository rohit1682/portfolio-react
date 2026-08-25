import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CustomCursor from "./CustomCursor";

describe("CustomCursor", () => {
  beforeEach(() => {
    delete window.ontouchstart;
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });
    Object.defineProperty(window.navigator, "maxTouchPoints", {
      writable: true,
      value: 0,
    });
  });

  it("renders dot and ring elements", () => {
    render(<CustomCursor />);
    expect(screen.getByTestId("cursor-dot")).toBeInTheDocument();
    expect(screen.getByTestId("cursor-ring")).toBeInTheDocument();
  });

  it("hides cursor when reduced motion is preferred", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });
    const { container } = render(<CustomCursor />);
    expect(container.innerHTML).toBe("");
  });

  it("hides cursor on touch devices", () => {
    Object.defineProperty(window.navigator, "maxTouchPoints", {
      writable: true,
      value: 5,
    });
    const { container } = render(<CustomCursor />);
    expect(container.innerHTML).toBe("");
  });
});

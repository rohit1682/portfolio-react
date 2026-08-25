import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HeroLightning from "./HeroLightning";

describe("HeroLightning", () => {
  it("renders a canvas element", () => {
    render(<HeroLightning />);
    expect(screen.getByTestId("hero-lightning")).toBeInTheDocument();
    expect(screen.getByTestId("hero-lightning").tagName).toBe("CANVAS");
  });

  it("returns null when reduced motion preferred", () => {
    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    const { container } = render(<HeroLightning />);
    expect(container.innerHTML).toBe("");
    window.matchMedia = original;
  });

  it("handles click without crashing", () => {
    render(<HeroLightning />);
    expect(() => {
      fireEvent.click(screen.getByTestId("hero-lightning"));
    }).not.toThrow();
  });

  it("handles mouse events without crashing", () => {
    render(<HeroLightning />);
    const canvas = screen.getByTestId("hero-lightning");
    expect(() => {
      fireEvent.mouseMove(canvas, { clientX: 100, clientY: 200 });
      fireEvent.mouseLeave(canvas);
    }).not.toThrow();
  });
});

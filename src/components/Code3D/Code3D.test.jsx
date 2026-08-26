import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Code3D from "./Code3D";

describe("Code3D", () => {
  it("renders the code text", () => {
    const { container } = render(<Code3D />);
    const front = container.querySelector("[class*='front']");
    expect(front).toBeInTheDocument();
    expect(front.textContent).toBe("<code />");
  });

  it("renders depth layers", () => {
    const { container } = render(<Code3D />);
    const layers = container.querySelectorAll("[class*='layer']");
    expect(layers.length).toBe(8);
  });

  it("has aria-hidden on section", () => {
    const { container } = render(<Code3D />);
    expect(container.querySelector("section")).toHaveAttribute("aria-hidden", "true");
  });

  it("layers have translateZ transforms", () => {
    const { container } = render(<Code3D />);
    const layers = container.querySelectorAll("[class*='layer']");
    layers.forEach((layer, i) => {
      expect(layer.style.transform).toBe(`translateZ(${-(i + 1) * 4}px)`);
    });
  });
});

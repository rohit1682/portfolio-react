import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import StripeTransition from "./StripeTransition";

describe("StripeTransition", () => {
  it("renders 5 stripe elements", () => {
    render(<StripeTransition />);
    const container = screen.getByTestId("stripe-transition");
    expect(container).toBeInTheDocument();
    const stripes = container.querySelectorAll("[class*='stripe']");
    expect(stripes.length).toBe(5);
  });

  it("returns null when reduced motion preferred", () => {
    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    const { container } = render(<StripeTransition />);
    expect(container.innerHTML).toBe("");
    window.matchMedia = original;
  });

  it("is hidden from accessibility tree", () => {
    render(<StripeTransition />);
    expect(screen.getByTestId("stripe-transition")).toHaveAttribute("aria-hidden", "true");
  });
});

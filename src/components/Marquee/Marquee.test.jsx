import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Marquee from "./Marquee";

describe("Marquee", () => {
  const items = ["React", "Node.js", "AWS"];

  it("renders marquee with items", () => {
    render(<Marquee items={items} />);
    expect(screen.getByTestId("marquee")).toBeInTheDocument();
    expect(screen.getAllByText("React").length).toBeGreaterThanOrEqual(2);
  });

  it("renders nothing when items is empty", () => {
    const { container } = render(<Marquee items={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders nothing when items is not provided", () => {
    const { container } = render(<Marquee />);
    expect(container.innerHTML).toBe("");
  });

  it("is hidden from screen readers", () => {
    render(<Marquee items={items} />);
    expect(screen.getByTestId("marquee")).toHaveAttribute("aria-hidden", "true");
  });

  it("duplicates content for seamless loop", () => {
    render(<Marquee items={items} />);
    const allReact = screen.getAllByText("React");
    expect(allReact.length).toBe(2);
  });
});

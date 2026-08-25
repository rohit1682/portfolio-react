import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TiltCard from "./TiltCard";

describe("TiltCard", () => {
  it("renders children", () => {
    render(<TiltCard><span>Content</span></TiltCard>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <TiltCard className="my-card"><span>Hi</span></TiltCard>
    );
    expect(container.firstChild.className).toContain("my-card");
  });

  it("handles mouse events without crashing", () => {
    const { container } = render(
      <TiltCard><span>Card</span></TiltCard>
    );
    fireEvent.mouseMove(container.firstChild, { clientX: 100, clientY: 100 });
    fireEvent.mouseLeave(container.firstChild);
    expect(screen.getByText("Card")).toBeInTheDocument();
  });

  it("skips tilt when disabled", () => {
    const { container } = render(
      <TiltCard disabled><span>No tilt</span></TiltCard>
    );
    fireEvent.mouseMove(container.firstChild, { clientX: 100, clientY: 100 });
    expect(screen.getByText("No tilt")).toBeInTheDocument();
  });

  it("renders glow overlay by default", () => {
    render(<TiltCard><span>Glow</span></TiltCard>);
    expect(screen.getByTestId("tilt-glow")).toBeInTheDocument();
  });

  it("hides glow overlay when glow=false", () => {
    render(<TiltCard glow={false}><span>No glow</span></TiltCard>);
    expect(screen.queryByTestId("tilt-glow")).not.toBeInTheDocument();
  });

  it("hides glow overlay when disabled", () => {
    render(<TiltCard disabled><span>Disabled</span></TiltCard>);
    expect(screen.queryByTestId("tilt-glow")).not.toBeInTheDocument();
  });
});

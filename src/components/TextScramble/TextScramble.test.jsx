import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TextScramble from "./TextScramble";

describe("TextScramble", () => {
  it("renders the text content", () => {
    render(<TextScramble text="Hello World" />);
    expect(screen.getByTestId("text-scramble")).toBeInTheDocument();
    expect(screen.getByTestId("text-scramble").textContent).toBe("Hello World");
  });

  it("shows text immediately when reduced motion is preferred", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });
    render(<TextScramble text="Skills" inView={true} />);
    expect(screen.getByTestId("text-scramble").textContent).toBe("Skills");
  });

  it("renders as a span element", () => {
    render(<TextScramble text="Test" />);
    expect(screen.getByTestId("text-scramble").tagName).toBe("SPAN");
  });
});

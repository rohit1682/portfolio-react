import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Toast from "./Toast";

describe("Toast", () => {
  it("renders the message when visible", () => {
    render(<Toast message="Copied!" visible={true} />);
    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });

  it("has status role for accessibility", () => {
    render(<Toast message="Done" visible={true} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("does not render when not visible", () => {
    const { container } = render(<Toast message="Hidden" visible={false} />);
    expect(container).not.toHaveTextContent("Hidden");
  });
});

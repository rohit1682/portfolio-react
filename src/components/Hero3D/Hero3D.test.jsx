import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import Hero3D from "./Hero3D";

const mockUseDeviceCapability = vi.fn(() => ({ tier: "high" }));

vi.mock("../../hooks/useDeviceCapability", () => ({
  default: (...args) => mockUseDeviceCapability(...args),
}));

describe("Hero3D", () => {
  beforeEach(() => {
    mockUseDeviceCapability.mockReturnValue({ tier: "high" });
  });

  it("renders the R3F canvas for high tier", () => {
    const { container } = render(<Hero3D />);
    expect(container.querySelector("[data-testid='r3f-canvas']")).toBeInTheDocument();
  });

  it("returns null on low tier", () => {
    mockUseDeviceCapability.mockReturnValue({ tier: "low" });
    const { container } = render(<Hero3D />);
    expect(container.innerHTML).toBe("");
  });

  it("renders with medium tier (400 particles)", () => {
    mockUseDeviceCapability.mockReturnValue({ tier: "medium" });
    const { container } = render(<Hero3D />);
    expect(container.querySelector("[data-testid='r3f-canvas']")).toBeInTheDocument();
  });

  it("canvas has correct positioning style", () => {
    const { container } = render(<Hero3D />);
    const canvas = container.querySelector("[data-testid='r3f-canvas']");
    expect(canvas).toBeInTheDocument();
  });
});

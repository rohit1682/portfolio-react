import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CrystalMesh from "./CrystalMesh";

describe("CrystalMesh", () => {
  it("renders without crashing", () => {
    const { container } = render(<CrystalMesh />);
    expect(container).toBeTruthy();
  });
});

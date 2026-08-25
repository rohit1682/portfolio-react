import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Particles from "./Particles";

describe("Particles", () => {
  it("renders with default count", () => {
    const { container } = render(<Particles />);
    expect(container).toBeTruthy();
  });

  it("renders with custom count", () => {
    const { container } = render(<Particles count={100} />);
    expect(container).toBeTruthy();
  });
});

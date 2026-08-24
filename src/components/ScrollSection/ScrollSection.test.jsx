import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ScrollSection from "./ScrollSection";

describe("ScrollSection", () => {
  it("renders children", () => {
    render(
      <ScrollSection id="test-section">
        <p>Section content</p>
      </ScrollSection>
    );
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("applies id and className", () => {
    const { container } = render(
      <ScrollSection id="skills" className="my-class">
        <p>Skills</p>
      </ScrollSection>
    );
    expect(container.querySelector("#skills")).toBeInTheDocument();
    expect(container.firstChild.className).toContain("my-class");
  });

  it("sets perspective style", () => {
    const { container } = render(
      <ScrollSection id="test"><p>Content</p></ScrollSection>
    );
    expect(container.firstChild.style.perspective).toBe("1200px");
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ScrollSection from "./ScrollSection";

describe("ScrollSection", () => {
  it("renders children", () => {
    render(
      <ScrollSection>
        <p>Section content</p>
      </ScrollSection>
    );
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(
      <ScrollSection className="my-class">
        <p>Skills</p>
      </ScrollSection>
    );
    expect(container.firstChild.className).toContain("my-class");
  });

  it("sets perspective style", () => {
    const { container } = render(
      <ScrollSection><p>Content</p></ScrollSection>
    );
    expect(container.firstChild.style.perspective).toBe("1200px");
  });

  it("renders outer div not section", () => {
    const { container } = render(
      <ScrollSection><p>Content</p></ScrollSection>
    );
    expect(container.firstChild.tagName).toBe("DIV");
  });

  it("accepts preset prop", () => {
    render(
      <ScrollSection preset="flipIn">
        <p>Flipping content</p>
      </ScrollSection>
    );
    expect(screen.getByText("Flipping content")).toBeInTheDocument();
  });
});

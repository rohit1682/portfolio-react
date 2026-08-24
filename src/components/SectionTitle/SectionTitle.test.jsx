import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionTitle from "./SectionTitle";

describe("SectionTitle", () => {
  it("renders the title", () => {
    render(<SectionTitle title="Skills" />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });

  it("renders the subtitle when provided", () => {
    render(<SectionTitle title="Skills" subtitle="Tech I use" />);
    expect(screen.getByText("Tech I use")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const { container } = render(<SectionTitle title="About" />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBe(0);
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Experience from "./Experience";
import { experience } from "../../constants";

describe("Experience", () => {
  it("renders the section title", () => {
    render(<Experience />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("renders all experience entries from constants", () => {
    render(<Experience />);
    experience.forEach((item) => {
      expect(screen.getAllByText(item.role).length).toBeGreaterThan(0);
      expect(screen.getAllByText(item.company).length).toBeGreaterThan(0);
    });
  });

  it("renders experience periods", () => {
    render(<Experience />);
    experience.forEach((item) => {
      expect(screen.getByText(item.period)).toBeInTheDocument();
    });
  });

  it("renders bullet points", () => {
    render(<Experience />);
    experience.forEach((item) => {
      item.points.forEach((pt) => {
        expect(screen.getByText(pt)).toBeInTheDocument();
      });
    });
  });
});

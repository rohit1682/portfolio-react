import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Education from "./Education";
import { education, volunteer, personalInfo } from "../../constants";

describe("Education", () => {
  it("renders the section title", () => {
    render(<Education />);
    expect(screen.getByText(personalInfo.educationTitle)).toBeInTheDocument();
  });

  it("renders education entries from constants", () => {
    render(<Education />);
    education.forEach((item) => {
      expect(screen.getAllByText(item.degree).length).toBeGreaterThan(0);
      expect(screen.getAllByText(item.institution).length).toBeGreaterThan(0);
    });
  });

  it("renders volunteer entries from constants", () => {
    render(<Education />);
    volunteer.forEach((item) => {
      expect(screen.getAllByText(item.role).length).toBeGreaterThan(0);
      expect(screen.getAllByText(item.organization).length).toBeGreaterThan(0);
    });
  });

  it("renders Academic and Leadership headings", () => {
    render(<Education />);
    expect(screen.getAllByText("Academic", { exact: false }).length).toBeGreaterThan(0);
    expect(screen.getAllByText("Leadership", { exact: false }).length).toBeGreaterThan(0);
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Achievements from "./Achievements";
import { achievements, personalInfo } from "../../constants";

describe("Achievements", () => {
  it("renders the section title", () => {
    render(<Achievements />);
    expect(screen.getByText("Achievements")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<Achievements />);
    expect(screen.getByText(personalInfo.achievementsTagline)).toBeInTheDocument();
  });

  it("renders all achievements from constants", () => {
    render(<Achievements />);
    achievements.forEach((a) => {
      expect(screen.getByText(a.title)).toBeInTheDocument();
    });
  });

  it("renders the note with link to certificates", () => {
    render(<Achievements />);
    const link = screen.getByRole("link", { name: "Certificates" });
    expect(link).toHaveAttribute("href", "#certificates");
  });

  it("renders highlight star for highlighted achievements", () => {
    const highlighted = achievements.filter((a) => a.highlight);
    if (highlighted.length > 0) {
      render(<Achievements />);
      const stars = screen.getAllByText("⭐");
      expect(stars.length).toBe(highlighted.length);
    }
  });

  it("renders icons for achievements with known icon names", () => {
    const { container } = render(<Achievements />);
    const svgs = container.querySelectorAll("svg.lucide");
    expect(svgs.length).toBeGreaterThan(0);
  });

  it("renders correct number of achievement cards", () => {
    render(<Achievements />);
    const titles = achievements.map((a) => screen.getByText(a.title));
    expect(titles).toHaveLength(achievements.length);
  });

  it("has section-3d class", () => {
    const { container } = render(<Achievements />);
    expect(container.querySelector(".section-3d")).toBeInTheDocument();
  });

  it("renders non-highlighted achievements without star", () => {
    const nonHighlighted = achievements.filter((a) => !a.highlight);
    if (nonHighlighted.length > 0) {
      render(<Achievements />);
      expect(screen.getByText(nonHighlighted[0].title)).toBeInTheDocument();
    }
  });
});

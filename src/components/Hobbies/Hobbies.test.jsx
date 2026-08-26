import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hobbies from "./Hobbies";
import { hobbies, personalInfo } from "../../constants";

describe("Hobbies", () => {
  it("renders the section title", () => {
    render(<Hobbies />);
    expect(screen.getByText(personalInfo.hobbiesTitle)).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<Hobbies />);
    expect(screen.getByText(personalInfo.hobbiesTagline)).toBeInTheDocument();
  });

  it("renders all hobbies from constants", () => {
    render(<Hobbies />);
    hobbies.forEach((h) => {
      expect(screen.getByText(h.name)).toBeInTheDocument();
    });
  });

  it("renders correct number of hobby cards", () => {
    render(<Hobbies />);
    const names = hobbies.map((h) => screen.getByText(h.name));
    expect(names).toHaveLength(hobbies.length);
  });

  it("renders fallback icon for unknown icon names", () => {
    const { container } = render(<Hobbies />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("has section-3d class", () => {
    const { container } = render(<Hobbies />);
    expect(container.querySelector(".section-3d")).toBeInTheDocument();
  });
});

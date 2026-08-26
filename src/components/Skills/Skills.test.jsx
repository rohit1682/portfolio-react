import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Skills from "./Skills";
import { skillCategories, skillTags, personalInfo } from "../../constants";

describe("Skills", () => {
  describe("rendering", () => {
    it("renders the section title", () => {
      render(<Skills />);
      expect(screen.getByText(personalInfo.skillsTitle)).toBeInTheDocument();
    });

    it("renders subtitle", () => {
      render(<Skills />);
      expect(screen.getByText(personalInfo.skillsTagline)).toBeInTheDocument();
    });

    it("renders skill categories in bars view", () => {
      render(<Skills />);
      skillCategories.forEach((cat) => {
        expect(screen.getByText(cat.category)).toBeInTheDocument();
      });
    });

    it("renders skill names and levels", () => {
      render(<Skills />);
      skillCategories.forEach((cat) => {
        cat.items.forEach((item) => {
          expect(screen.getAllByText(item.name).length).toBeGreaterThan(0);
          expect(screen.getAllByText(`${item.level}%`).length).toBeGreaterThan(0);
        });
      });
    });

    it("bars view has section-3d class", () => {
      const { container } = render(<Skills />);
      expect(container.querySelector(".section-3d")).toBeInTheDocument();
    });
  });

  describe("tab switching", () => {
    it("has Proficiency and All Skills tabs", () => {
      render(<Skills />);
      expect(screen.getByText(personalInfo.skillsTabs.proficiency)).toBeInTheDocument();
      expect(screen.getByText(personalInfo.skillsTabs.all)).toBeInTheDocument();
    });

    it("Proficiency tab is active by default", () => {
      render(<Skills />);
      const profTab = screen.getByText(personalInfo.skillsTabs.proficiency);
      expect(profTab.className).toContain("tabActive");
    });

    it("switches to tags view when clicking All Skills", () => {
      render(<Skills />);
      fireEvent.click(screen.getByText(personalInfo.skillsTabs.all));
      Object.keys(skillTags).forEach((category) => {
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    });

    it("All Skills tab becomes active on click", () => {
      render(<Skills />);
      fireEvent.click(screen.getByText(personalInfo.skillsTabs.all));
      const tagsTab = screen.getByText(personalInfo.skillsTabs.all);
      expect(tagsTab.className).toContain("tabActive");
    });

    it("renders all tag items in tags view", () => {
      render(<Skills />);
      fireEvent.click(screen.getByText(personalInfo.skillsTabs.all));
      Object.values(skillTags).forEach((tags) => {
        tags.forEach((tag) => {
          expect(screen.getByText(tag)).toBeInTheDocument();
        });
      });
    });

    it("switches back to bars view", () => {
      render(<Skills />);
      fireEvent.click(screen.getByText(personalInfo.skillsTabs.all));
      fireEvent.click(screen.getByText(personalInfo.skillsTabs.proficiency));
      skillCategories.forEach((cat) => {
        expect(screen.getByText(cat.category)).toBeInTheDocument();
      });
    });
  });
});

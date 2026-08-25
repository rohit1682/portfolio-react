import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Projects from "./Projects";
import { projects, personalInfo } from "../../constants";

describe("Projects", () => {
  it("renders the section title", () => {
    render(<Projects />);
    expect(screen.getByText(personalInfo.projectsTitle)).toBeInTheDocument();
  });

  it("renders all projects by default", () => {
    render(<Projects />);
    projects.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });

  it("renders project descriptions", () => {
    render(<Projects />);
    projects.forEach((p) => {
      expect(screen.getByText(p.description)).toBeInTheDocument();
    });
  });

  it("has filter buttons", () => {
    render(<Projects />);
    expect(screen.getByText(personalInfo.projectFilters.all)).toBeInTheDocument();
    expect(screen.getByText(personalInfo.projectFilters.more)).toBeInTheDocument();
  });

  it("filters to featured only", () => {
    render(<Projects />);
    const featured = projects.filter((p) => p.featured);
    const btns = screen.getAllByText(/Featured/);
    fireEvent.click(btns[0]);
    featured.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });

  it("filters to others only", () => {
    render(<Projects />);
    const others = projects.filter((p) => !p.featured);
    fireEvent.click(screen.getByText(personalInfo.projectFilters.more));
    if (others.length > 0) {
      others.forEach((p) => {
        expect(screen.getByText(p.title)).toBeInTheDocument();
      });
    }
  });

  it("shows all when clicking All after filter", () => {
    render(<Projects />);
    fireEvent.click(screen.getByText(personalInfo.projectFilters.more));
    fireEvent.click(screen.getByText(personalInfo.projectFilters.all));
    projects.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });

  it("renders project tags", () => {
    render(<Projects />);
    projects.forEach((p) => {
      p.tags.forEach((tag) => {
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
      });
    });
  });

  it("renders featured badge on featured projects", () => {
    const featured = projects.filter((p) => p.featured);
    if (featured.length > 0) {
      render(<Projects />);
      expect(screen.getAllByText(personalInfo.featuredLabel, { exact: false }).length).toBeGreaterThan(0);
    }
  });

  it("renders GitHub and Live links for each project", () => {
    render(<Projects />);
    const githubLinks = screen.getAllByLabelText("GitHub");
    const liveLinks = screen.getAllByLabelText("Live");
    expect(githubLinks.length).toBe(projects.length);
    expect(liveLinks.length).toBe(projects.length);
  });

  it("renders status for projects", () => {
    render(<Projects />);
    const completedProjects = projects.filter((p) => p.status === "Completed");
    const inProgressProjects = projects.filter((p) => p.status === "In Progress");
    if (completedProjects.length > 0) {
      expect(screen.getAllByText("Completed").length).toBeGreaterThan(0);
    }
    if (inProgressProjects.length > 0) {
      expect(screen.getAllByText("In Progress").length).toBeGreaterThan(0);
    }
  });

  it("renders project subtitles", () => {
    render(<Projects />);
    projects.forEach((p) => {
      if (p.subtitle) {
        expect(screen.getByText(p.subtitle)).toBeInTheDocument();
      }
    });
  });
});

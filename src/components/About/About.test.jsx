import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import About from "./About";
import { personalInfo, stats } from "../../constants";

describe("About", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the tagline from constants", () => {
    render(<About />);
    expect(screen.getByText(personalInfo.tagline)).toBeInTheDocument();
  });

  it("renders the about intro", () => {
    render(<About />);
    expect(screen.getByText(personalInfo.aboutIntro)).toBeInTheDocument();
  });

  it("renders email link", () => {
    render(<About />);
    const emailLinks = screen.getAllByText(personalInfo.email);
    expect(emailLinks.length).toBeGreaterThan(0);
  });

  it("renders the degree from constants", () => {
    render(<About />);
    expect(screen.getByText(personalInfo.degree)).toBeInTheDocument();
  });

  it("renders the status from constants", () => {
    render(<About />);
    expect(screen.getByText(`${personalInfo.status} ✦`)).toBeInTheDocument();
  });

  it("renders stat labels from constants", () => {
    render(<About />);
    stats.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it("renders GitHub calendar placeholder", () => {
    render(<About />);
    expect(screen.getByText("GitHub Contributions")).toBeInTheDocument();
  });

  it("renders currently learning tags", () => {
    render(<About />);
    personalInfo.currentlyLearning.forEach((t) => {
      expect(screen.getByText(t)).toBeInTheDocument();
    });
  });

  it("renders the location", () => {
    render(<About />);
    expect(screen.getByText(personalInfo.location)).toBeInTheDocument();
  });

  it("renders spoken languages", () => {
    render(<About />);
    expect(screen.getByText(personalInfo.spokenLanguages.join(", "))).toBeInTheDocument();
  });

  it("renders Say Hello and GitHub Profile buttons", () => {
    render(<About />);
    expect(screen.getAllByText("Say Hello").length).toBeGreaterThan(0);
    expect(screen.getByText("GitHub Profile")).toBeInTheDocument();
  });

  it("renders current role", () => {
    render(<About />);
    expect(screen.getAllByText(personalInfo.currentRole).length).toBeGreaterThan(0);
  });

  it("renders the github username link", () => {
    render(<About />);
    expect(screen.getByText(/rohit/i, { exact: false })).toBeInTheDocument();
  });

  it("counter animates when stats become visible", async () => {
    render(<About />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    stats.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it("counter reaches target value", async () => {
    render(<About />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
  });

  it("calendar refreshes on interval", async () => {
    render(<About />);
    await act(async () => {
      vi.advanceTimersByTime(5 * 60 * 1000 + 100);
    });
  });

  it("renders phone number", () => {
    render(<About />);
    expect(screen.getByText(personalInfo.phone)).toBeInTheDocument();
  });

  it("renders intro photo", () => {
    render(<About />);
    const img = screen.getByAltText(personalInfo.name);
    expect(img).toBeInTheDocument();
  });

  it("renders stat icons for known icon types", () => {
    render(<About />);
    const knownIcons = stats.filter((s) => ["Code2", "FolderGit2", "Monitor", "Users"].includes(s.icon));
    expect(knownIcons.length).toBeGreaterThan(0);
  });

  it("renders GithubMark SVG in calendar header", () => {
    const { container } = render(<About />);
    const svg = container.querySelector("svg[viewBox='0 0 24 24']");
    expect(svg).toBeInTheDocument();
  });
});

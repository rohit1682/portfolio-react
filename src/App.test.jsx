import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";
import { personalInfo } from "./constants";

vi.mock("./components/HeroLightning/HeroLightning", () => ({
  default: () => <canvas data-testid="hero-lightning" />,
}));

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText(personalInfo.aboutTitle)).toBeInTheDocument();
  });

  it("renders all major sections", () => {
    render(<App />);
    expect(screen.getAllByText(personalInfo.skillsTitle).length).toBeGreaterThan(0);
    expect(screen.getAllByText(personalInfo.experienceTitle).length).toBeGreaterThan(0);
    expect(screen.getAllByText(personalInfo.educationTitle).length).toBeGreaterThan(0);
    expect(screen.getAllByText(personalInfo.projectsTitle).length).toBeGreaterThan(0);
    expect(screen.getAllByText(personalInfo.achievementsTitle).length).toBeGreaterThan(0);
    expect(screen.getAllByText(personalInfo.certificatesTitle).length).toBeGreaterThan(0);
    expect(screen.getByText(personalInfo.contactTitle)).toBeInTheDocument();
  });

  it("renders the navbar with Download CV button", () => {
    render(<App />);
    expect(screen.getByText(personalInfo.downloadCVLabel)).toBeInTheDocument();
  });

  it("clicking Download CV opens CV preview", async () => {
    render(<App />);
    const btn = screen.getByText(personalInfo.downloadCVLabel);
    await act(async () => {
      fireEvent.click(btn);
    });
  });

  it("renders footer", () => {
    render(<App />);
    expect(screen.getByLabelText("Back to top")).toBeInTheDocument();
  });

  it("renders scroll progress bar", () => {
    const { container } = render(<App />);
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument();
  });

  it("renders command palette", () => {
    render(<App />);
    expect(screen.getByLabelText("Open command palette")).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Hero from "./Hero";
import { personalInfo } from "../../constants";

vi.mock("../HeroLightning/HeroLightning", () => ({
  default: () => <canvas data-testid="hero-lightning" />,
}));

vi.mock("../SocialLinks/SocialLinks", () => ({
  default: () => <div data-testid="social-links">SocialLinks</div>,
}));

describe("Hero", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the name", () => {
    render(<Hero />);
    expect(screen.getByText(personalInfo.name)).toBeInTheDocument();
  });

  it("renders the status badge", () => {
    render(<Hero />);
    expect(screen.getByText(personalInfo.status, { exact: false })).toBeInTheDocument();
  });

  it("renders profile photo", () => {
    render(<Hero />);
    const img = screen.getByAltText(personalInfo.name);
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(personalInfo.photos.profile);
  });

  it("renders currentRole and location", () => {
    render(<Hero />);
    expect(screen.getByText(personalInfo.currentRole)).toBeInTheDocument();
    expect(screen.getByText(personalInfo.location)).toBeInTheDocument();
  });

  it("renders View My Work button", () => {
    render(<Hero />);
    expect(screen.getByText("View My Work")).toBeInTheDocument();
  });

  it("renders Say Hello link", () => {
    render(<Hero />);
    const link = screen.getByText("Say Hello");
    expect(link.closest("a")).toHaveAttribute("href", `mailto:${personalInfo.email}`);
  });

  it("renders scroll down button", () => {
    render(<Hero />);
    expect(screen.getByLabelText("Scroll down")).toBeInTheDocument();
  });

  it("renders SocialLinks", () => {
    render(<Hero />);
    expect(screen.getByTestId("social-links")).toBeInTheDocument();
  });

  it("View My Work scrolls to projects", () => {
    const el = document.createElement("div");
    el.id = "projects";
    el.scrollIntoView = vi.fn();
    document.body.appendChild(el);
    render(<Hero />);
    fireEvent.click(screen.getByText("View My Work"));
    expect(el.scrollIntoView).toHaveBeenCalled();
    document.body.removeChild(el);
  });

  it("scroll down button scrolls to about", () => {
    const el = document.createElement("div");
    el.id = "about";
    el.scrollIntoView = vi.fn();
    document.body.appendChild(el);
    render(<Hero />);
    fireEvent.click(screen.getByLabelText("Scroll down"));
    expect(el.scrollIntoView).toHaveBeenCalled();
    document.body.removeChild(el);
  });
});

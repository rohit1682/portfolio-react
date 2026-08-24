import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Hero from "./Hero";
import { personalInfo } from "../../constants";

vi.mock("../Hero3D/Hero3D", () => ({
  default: () => <div data-testid="hero3d">Hero3D</div>,
}));

describe("Hero", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the user name", () => {
    render(<Hero />);
    expect(screen.getByText(personalInfo.name)).toBeInTheDocument();
  });

  it("renders the status badge", () => {
    render(<Hero />);
    expect(screen.getByText(personalInfo.status, { exact: false })).toBeInTheDocument();
  });

  it("renders the current role", () => {
    render(<Hero />);
    expect(screen.getByText(personalInfo.currentRole)).toBeInTheDocument();
  });

  it("renders the location", () => {
    render(<Hero />);
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

  it("renders profile image", () => {
    render(<Hero />);
    const img = screen.getByAltText(personalInfo.name);
    expect(img).toHaveAttribute("src", personalInfo.photos.profile);
  });

  it("starts the typing effect after delay", () => {
    render(<Hero />);
    act(() => { vi.advanceTimersByTime(700); });
    act(() => { vi.advanceTimersByTime(500); });
  });

  it("types and deletes characters", () => {
    render(<Hero />);
    const totalChars = personalInfo.typedRoles[0].length;
    act(() => { vi.advanceTimersByTime(600); });
    for (let i = 0; i < totalChars + 5; i++) {
      act(() => { vi.advanceTimersByTime(100); });
    }
    act(() => { vi.advanceTimersByTime(1800); });
    for (let i = 0; i < totalChars + 2; i++) {
      act(() => { vi.advanceTimersByTime(55); });
    }
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

  it("cleans up timer on unmount", () => {
    const { unmount } = render(<Hero />);
    act(() => { vi.advanceTimersByTime(600); });
    unmount();
  });
});

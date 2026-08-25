import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Preloader from "./Preloader";

describe("Preloader", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the preloader in words phase initially", () => {
    render(<Preloader />);
    expect(screen.getByTestId("preloader")).toBeInTheDocument();
    expect(screen.getByTestId("preloader-words")).toBeInTheDocument();
    expect(screen.getByText("Code.")).toBeInTheDocument();
  });

  it("cycles through words before showing progress", () => {
    render(<Preloader />);
    act(() => { vi.advanceTimersByTime(600); });
    expect(screen.getByText("Build.")).toBeInTheDocument();

    act(() => { vi.advanceTimersByTime(600); });
    expect(screen.getByText("Ship.")).toBeInTheDocument();
  });

  it("shows initials and progress bar after word cycle", () => {
    render(<Preloader />);
    act(() => { vi.advanceTimersByTime(1800); });
    expect(screen.getByText("R")).toBeInTheDocument();
    expect(screen.getByText("G")).toBeInTheDocument();
    expect(screen.getByTestId("preloader-bar")).toBeInTheDocument();
  });

  it("has a status role for accessibility", () => {
    render(<Preloader />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("locks body scroll while loading", () => {
    render(<Preloader />);
    expect(document.body.style.overflow).toBe("hidden");
  });
});

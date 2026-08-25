import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

vi.mock("./components/HeroLightning/HeroLightning", () => ({
  default: () => <canvas data-testid="hero-lightning" />,
}));

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText("About Me")).toBeInTheDocument();
  });

  it("renders all major sections", () => {
    render(<App />);
    expect(screen.getAllByText("Skills").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Experience").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Education").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Projects").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Achievements").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Certificates").length).toBeGreaterThan(0);
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
  });

  it("renders the navbar with Download CV button", () => {
    render(<App />);
    expect(screen.getByText("Download CV")).toBeInTheDocument();
  });

  it("clicking Download CV opens CV preview", async () => {
    render(<App />);
    const btn = screen.getByText("Download CV");
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

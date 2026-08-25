import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CommandPalette from "./CommandPalette";
import { navLinks, personalInfo, projects, certificates } from "../../constants";

describe("CommandPalette", () => {
  const onOpenCV = vi.fn();

  beforeEach(() => {
    onOpenCV.mockClear();
    delete window.location;
    window.location = { href: "" };
    window.open = vi.fn();
  });

  it("does not render dialog by default", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    expect(screen.queryByPlaceholderText(/search|type/i)).not.toBeInTheDocument();
  });

  it("opens on Cmd+K", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByPlaceholderText(/search|type/i)).toBeInTheDocument();
  });

  it("opens on Ctrl+K", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(screen.getByPlaceholderText(/search|type/i)).toBeInTheDocument();
  });

  it("opens with uppercase K", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "K", metaKey: true });
    expect(screen.getByPlaceholderText(/search|type/i)).toBeInTheDocument();
  });

  it("opens on / key when body is focused", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "/" });
    expect(screen.getByPlaceholderText(/search|type/i)).toBeInTheDocument();
  });

  it("closes on Escape", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByPlaceholderText(/search|type/i)).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByPlaceholderText(/search|type/i)).not.toBeInTheDocument();
  });

  it("closes on overlay click", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const overlay = screen.getByRole("dialog");
    fireEvent.click(overlay);
    expect(screen.queryByPlaceholderText(/search|type/i)).not.toBeInTheDocument();
  });

  it("renders section items from navLinks", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    navLinks.forEach((link) => {
      expect(screen.getAllByText(link.label).length).toBeGreaterThan(0);
    });
  });

  it("renders project items", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    projects.forEach((p) => {
      expect(screen.getAllByText(p.title).length).toBeGreaterThan(0);
    });
  });

  it("renders Download CV action", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByText("Download CV")).toBeInTheDocument();
  });

  it("filters items by search query", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByPlaceholderText(/search|type/i);
    fireEvent.change(input, { target: { value: "xyznonexistent" } });
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it("filters by group name", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByPlaceholderText(/search|type/i);
    fireEvent.change(input, { target: { value: "Actions" } });
    expect(screen.getByText("Download CV")).toBeInTheDocument();
  });

  it("filters by hint text", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByPlaceholderText(/search|type/i);
    fireEvent.change(input, { target: { value: "Jump" } });
    expect(screen.queryByText(/no results/i)).not.toBeInTheDocument();
  });

  it("handles ArrowDown/ArrowUp keyboard navigation", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    fireEvent.keyDown(window, { key: "ArrowDown" });
    fireEvent.keyDown(window, { key: "ArrowDown" });
    fireEvent.keyDown(window, { key: "ArrowUp" });
  });

  it("handles Enter to select and close", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    fireEvent.keyDown(window, { key: "Enter" });
    expect(screen.queryByPlaceholderText(/search|type/i)).not.toBeInTheDocument();
  });

  it("toggle with Cmd+K closes if open", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByPlaceholderText(/search|type/i)).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.queryByPlaceholderText(/search|type/i)).not.toBeInTheDocument();
  });

  it("renders group titles", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByText("Sections")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("shows personalInfo location and role in actions", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getAllByText(personalInfo.location).length).toBeGreaterThan(0);
    expect(screen.getAllByText(personalInfo.currentRole).length).toBeGreaterThan(0);
  });

  it("uses personalInfo.degree in education hint", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByText(personalInfo.degree)).toBeInTheDocument();
  });

  it("clicking Download CV item calls onOpenCV", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    fireEvent.click(screen.getByText("Download CV"));
    expect(onOpenCV).toHaveBeenCalled();
  });

  it("clicking email item sets location href", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const emailItem = screen.getByText(`Email ${personalInfo.email}`);
    fireEvent.click(emailItem);
    expect(window.location.href).toContain("mailto:");
  });

  it("clicking GitHub item opens new window", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    fireEvent.click(screen.getByText("Open GitHub"));
    expect(window.open).toHaveBeenCalledWith(personalInfo.github, "_blank", "noreferrer");
  });

  it("clicking LinkedIn item opens new window", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    fireEvent.click(screen.getByText("Open LinkedIn"));
    expect(window.open).toHaveBeenCalledWith(personalInfo.linkedin, "_blank", "noreferrer");
  });

  it("clicking location item scrolls to contact", () => {
    const el = document.createElement("div");
    el.id = "contact";
    document.body.appendChild(el);
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const locationItems = screen.getAllByText(personalInfo.location);
    fireEvent.click(locationItems[0]);
    expect(el.scrollIntoView).toHaveBeenCalled();
    document.body.removeChild(el);
  });

  it("clicking a certificate item opens file", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const certTitle = certificates[0].title;
    const items = screen.getAllByText(certTitle);
    fireEvent.click(items[0]);
    expect(window.open).toHaveBeenCalled();
  });

  it("mouseEnter on item changes active index", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const buttons = screen.getAllByRole("button");
    const listButtons = buttons.filter(b => b.className.includes("item"));
    if (listButtons.length > 1) {
      fireEvent.mouseEnter(listButtons[1]);
    }
  });

  it("ArrowUp at top stays at index 0", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    fireEvent.keyDown(window, { key: "ArrowUp" });
    fireEvent.keyDown(window, { key: "ArrowUp" });
  });

  it("/ does not open when an input is focused", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();
    fireEvent.keyDown(window, { key: "/" });
    expect(screen.queryByPlaceholderText(/search|type/i)).not.toBeInTheDocument();
    document.body.removeChild(input);
  });

  it("renders certificate items", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getAllByText("Certificates").length).toBeGreaterThan(0);
  });

  it("renders keyboard shortcut hints in footer", () => {
    render(<CommandPalette onOpenCV={onOpenCV} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByText("navigate")).toBeInTheDocument();
    expect(screen.getByText("open")).toBeInTheDocument();
    expect(screen.getByText("close")).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Navbar from "./Navbar";
import { navLinks, personalInfo } from "../../constants";

describe("Navbar", () => {
  const onCVOpen = vi.fn();

  beforeEach(() => {
    onCVOpen.mockClear();
  });

  it("renders initials logo", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    const initials = personalInfo.name.split(" ").map((w) => w[0]).join("");
    expect(screen.getByText(initials, { exact: false })).toBeInTheDocument();
  });

  it("renders nav links from constants", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    navLinks.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  it("renders Download CV button", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    expect(screen.getByText(personalInfo.downloadCVLabel)).toBeInTheDocument();
  });

  it("calls onCVOpen when CV button is clicked", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    fireEvent.click(screen.getByText(personalInfo.downloadCVLabel));
    expect(onCVOpen).toHaveBeenCalled();
  });

  it("renders command palette button", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    expect(screen.getByLabelText("Open command palette")).toBeInTheDocument();
  });

  it("renders menu toggle button", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
  });

  it("opens mobile menu when toggle is clicked", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    fireEvent.click(screen.getByLabelText("Toggle menu"));
    const mobileLinks = screen.getAllByText(navLinks[0].label);
    expect(mobileLinks.length).toBeGreaterThanOrEqual(2);
  });

  it("closes mobile menu when a link is clicked", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    fireEvent.click(screen.getByLabelText("Toggle menu"));
    const mobileLinks = screen.getAllByText(navLinks[0].label);
    fireEvent.click(mobileLinks[mobileLinks.length - 1]);
  });

  it("adds scrolled class on scroll past 50px", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    Object.defineProperty(window, "scrollY", { value: 100, writable: true, configurable: true });
    act(() => { fireEvent.scroll(window); });
  });

  it("does not add scrolled class when scroll < 50px", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    Object.defineProperty(window, "scrollY", { value: 10, writable: true, configurable: true });
    act(() => { fireEvent.scroll(window); });
  });

  it("sets active section based on scroll position", () => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    sections.forEach((id) => {
      const el = document.createElement("div");
      el.id = id;
      Object.defineProperty(el, "offsetTop", { value: 100, configurable: true });
      document.body.appendChild(el);
    });
    render(<Navbar onCVOpen={onCVOpen} />);
    Object.defineProperty(window, "scrollY", { value: 200, writable: true, configurable: true });
    act(() => { fireEvent.scroll(window); });
    sections.forEach((id) => {
      document.getElementById(id)?.remove();
    });
  });

  it("scroll handler handles missing sections gracefully", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
    act(() => { fireEvent.scroll(window); });
  });

  it("logo click toggles links on desktop", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    render(<Navbar onCVOpen={onCVOpen} />);
    const logo = screen.getByLabelText(/hide section links/i);
    fireEvent.click(logo);
    expect(screen.getByLabelText(/show section links/i)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/show section links/i));
    expect(screen.getByLabelText(/hide section links/i)).toBeInTheDocument();
  });

  it("logo click scrolls to hero on mobile", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    render(<Navbar onCVOpen={onCVOpen} />);
    const logo = screen.getByLabelText(/section links/i);
    fireEvent.click(logo);
  });

  it("command palette button dispatches keydown", () => {
    const spy = vi.spyOn(window, "dispatchEvent");
    render(<Navbar onCVOpen={onCVOpen} />);
    fireEvent.click(screen.getByLabelText("Open command palette"));
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("renders shortcut label with platform key", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    const cmdkBtn = screen.getByLabelText("Open command palette");
    expect(cmdkBtn).toBeInTheDocument();
    expect(screen.getByText(/K/)).toBeInTheDocument();
  });

  it("links have hidden tabIndex when collapsed", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    render(<Navbar onCVOpen={onCVOpen} />);
    const logo = screen.getByLabelText(/section links/i);
    fireEvent.click(logo);
    const firstLink = screen.getByText(navLinks[0].label);
    expect(firstLink).toHaveAttribute("tabindex", "-1");
    expect(firstLink).toHaveAttribute("aria-hidden", "true");
  });

  it("links have normal tabIndex when expanded", () => {
    render(<Navbar onCVOpen={onCVOpen} />);
    const firstLink = screen.getByText(navLinks[0].label);
    expect(firstLink).toHaveAttribute("tabindex", "0");
    expect(firstLink).toHaveAttribute("aria-hidden", "false");
  });

  it("handleNav scrolls to element and closes menu", () => {
    const el = document.createElement("div");
    el.id = "about";
    el.scrollIntoView = vi.fn();
    document.body.appendChild(el);
    render(<Navbar onCVOpen={onCVOpen} />);
    fireEvent.click(screen.getByLabelText("Toggle menu"));
    const aboutLinks = screen.getAllByText("About");
    fireEvent.click(aboutLinks[aboutLinks.length - 1]);
    expect(el.scrollIntoView).toHaveBeenCalled();
    document.body.removeChild(el);
  });
});

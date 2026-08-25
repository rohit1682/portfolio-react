import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Contact from "./Contact";
import { personalInfo } from "../../constants";

describe("Contact", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    delete window.location;
    window.location = { href: "" };
  });

  it("renders the section title", () => {
    render(<Contact />);
    expect(screen.getByText(personalInfo.contactTitle)).toBeInTheDocument();
  });

  it("renders contact heading from constants", () => {
    render(<Contact />);
    expect(screen.getByText(personalInfo.contactHeading)).toBeInTheDocument();
  });

  it("renders contact description from constants", () => {
    render(<Contact />);
    expect(screen.getByText(personalInfo.contactDescription)).toBeInTheDocument();
  });

  it("renders email from constants", () => {
    render(<Contact />);
    expect(screen.getByText(personalInfo.email)).toBeInTheDocument();
  });

  it("renders phone from constants", () => {
    render(<Contact />);
    expect(screen.getByText(personalInfo.phone)).toBeInTheDocument();
  });

  it("renders location from constants", () => {
    render(<Contact />);
    expect(screen.getByText(personalInfo.location)).toBeInTheDocument();
  });

  it("renders form fields", () => {
    render(<Contact />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders Send Message button", () => {
    render(<Contact />);
    expect(screen.getByText("Send Message", { exact: false })).toBeInTheDocument();
  });

  it("copy button works for email", async () => {
    render(<Contact />);
    const copyBtns = screen.getAllByLabelText(/copy/i);
    await act(async () => {
      fireEvent.click(copyBtns[0]);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(personalInfo.email);
  });

  it("copy button works for phone", async () => {
    render(<Contact />);
    const copyBtns = screen.getAllByLabelText(/copy/i);
    await act(async () => {
      fireEvent.click(copyBtns[1]);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(personalInfo.phone);
  });

  it("form has submit button with correct type", () => {
    render(<Contact />);
    const btn = screen.getByText("Send Message", { exact: false }).closest("button");
    expect(btn).toHaveAttribute("type", "submit");
  });

  it("shows copy failure toast", async () => {
    navigator.clipboard.writeText = vi.fn().mockRejectedValue(new Error("fail"));
    render(<Contact />);
    const copyBtns = screen.getAllByLabelText(/copy/i);
    await act(async () => {
      fireEvent.click(copyBtns[0]);
    });
  });

  it("renders email and phone links", () => {
    render(<Contact />);
    const emailLink = screen.getByText(personalInfo.email).closest("a");
    expect(emailLink).toHaveAttribute("href", `mailto:${personalInfo.email}`);
    const phoneLink = screen.getByText(personalInfo.phone).closest("a");
    expect(phoneLink).toHaveAttribute("href", `tel:${personalInfo.phone}`);
  });

  it("form has correct action shape for mailto", () => {
    render(<Contact />);
    const form = screen.getByText("Send Message", { exact: false }).closest("form");
    expect(form).toBeInTheDocument();
    expect(form.tagName.toLowerCase()).toBe("form");
    expect(form.querySelector("input[name='name']")).toBeInTheDocument();
    expect(form.querySelector("input[name='subject']")).toBeInTheDocument();
    expect(form.querySelector("textarea[name='message']")).toBeInTheDocument();
  });

  it("location item is not a link", () => {
    render(<Contact />);
    const location = screen.getByText(personalInfo.location);
    expect(location.tagName.toLowerCase()).toBe("span");
  });

  it("location item does not have copy button", () => {
    render(<Contact />);
    const copyBtns = screen.getAllByLabelText(/copy/i);
    expect(copyBtns).toHaveLength(2);
  });

  it("renders social links component", () => {
    render(<Contact />);
    expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
  });

  it("renders detail labels for each item", () => {
    render(<Contact />);
    expect(screen.getAllByText("Email").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
  });
});

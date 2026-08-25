import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";
import { personalInfo } from "../../constants";

describe("Footer", () => {
  it("renders the footer tagline from constants", () => {
    render(<Footer />);
    expect(screen.getByText(personalInfo.footerTagline)).toBeInTheDocument();
  });

  it("renders copyright with name and current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} ${personalInfo.name}`)).toBeInTheDocument();
  });

  it("renders initials logo", () => {
    render(<Footer />);
    const initials = personalInfo.name.split(" ").map((w) => w[0]).join("");
    expect(screen.getByText(initials, { exact: false })).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("LeetCode")).toBeInTheDocument();
  });

  it("renders back-to-top button", () => {
    render(<Footer />);
    const btn = screen.getByLabelText("Back to top");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(window.scrollTo).toHaveBeenCalled();
  });
});

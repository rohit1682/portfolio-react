import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SocialLinks from "./SocialLinks";
import { personalInfo } from "../../constants";

describe("SocialLinks", () => {
  it("renders GitHub, LinkedIn, and LeetCode links", () => {
    render(<SocialLinks />);
    expect(screen.getByLabelText("GitHub")).toHaveAttribute("href", personalInfo.github);
    expect(screen.getByLabelText("LinkedIn")).toHaveAttribute("href", personalInfo.linkedin);
    expect(screen.getByLabelText("LeetCode")).toHaveAttribute("href", personalInfo.leetcode);
  });

  it("all links open in new tab", () => {
    render(<SocialLinks />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    });
  });

  it("accepts custom className", () => {
    const { container } = render(<SocialLinks className="extra" />);
    expect(container.firstChild.className).toContain("extra");
  });
});

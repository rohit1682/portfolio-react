import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import SidebarCV from "./SidebarCV";
import {
  personalInfo, experience, education, skillTags,
  achievements, certifications, projects, volunteer,
} from "../../../constants";

const data = {
  personalInfo, experience, education, skillTags,
  achievements, certifications, projects, volunteer,
};

describe("SidebarCV", () => {
  it("renders without crashing", () => {
    const { container } = render(<SidebarCV data={data} />);
    expect(container).toBeTruthy();
  });

  it("renders the user name", () => {
    const { container } = render(<SidebarCV data={data} />);
    expect(container.textContent).toContain(personalInfo.name);
  });
});

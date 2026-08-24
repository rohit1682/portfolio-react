import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ModernCV from "./ModernCV";
import {
  personalInfo, experience, education, skillTags,
  achievements, certifications, projects, volunteer,
} from "../../../constants";

const data = {
  personalInfo, experience, education, skillTags,
  achievements, certifications, projects, volunteer,
};

describe("ModernCV", () => {
  it("renders without crashing", () => {
    const { container } = render(<ModernCV data={data} />);
    expect(container).toBeTruthy();
  });

  it("renders the user name", () => {
    const { container } = render(<ModernCV data={data} />);
    expect(container.textContent).toContain(personalInfo.name);
  });
});

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ExecutiveCV from "./ExecutiveCV";
import {
  personalInfo, experience, education, skillTags,
  achievements, certifications, projects, volunteer,
} from "../../../constants";

const data = {
  personalInfo, experience, education, skillTags,
  achievements, certifications, projects, volunteer,
};

describe("ExecutiveCV", () => {
  it("renders without crashing", () => {
    const { container } = render(<ExecutiveCV data={data} />);
    expect(container).toBeTruthy();
  });

  it("renders the user name", () => {
    const { container } = render(<ExecutiveCV data={data} />);
    expect(container.textContent.toLowerCase()).toContain(personalInfo.name.toLowerCase());
  });
});

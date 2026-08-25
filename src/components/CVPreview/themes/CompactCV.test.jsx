import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CompactCV from "./CompactCV";
import {
  personalInfo, experience, education, skillTags,
  achievements, certifications, projects, volunteer,
} from "../../../constants";

const data = {
  personalInfo, experience, education, skillTags,
  achievements, certifications, projects, volunteer,
};

describe("CompactCV", () => {
  it("renders without crashing", () => {
    const { container } = render(<CompactCV data={data} />);
    expect(container).toBeTruthy();
  });

  it("renders the user name", () => {
    const { container } = render(<CompactCV data={data} />);
    expect(container.textContent).toContain(personalInfo.name);
  });
});

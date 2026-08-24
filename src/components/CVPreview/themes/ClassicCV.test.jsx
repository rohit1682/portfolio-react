import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ClassicCV from "./ClassicCV";
import {
  personalInfo, experience, education, skillTags,
  achievements, certifications, projects, volunteer,
} from "../../../constants";

const data = {
  personalInfo, experience, education, skillTags,
  achievements, certifications, projects, volunteer,
};

describe("ClassicCV", () => {
  it("renders without crashing", () => {
    const { container } = render(<ClassicCV data={data} />);
    expect(container).toBeTruthy();
  });

  it("renders the user name", () => {
    const { container } = render(<ClassicCV data={data} />);
    expect(container.textContent.toLowerCase()).toContain(personalInfo.name.toLowerCase());
  });
});

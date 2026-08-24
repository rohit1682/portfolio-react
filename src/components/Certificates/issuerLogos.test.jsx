import { describe, it, expect } from "vitest";
import { issuerLogo, fallbackLogo, issuerInitials } from "./issuerLogos";

describe("issuerLogos", () => {
  it("exports all expected issuer logos", () => {
    expect(Object.keys(issuerLogo).length).toBeGreaterThan(0);
    expect(issuerLogo.aws).toBeDefined();
    expect(issuerLogo.coursera).toBeDefined();
    expect(issuerLogo.ibm).toBeDefined();
  });

  it("exports a fallbackLogo", () => {
    expect(fallbackLogo).toBeDefined();
  });

  it("issuerInitials extracts first letters", () => {
    expect(issuerInitials("Amazon Web Services")).toBe("AW");
    expect(issuerInitials("IBM")).toBe("I");
    expect(issuerInitials("")).toBe("");
  });

  it("issuerInitials handles single word", () => {
    expect(issuerInitials("Coursera")).toBe("C");
  });
});

import { describe, it, expect } from "vitest";
import { presets, getMobilePreset, identity, PROPS } from "../scrollPresets";

describe("scrollPresets", () => {
  it("exports all expected preset names", () => {
    const names = ["zoomFade", "perspectiveRise", "slideLeft", "slideRight", "superZoom", "flipIn", "curtainDrop"];
    for (const name of names) {
      expect(presets[name]).toBeDefined();
    }
  });

  it("every preset has input/output arrays of equal length per property", () => {
    for (const [, preset] of Object.entries(presets)) {
      for (const [, val] of Object.entries(preset)) {
        expect(val.input.length).toBe(val.output.length);
        expect(val.input.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("all input values are in [0, 1] and sorted ascending", () => {
    for (const [, preset] of Object.entries(presets)) {
      for (const [, val] of Object.entries(preset)) {
        for (let i = 0; i < val.input.length; i++) {
          expect(val.input[i]).toBeGreaterThanOrEqual(0);
          expect(val.input[i]).toBeLessThanOrEqual(1);
          if (i > 0) expect(val.input[i]).toBeGreaterThanOrEqual(val.input[i - 1]);
        }
      }
    }
  });

  it("all property names are from the allowed set", () => {
    for (const preset of Object.values(presets)) {
      for (const prop of Object.keys(preset)) {
        expect(PROPS).toContain(prop);
      }
    }
  });

  it("identity returns neutral values for opacity/scale vs translate", () => {
    const opId = identity("opacity");
    expect(opId.output).toEqual([1, 1]);
    const scId = identity("scale");
    expect(scId.output).toEqual([1, 1]);
    const yId = identity("y");
    expect(yId.output).toEqual([0, 0]);
  });

  it("getMobilePreset strips 3D props and halves distances", () => {
    const mobile = getMobilePreset(presets.flipIn);
    expect(mobile.rotateX).toBeUndefined();
    expect(mobile.z).toBeUndefined();
    expect(mobile.y.output[0]).toBe(Math.round(presets.flipIn.y.output[0] * 0.5));
  });

  it("getMobilePreset softens scale values", () => {
    const mobile = getMobilePreset(presets.zoomFade);
    for (const v of mobile.scale.output) {
      expect(Math.abs(v - 1)).toBeLessThanOrEqual(Math.abs(presets.zoomFade.scale.output[0] - 1));
    }
  });

  it("PROPS contains all expected CSS properties", () => {
    expect(PROPS).toContain("opacity");
    expect(PROPS).toContain("x");
    expect(PROPS).toContain("y");
    expect(PROPS).toContain("z");
    expect(PROPS).toContain("scale");
    expect(PROPS).toContain("rotateX");
    expect(PROPS).toContain("rotateY");
  });
});

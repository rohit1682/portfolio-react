import { describe, it, expect } from "vitest";
import {
  fadeUp, fadeDown, fadeLeft, fadeRight,
  scaleIn, popIn, staggerContainer, staggerFast, staggerItem,
  slideInLeft, slideInRight, flipIn, blurIn,
  fade3DUp, fade3DLeft, fade3DRight, cardReveal3D, stagger3D,
  cardDramatic3D, cardDramatic3DAlt, staggerDramatic,
} from "../animations";

const delayVariants = [
  ["fadeUp", fadeUp],
  ["fadeDown", fadeDown],
  ["fadeLeft", fadeLeft],
  ["fadeRight", fadeRight],
  ["scaleIn", scaleIn],
  ["popIn", popIn],
  ["slideInLeft", slideInLeft],
  ["slideInRight", slideInRight],
  ["flipIn", flipIn],
  ["blurIn", blurIn],
  ["fade3DUp", fade3DUp],
  ["fade3DLeft", fade3DLeft],
  ["fade3DRight", fade3DRight],
  ["cardReveal3D", cardReveal3D],
  ["cardDramatic3D", cardDramatic3D],
  ["cardDramatic3DAlt", cardDramatic3DAlt],
];

describe("animation variants with delay", () => {
  delayVariants.forEach(([name, variant]) => {
    it(`${name} has hidden and visible states`, () => {
      expect(variant.hidden).toBeDefined();
      expect(variant.hidden.opacity).toBe(0);
      const visible = variant.visible(0);
      expect(visible.opacity).toBe(1);
      expect(visible.transition).toBeDefined();
    });

    it(`${name} accepts a custom delay`, () => {
      const visible = variant.visible(0.5);
      expect(visible.transition.delay).toBe(0.5);
    });
  });
});

describe("stagger containers", () => {
  it("staggerContainer has staggerChildren", () => {
    expect(staggerContainer.visible.transition.staggerChildren).toBeGreaterThan(0);
  });

  it("staggerFast has faster staggerChildren", () => {
    expect(staggerFast.visible.transition.staggerChildren).toBeGreaterThan(0);
    expect(staggerFast.visible.transition.staggerChildren).toBeLessThanOrEqual(
      staggerContainer.visible.transition.staggerChildren
    );
  });

  it("stagger3D has staggerChildren", () => {
    expect(stagger3D.visible.transition.staggerChildren).toBeGreaterThan(0);
  });

  it("staggerDramatic has wider stagger timing", () => {
    expect(staggerDramatic.visible.transition.staggerChildren).toBe(0.12);
    expect(staggerDramatic.visible.transition.delayChildren).toBe(0.15);
  });
});

describe("staggerItem", () => {
  it("has hidden and visible states", () => {
    expect(staggerItem.hidden.opacity).toBe(0);
    expect(staggerItem.visible.opacity).toBe(1);
  });
});

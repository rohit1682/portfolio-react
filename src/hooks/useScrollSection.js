import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { presets, getMobilePreset, identity } from "./scrollPresets";

function getCfg(active, prop) {
  return active[prop] || identity(prop);
}

export default function useScrollSection(options = {}) {
  const { preset: presetName = "zoomFade", offset = ["start end", "end start"] } = options;
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset });

  /* v8 ignore next */
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  /* v8 ignore next */
  const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const raw = presets[presetName] || presets.zoomFade;
  /* v8 ignore next */
  const active = prefersReduced ? {} : isMobile ? getMobilePreset(raw) : raw;

  const o = getCfg(active, "opacity");
  const xc = getCfg(active, "x");
  const yc = getCfg(active, "y");
  const zc = getCfg(active, "z");
  const sc = getCfg(active, "scale");
  const sxc = getCfg(active, "scaleX");
  const syc = getCfg(active, "scaleY");
  const rxc = getCfg(active, "rotateX");
  const ryc = getCfg(active, "rotateY");

  const style = {
    opacity: useTransform(scrollYProgress, o.input, o.output),
    x: useTransform(scrollYProgress, xc.input, xc.output),
    y: useTransform(scrollYProgress, yc.input, yc.output),
    z: useTransform(scrollYProgress, zc.input, zc.output),
    scale: useTransform(scrollYProgress, sc.input, sc.output),
    scaleX: useTransform(scrollYProgress, sxc.input, sxc.output),
    scaleY: useTransform(scrollYProgress, syc.input, syc.output),
    rotateX: useTransform(scrollYProgress, rxc.input, rxc.output),
    rotateY: useTransform(scrollYProgress, ryc.input, ryc.output),
  };

  return { ref, scrollYProgress, style };
}

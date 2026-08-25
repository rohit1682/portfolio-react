import { useMemo } from "react";

export default function useDeviceCapability() {
  return useMemo(() => {
    /* v8 ignore next */
    if (typeof window === "undefined") return { tier: "low" };

    /* v8 ignore next */
    const cores = navigator.hardwareConcurrency || 2;
    const width = window.innerWidth;
    const hasWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      /* v8 ignore start */
      } catch {
        return false;
      }
      /* v8 ignore stop */
    })();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || !hasWebGL || width < 768 || cores < 2) {
      return { tier: "low" };
    }
    if (width < 1024 || cores < 4) {
      return { tier: "medium" };
    }
    return { tier: "high" };
  }, []);
}

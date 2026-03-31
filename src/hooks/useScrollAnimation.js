import { useInView } from "react-intersection-observer";

/**
 * Returns { ref, inView } — attach ref to the element you want to animate.
 * @param {number} threshold - 0 to 1, how much of element must be visible
 * @param {number} rootMargin - px offset before triggering
 */
export function useScrollAnimation(threshold = 0.15, rootMargin = "0px") {
  return useInView({ threshold, triggerOnce: true, rootMargin });
}

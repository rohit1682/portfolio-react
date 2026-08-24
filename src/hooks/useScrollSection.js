import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

export default function useScrollSection(options = {}) {
  const ref = useRef(null);
  const { offset = ["start end", "end start"] } = options;

  const { scrollYProgress } = useScroll({ target: ref, offset });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [4, 0]);

  return {
    ref,
    scrollYProgress,
    transforms: { opacity, y, scale, rotateX },
  };
}

import { motion } from "framer-motion";
import useScrollSection from "../../hooks/useScrollSection";

export default function ScrollSection({ children, preset = "zoomFade", className = "" }) {
  const { ref, style } = useScrollSection({ preset });

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: "1200px", overflow: "hidden" }}
    >
      <motion.div
        style={{
          ...style,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import useScrollSection from "../../hooks/useScrollSection";

export default function ScrollSection({ children, id, className = "", style = {} }) {
  const { ref, transforms } = useScrollSection();

  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{ perspective: "1200px", ...style }}
    >
      <motion.div
        style={{
          opacity: transforms.opacity,
          y: transforms.y,
          scale: transforms.scale,
          rotateX: transforms.rotateX,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}

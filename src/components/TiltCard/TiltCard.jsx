import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function TiltCard({
  children,
  className,
  tiltRange = 6,
  hoverShadow = "0 16px 40px rgba(0,0,0,0.4)",
  hoverY = -8,
  disabled = false,
  glow = true,
  ...rest
}) {
  const ref = useRef(null);
  const glowRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltRange, -tiltRange]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltRange, tiltRange]), { stiffness: 300, damping: 30 });

  /* v8 ignore start */
  const handleMouse = (e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    x.set(nx - 0.5);
    y.set(ny - 0.5);
    if (glow && glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.background =
        `radial-gradient(circle at ${nx * 100}% ${ny * 100}%, rgba(185, 28, 46, 0.15) 0%, transparent 60%)`;
    }
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    if (glow && glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  };
  /* v8 ignore stop */

  return (
    <motion.div
      ref={ref}
      className={className}
      style={disabled ? {} : { rotateX, rotateY, transformStyle: "preserve-3d", position: "relative", overflow: "hidden" }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={disabled ? {} : { y: hoverY, boxShadow: hoverShadow }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      {...rest}
    >
      {children}
      {glow && !disabled && (
        <div
          ref={glowRef}
          data-testid="tilt-glow"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.3s ease",
            borderRadius: "inherit",
            zIndex: 1,
          }}
        />
      )}
    </motion.div>
  );
}

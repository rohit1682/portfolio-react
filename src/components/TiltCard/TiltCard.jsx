import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function TiltCard({
  children,
  className,
  tiltRange = 6,
  hoverShadow = "0 16px 40px rgba(0,0,0,0.4)",
  hoverY = -8,
  disabled = false,
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltRange, -tiltRange]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltRange, tiltRange]), { stiffness: 300, damping: 30 });

  const handleMouse = (e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={disabled ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={disabled ? {} : { y: hoverY, boxShadow: hoverShadow }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

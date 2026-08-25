import { useEffect, useRef, useCallback } from "react";
import styles from "./HeroLightning.module.css";

/* v8 ignore start */
function drawBolt(ctx, x0, y0, x1, y1, depth, maxDepth) {
  if (depth > maxDepth) return;
  const segments = 6 + Math.floor(Math.random() * 4);
  const dx = (x1 - x0) / segments;
  const dy = (y1 - y0) / segments;
  const spread = 40 / (depth + 1);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  let cx = x0, cy = y0;
  for (let i = 1; i <= segments; i++) {
    const nx = x0 + dx * i + (i < segments ? (Math.random() - 0.5) * spread : 0);
    const ny = y0 + dy * i + (i < segments ? (Math.random() - 0.5) * spread : 0);
    ctx.lineTo(nx, ny);
    if (depth < maxDepth - 1 && Math.random() > 0.7) {
      drawBolt(ctx, cx, cy, cx + (Math.random() - 0.5) * 80, cy + (Math.random() - 0.5) * 80, depth + 1, maxDepth);
    }
    cx = nx;
    cy = ny;
  }
  ctx.stroke();
}
/* v8 ignore stop */

export default function HeroLightning() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const lastBlastRef = useRef(0);
  const rafRef = useRef(0);
  const frameRef = useRef(0);

  /* v8 ignore start */
  const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1, y: -1 };
  }, []);

  const triggerBlast = useCallback(() => {
    const now = Date.now();
    if (now - lastBlastRef.current < 2000) return;
    lastBlastRef.current = now;
    document.documentElement.classList.add("blasted");
    setTimeout(() => document.documentElement.classList.remove("blasted"), 400);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth: w, clientHeight: h } = canvas.parentElement || canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;
    const arcCount = isMobile ? 2 : 4;
    const maxDepth = isMobile ? 2 : 3;

    const draw = () => {
      frameRef.current++;
      if (frameRef.current % 2 !== 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      const { x: mx, y: my } = mouseRef.current;
      const hasTarget = mx >= 0 && my >= 0;

      for (let i = 0; i < arcCount; i++) {
        const edge = Math.floor(Math.random() * 4);
        let sx, sy;
        if (edge === 0) { sx = Math.random() * w; sy = 0; }
        else if (edge === 1) { sx = w; sy = Math.random() * h; }
        else if (edge === 2) { sx = Math.random() * w; sy = h; }
        else { sx = 0; sy = Math.random() * h; }

        const tx = hasTarget ? mx + (Math.random() - 0.5) * 40 : Math.random() * w;
        const ty = hasTarget ? my + (Math.random() - 0.5) * 40 : Math.random() * h;

        ctx.save();
        ctx.strokeStyle = "rgba(185, 28, 46, 0.6)";
        ctx.lineWidth = isMobile ? 1 : 1.5;
        ctx.shadowColor = "rgba(232, 93, 117, 0.4)";
        ctx.shadowBlur = 12;
        drawBolt(ctx, sx, sy, tx, ty, 0, maxDepth);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = "rgba(232, 93, 117, 0.2)";
        ctx.lineWidth = isMobile ? 2.5 : 3.5;
        ctx.shadowColor = "rgba(232, 93, 117, 0.15)";
        ctx.shadowBlur = 24;
        drawBolt(ctx, sx, sy, tx, ty, 0, maxDepth);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReduced]);
  /* v8 ignore stop */

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={triggerBlast}
      onTouchEnd={triggerBlast}
      data-testid="hero-lightning"
      aria-hidden="true"
    />
  );
}

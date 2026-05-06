import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  motion, AnimatePresence, useMotionValue, useTransform, useSpring, useReducedMotion,
} from "framer-motion";
import {
  FileText, Image as ImageIcon, ExternalLink, X, Download, ChevronLeft, ChevronRight,
  Star, Calendar,
} from "lucide-react";
import { certificates, certificateCategories } from "../../constants";
import { scaleIn, staggerItem } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import { issuerLogo, fallbackLogo, issuerInitials } from "./issuerLogos";
import styles from "./Certificates.module.css";

/* ── Tilt wrapper ─────────────────────────────────────────────── */
function TiltCard({ children, className, onClick, disabled }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouse = (e) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={disabled ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={disabled ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated counter ─────────────────────────────────────────── */
function CountUp({ to, duration = 1.2 }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / (duration * 1000), 1);
        setN(Math.floor(p * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{n}</span>;
}

/* ── Lazy preview (mounts heavy <object> only when in view) ───── */
function CertPreview({ cert }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fileUrl = encodeURI(cert.file);
  const thumbUrl = cert.thumb ? encodeURI(cert.thumb) : null;
  const webpUrl = thumbUrl ? thumbUrl.replace(/\.png$/i, ".webp") : null;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.preview}>
      {!loaded && <div className={styles.skeleton} />}

      {visible && cert.type === "image" && (
        <img src={fileUrl} alt={cert.title} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} />
      )}

      {visible && cert.type === "pdf" && thumbUrl && (
        <picture>
          {webpUrl && <source srcSet={webpUrl} type="image/webp" />}
          <img
            src={thumbUrl}
            alt={cert.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={(e) => { e.currentTarget.style.display = "none"; setLoaded(true); }}
          />
        </picture>
      )}

      {visible && cert.type === "pdf" && !thumbUrl && (
        <object
          data={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          type="application/pdf"
          className={styles.pdfFrame}
          aria-label={cert.title}
          onLoad={() => setLoaded(true)}
        >
          <div className={styles.pdfFallback}><FileText size={42} /><span>PDF</span></div>
        </object>
      )}

      <span className={styles.shine} aria-hidden />
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export default function Certificates() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const [activeIdx, setActiveIdx] = useState(null);

  const filtered = useMemo(
    () => (filter === "all" ? certificates : certificates.filter(c => c.category === filter)),
    [filter]
  );

  const issuersCount = useMemo(
    () => new Set(certificates.map(c => c.issuerKey || c.issuer)).size,
    []
  );

  const close = useCallback(() => setActiveIdx(null), []);
  const next  = useCallback(() => setActiveIdx(i => (i + 1) % filtered.length), [filtered.length]);
  const prev  = useCallback(() => setActiveIdx(i => (i - 1 + filtered.length) % filtered.length), [filtered.length]);

  /* keyboard nav */
  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, close, next, prev]);

  const active = activeIdx !== null ? filtered[activeIdx] : null;

  const filters = [{ key: "all", label: "All" }, ...Object.entries(certificateCategories).map(([k, v]) => ({ key: k, label: v.label, color: v.color }))];

  return (
    <section id="certificates" className="section-wrapper">
      <div className="container">
        <SectionTitle title="Certificates" subtitle="Verified credentials and program completions" />

        {/* stat strip */}
        <motion.div
          className={styles.statStrip}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.stat}>
            <span className={styles.statNum}><CountUp to={certificates.length} />+</span>
            <span className={styles.statLabel}>Certifications</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}><CountUp to={issuersCount} /></span>
            <span className={styles.statLabel}>Issuers</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}><CountUp to={Object.keys(certificateCategories).length} /></span>
            <span className={styles.statLabel}>Domains</span>
          </div>
        </motion.div>

        {/* filter chips */}
        <motion.div className={styles.filters} variants={staggerItem} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {filters.map(f => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                className={`${styles.chip} ${active ? styles.chipActive : ""}`}
                style={active && f.color ? { borderColor: f.color, color: f.color, boxShadow: `0 0 0 1px ${f.color}33, 0 6px 22px ${f.color}22` } : undefined}
                onClick={() => setFilter(f.key)}
              >
                {f.color && <span className={styles.chipDot} style={{ background: f.color }} />}
                {f.label}
              </button>
            );
          })}
        </motion.div>

        {/* grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((cert, i) => {
              const cat = certificateCategories[cert.category];
              const Icon = cert.type === "pdf" ? FileText : ImageIcon;
              const logo = issuerLogo[cert.issuerKey] || fallbackLogo;

              return (
                <motion.div
                  key={cert.title}
                  variants={reduceMotion ? undefined : scaleIn}
                  custom={i * 0.05}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className={styles.cardWrap}
                >
                  <TiltCard
                    disabled={reduceMotion}
                    className={`card ${styles.card} ${cert.featured ? styles.featured : ""}`}
                    onClick={() => setActiveIdx(i)}
                  >
                    {cert.featured && (
                      <div className={styles.featuredBadge}>
                        <Star size={11} fill="currentColor" /> Featured
                      </div>
                    )}

                    <CertPreview cert={cert} />

                    <div className={styles.overlay}>
                      <div className={styles.overlayActions}>
                        <button className={styles.ovBtn} aria-label="Quick view"><ExternalLink size={14} /> View</button>
                        <a
                          className={styles.ovBtnGhost}
                          href={encodeURI(cert.file)}
                          download
                          aria-label="Download"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download size={14} />
                        </a>
                      </div>
                    </div>

                    <div className={styles.body}>
                      <div
                        className={styles.iconWrap}
                        style={cat ? { color: cat.color, background: `${cat.color}1a`, borderColor: `${cat.color}33` } : undefined}
                      >
                        {logo || <Icon size={16} />}
                      </div>
                      <div className={styles.meta}>
                        <h3 className={styles.title}>{cert.title}</h3>
                        <div className={styles.metaRow}>
                          <span className={styles.issuer}>
                            {issuerInitials(cert.issuer)} · {cert.issuer}
                          </span>
                          {cert.year && (
                            <span className={styles.year}>
                              <Calendar size={10} /> {cert.year}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Modal viewer with keyboard nav ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button className={`${styles.navBtn} ${styles.navLeft}`} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
              <ChevronLeft size={22} />
            </button>
            <button className={`${styles.navBtn} ${styles.navRight}`} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={active.title}
              className={styles.modalInner}
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHead}>
                <div className={styles.modalTitle}>
                  <h3>{active.title}</h3>
                  <p>
                    {active.issuer}{active.year ? ` · ${active.year}` : ""}
                    {certificateCategories[active.category] && (
                      <span className={styles.modalCat} style={{ color: certificateCategories[active.category].color, borderColor: `${certificateCategories[active.category].color}55` }}>
                        {certificateCategories[active.category].label}
                      </span>
                    )}
                  </p>
                </div>
                <div className={styles.modalActions}>
                  <a href={encodeURI(active.file)} target="_blank" rel="noreferrer" className={styles.modalBtn} aria-label="Open in new tab" title="Open in new tab">
                    <ExternalLink size={16} />
                  </a>
                  <a href={encodeURI(active.file)} download className={styles.modalBtn} aria-label="Download" title="Download">
                    <Download size={16} />
                  </a>
                  <button onClick={close} className={styles.modalBtn} aria-label="Close" title="Close (Esc)">
                    <X size={16} />
                  </button>
                </div>
              </div>
              <div className={styles.modalBody}>
                {active.type === "image" ? (
                  <img src={encodeURI(active.file)} alt={active.title} />
                ) : (
                  <iframe src={`${encodeURI(active.file)}#view=FitH`} title={active.title} />
                )}
              </div>
              <div className={styles.modalFoot}>
                <span>{activeIdx + 1} / {filtered.length}</span>
                <span className={styles.kbdHint}>← → to navigate · Esc to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

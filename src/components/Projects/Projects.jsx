import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FolderOpen, ExternalLink, CheckCircle2, Star } from "lucide-react";
import { projects } from "../../constants";
import { scaleIn, staggerItem } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Projects.module.css";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

function TiltCard({ children, className, featured }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={{ y: -8, boxShadow: featured ? "0 20px 60px rgba(180,30,45,0.2)" : "0 16px 40px rgba(0,0,0,0.4)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

const statusColors = {
  "Completed": { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)", color: "#34d399" },
  "In Progress": { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)", color: "#fbbf24" },
};

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);
  const shown = filter === "featured" ? featured : filter === "others" ? others : projects;

  return (
    <section id="projects" className="section-wrapper">
      <div className="container">
        <SectionTitle title="Projects" subtitle="Things I've built and shipped" />

        <motion.div className={styles.filters} variants={staggerItem} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {["all", "featured", "others"].map(f => (
            <button key={f} className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ""}`} onClick={() => setFilter(f)}>
              {f === "all" ? "All" : f === "featured" ? "⭐ Featured" : "More"}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={filter} className={styles.grid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {shown.map((project, i) => {
              const sc = statusColors[project.status] || statusColors["Completed"];
              return (
                <motion.div key={project.id} variants={scaleIn} custom={i * 0.08} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                  <TiltCard className={`card ${styles.card} ${project.featured ? styles.featured : ""}`} featured={project.featured}>
                    {project.featured && <div className={styles.featuredBadge}><Star size={11} fill="currentColor" /> Featured</div>}
                    <div className={styles.cardTop}>
                      <FolderOpen size={28} className={styles.folder} />
                      <div className={styles.links}>
                        <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
                        <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live"><ExternalLink size={15} /></a>
                      </div>
                    </div>
                    <div className={styles.statusRow}>
                      <span className={styles.status} style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}>{project.status}</span>
                    </div>
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.subtitle}>{project.subtitle}</p>
                    <p className={styles.desc}>{project.description}</p>
                    {project.features && (
                      <ul className={styles.features}>
                        {project.features.slice(0, 3).map((f, fi) => (
                          <li key={fi}><CheckCircle2 size={12} className={styles.checkIcon} />{f}</li>
                        ))}
                      </ul>
                    )}
                    <div className={styles.tags}>
                      {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

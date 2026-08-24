import { motion } from "framer-motion";
import {
  Camera, Mic2, Code2, CircleDot, Zap, TrendingUp,
  Swords, Plane, BookOpen, Music, Dumbbell, Languages,
} from "lucide-react";
import { hobbies } from "../../constants";
import TiltCard from "../TiltCard/TiltCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Hobbies.module.css";

const iconMap = {
  Camera, Mic2, Code2, CircleDot, Zap, TrendingUp,
  Swords, Plane, BookOpen, Music, Dumbbell, Languages,
};

const waveVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.85 },
  /* v8 ignore next */
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.5, ease: "backOut" },
  }),
};

export default function Hobbies() {
  return (
    <section id="hobbies" className="section-wrapper section-3d">
      <div className="container">
        <SectionTitle title="Beyond the Code" subtitle="What I love doing outside of work" />

        <div className={styles.grid}>
          {hobbies.map((hobby, i) => {
            const Icon = iconMap[hobby.icon];
            /* v8 ignore next */
            const iconEl = Icon ? <Icon size={28} /> : <span style={{ fontSize: "1.5rem" }}>✦</span>;
            return (
              <motion.div
                key={hobby.name}
                variants={waveVariant}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <TiltCard className={`card ${styles.card}`} tiltRange={6} hoverY={-4}>
                  <div className={styles.iconWrap}>
                    {iconEl}
                  </div>
                  <span className={styles.name}>{hobby.name}</span>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

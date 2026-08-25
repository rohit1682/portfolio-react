import { motion } from "framer-motion";
import {
  Camera, Mic2, Code2, CircleDot, Zap, TrendingUp,
  Swords, Plane, BookOpen, Music, Dumbbell, Languages,
} from "lucide-react";
import { hobbies, personalInfo } from "../../constants";
import { cardDramatic3D } from "../../hooks/animations";
import TiltCard from "../TiltCard/TiltCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Hobbies.module.css";

const iconMap = {
  Camera, Mic2, Code2, CircleDot, Zap, TrendingUp,
  Swords, Plane, BookOpen, Music, Dumbbell, Languages,
};


export default function Hobbies() {
  return (
    <section id="hobbies" className="section-wrapper section-3d">
      <div className="container">
        <SectionTitle title="Beyond the Code" subtitle={personalInfo.hobbiesTagline} />

        <div className={styles.grid}>
          {hobbies.map((hobby, i) => {
            const Icon = iconMap[hobby.icon];
            /* v8 ignore next */
            const iconEl = Icon ? <Icon size={28} /> : <span style={{ fontSize: "1.5rem" }}>✦</span>;
            return (
              <motion.div
                key={hobby.name}
                variants={cardDramatic3D}
                custom={i * 0.06}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
              >
                <TiltCard className={`card card--float ${styles.card}`} tiltRange={6} hoverY={-4}>
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

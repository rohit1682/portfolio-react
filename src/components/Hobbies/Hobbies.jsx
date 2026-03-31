import { motion } from "framer-motion";
import {
  Camera, Mic2, Code2, CircleDot, Zap, TrendingUp,
  Swords, Plane, BookOpen, Music, Dumbbell, Languages,
} from "lucide-react";
import { hobbies, personalInfo } from "../../constants";
import { scaleIn, fadeUp } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Hobbies.module.css";

const iconMap = {
  Camera, Mic2, Code2, CircleDot, Zap, TrendingUp,
  Swords, Plane, BookOpen, Music, Dumbbell, Languages,
};

export default function Hobbies() {
  return (
    <section id="hobbies" className="section-wrapper">
      <div className="container">
        <SectionTitle title="Beyond the Code" subtitle="What I love doing outside of work" />

        <div className={styles.grid}>
          {hobbies.map((hobby, i) => {
            const Icon = iconMap[hobby.icon];
            return (
              <motion.div
                key={hobby.name}
                className={`card ${styles.card}`}
                variants={scaleIn}
                custom={i * 0.06}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ scale: 1.06, y: -4 }}
              >
                <div className={styles.iconWrap}>
                  {Icon ? <Icon size={28} /> : <span style={{ fontSize: "1.5rem" }}>✦</span>}
                </div>
                <span className={styles.name}>{hobby.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

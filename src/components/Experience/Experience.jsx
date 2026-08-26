import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { experience, personalInfo } from "../../constants";
import TiltCard from "../TiltCard/TiltCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Experience.module.css";

function TimelineItem({ item, index, scrollYProgress }) {
  const threshold = index / experience.length;
  const opacity = useTransform(scrollYProgress, [threshold, threshold + 0.08], [0, 1]);
  const x = useTransform(scrollYProgress, [threshold, threshold + 0.1], [-60, 0]);
  const rotateY = useTransform(scrollYProgress, [threshold, threshold + 0.1], [-15, 0]);
  const dotScale = useTransform(scrollYProgress, [threshold, threshold + 0.05], [0, 1]);

  return (
    <motion.div
      className={styles.item}
      style={{ "--item-color": item.color, opacity, x, rotateY, perspective: "800px" }}
    >
      <motion.div
        className={styles.dot}
        style={{ background: item.color, scale: dotScale }}
      >
        <Briefcase size={12} />
      </motion.div>

      <TiltCard className={`card card--border-left ${styles.card}`} tiltRange={4} hoverY={-4}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h3 className={styles.role}>{item.role}</h3>
            <span className={styles.company} style={{ color: item.color }}>{item.company}</span>
          </div>
          <div className={styles.headerRight}>
            <span className="tag">{item.type}</span>
            {item.current && <span className={styles.currentBadge}>● Current</span>}
          </div>
        </div>

        <div className={styles.meta}>
          <span className={styles.metaItem}><MapPin size={12} />{item.location}</span>
          <span className={styles.metaItem}><Calendar size={12} />{item.period}</span>
        </div>

        <ul className={styles.points}>
          {item.points.map((pt, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + j * 0.06 }}
            >
              <CheckCircle2 size={13} className={styles.checkIcon} />
              {pt}
            </motion.li>
          ))}
        </ul>
      </TiltCard>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section id="experience" className="section-wrapper section-3d" ref={sectionRef}>
      <div className="container">
        <SectionTitle title={personalInfo.experienceTitle} subtitle={personalInfo.experienceTagline} />

        <div className={styles.stickyWrap}>
          <div className={styles.timeline}>
            <motion.div className={styles.line} style={{ scaleY: lineScaleY, transformOrigin: "top" }} />

            {experience.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

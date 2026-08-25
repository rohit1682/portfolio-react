import { motion } from "framer-motion";
import { GraduationCap, MapPin, Users, Award, CheckCircle2 } from "lucide-react";
import { education, volunteer, personalInfo } from "../../constants";
import { cardDramatic3D, cardDramatic3DAlt } from "../../hooks/animations";
import TiltCard from "../TiltCard/TiltCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Education.module.css";

function EduCard({ item, i, isVolunteer, side }) {
  const variant = side === "left" ? cardDramatic3D : cardDramatic3DAlt;
  return (
    <motion.div variants={variant} custom={i * 0.12} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
      <TiltCard className={`card card--soft ${styles.card} ${isVolunteer ? styles.volunteerCard : ""}`} tiltRange={4} hoverY={-4}>
        <div className={styles.cardTop}>
          <div className={styles.iconWrap}>{isVolunteer ? <Users size={18} /> : <GraduationCap size={18} />}</div>
          <span className="tag">{item.period}</span>
        </div>
        <h4 className={styles.degree}>{isVolunteer ? item.role : item.degree}</h4>
        <p className={styles.institution}>{isVolunteer ? item.organization : item.institution}</p>
        <p className={styles.location}><MapPin size={12} />{item.location}</p>
        {(item.score || item.cgpa) && (
          <div className={styles.score}><Award size={13} />{item.score}</div>
        )}
        {item.description && <p className={styles.desc}>{item.description}</p>}
        {item.highlights && item.highlights.length > 0 && (
          <ul className={styles.highlights}>
            {item.highlights.map((h) => (
              <li key={h}>
                <CheckCircle2 size={13} className={styles.checkIcon} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
      </TiltCard>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="section-wrapper section-bg section-3d">
      <div className="container">
        <SectionTitle title="Education" subtitle={personalInfo.educationTagline} />

        <div className={styles.grid}>
          <div>
            <motion.h3 className={styles.sectionLabel} initial={{ opacity: 0, x: -20, rotateY: 8 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <GraduationCap size={18} /> Academic
            </motion.h3>
            {education.map((item, i) => <EduCard key={i} item={item} i={i} isVolunteer={false} side="left" />)}
          </div>
          <div>
            <motion.h3 className={styles.sectionLabel} initial={{ opacity: 0, x: 20, rotateY: -8 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Users size={18} /> Leadership & Volunteer
            </motion.h3>
            {volunteer.map((item, i) => <EduCard key={i} item={item} i={i} isVolunteer={true} side="right" />)}
          </div>
        </div>
      </div>
    </section>
  );
}

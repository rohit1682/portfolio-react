import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Briefcase } from "lucide-react";
import { personalInfo } from "../../constants";
import SocialLinks from "../SocialLinks/SocialLinks";
import styles from "./Hero.module.css";

export default function Hero() {
  const typedRef = useRef(null);
  const stateRef = useRef({ index: 0, char: 0, deleting: false });

  useEffect(() => {
    const roles = personalInfo.typedRoles;
    let timer;
    const type = () => {
      const { index, char, deleting } = stateRef.current;
      const current = roles[index];
      if (!deleting) {
        stateRef.current.char++;
        if (typedRef.current) typedRef.current.textContent = current.slice(0, stateRef.current.char);
        if (stateRef.current.char === current.length) {
          stateRef.current.deleting = true;
          timer = setTimeout(type, 1800);
          return;
        }
      } else {
        stateRef.current.char--;
        if (typedRef.current) typedRef.current.textContent = current.slice(0, stateRef.current.char);
        if (stateRef.current.char === 0) {
          stateRef.current.deleting = false;
          stateRef.current.index = (index + 1) % roles.length;
        }
      }
      timer = setTimeout(type, deleting ? 55 : 100);
    };
    timer = setTimeout(type, 600);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className={styles.hero}>
      {/* Background */}
      <div className={styles.bgImage} style={{ backgroundImage: `url(${personalInfo.photos.cover})` }} />
      <div className={styles.bgOverlay} />
      <div className={styles.orb1} /><div className={styles.orb2} /><div className={styles.orb3} />

      <div className={styles.content}>
        {/* Profile photo */}
        <motion.div
          className={styles.photoWrap}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "backOut" }}
        >
          <img src={personalInfo.photos.profile} alt={personalInfo.name} className={styles.photo} />
          <div className={styles.photoRing} />
        </motion.div>

        <motion.div className={styles.badge} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <span className={styles.badgeDot} /> Employed · Open to Opportunities
        </motion.div>

        <motion.h1 className={styles.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
          Hi, I'm <span className={styles.nameHighlight}>{personalInfo.name}</span>
        </motion.h1>

        <motion.p className={styles.role} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}>
          I'm a <span ref={typedRef} className={styles.typed} /><span className={styles.cursor}>|</span>
        </motion.p>

        <motion.div className={styles.metaRow} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <span className={styles.metaItem}><Briefcase size={14} />{personalInfo.currentRole}</span>
          <span className={styles.metaDot} />
          <span className={styles.metaItem}><MapPin size={14} />{personalInfo.location}</span>
        </motion.div>

        <motion.div className={styles.actions} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <button className="btn-primary" onClick={() => scrollTo("projects")}>View My Work</button>
          <a href={`mailto:${personalInfo.email}`} className="btn-outline"><Mail size={16} />Say Hello</a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
          <SocialLinks className={styles.socials} />
        </motion.div>
      </div>

      <motion.button className={styles.scrollDown} onClick={() => scrollTo("about")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} aria-label="Scroll down">
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
}

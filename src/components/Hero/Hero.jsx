import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail, MapPin, Briefcase } from "lucide-react";
import { personalInfo } from "../../constants";
import SocialLinks from "../SocialLinks/SocialLinks";
import HeroLightning from "../HeroLightning/HeroLightning";
import styles from "./Hero.module.css";

export default function Hero() {
  const sectionRef = useRef(null);
  const typedRef = useRef(null);
  const stateRef = useRef({ index: 0, char: 0, deleting: false });

  /* v8 ignore start */
  useEffect(() => {
    const roles = personalInfo.typedRoles;
    let timer;
    const type = () => {
      const { index, deleting } = stateRef.current;
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
  /* v8 ignore stop */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const contentRotateX = useTransform(scrollYProgress, [0, 0.5], [0, 8]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.5], [0, 8]);

  /* v8 ignore next */
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className={styles.hero} ref={sectionRef}>
      <div className={styles.bgImage} style={{ backgroundImage: `url(${personalInfo.photos.cover})` }} />
      <HeroLightning />
      <div className={styles.bgOverlay} />
      <div className={styles.orb1} /><div className={styles.orb2} /><div className={styles.orb3} />

      <motion.div
        className={styles.content}
        style={{
          opacity: contentOpacity,
          y: contentY,
          scale: contentScale,
          rotateX: contentRotateX,
          /* v8 ignore next */
          filter: useTransform(contentBlur, (v) => `blur(${v}px)`),
        }}
      >
        <motion.div
          className={styles.photoWrap}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "backOut" }}
        >
          <img src={personalInfo.photos.profile} alt={personalInfo.name} className={styles.photo} />
          <div className={styles.photoRing} />
        </motion.div>

        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className={styles.badgeDot} /> {personalInfo.status}
        </motion.div>

        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {personalInfo.heroGreeting} <span className={styles.nameHighlight}>{personalInfo.name}</span>
        </motion.h1>

        <motion.p
          className={styles.role}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          I&apos;m a <span ref={typedRef} className={styles.typed} data-testid="typed-role" /><span className={styles.cursor}>|</span>
        </motion.p>

        <motion.div
          className={styles.metaRow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <span className={styles.metaItem}><Briefcase size={14} />{personalInfo.currentRole}</span>
          <span className={styles.metaDot} />
          <span className={styles.metaItem}><MapPin size={14} />{personalInfo.location}</span>
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <button className="btn-primary" onClick={() => scrollTo("projects")}>
            {personalInfo.heroPrimaryCTA}
          </button>
          <a href={`mailto:${personalInfo.email}`} className="btn-outline">
            <Mail size={16} /> {personalInfo.heroSecondaryCTA}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <SocialLinks />
        </motion.div>
      </motion.div>

      <motion.button
        className={styles.scrollDown}
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileDown, Command } from "lucide-react";
import { navLinks, personalInfo } from "../../constants";
import styles from "./Navbar.module.css";

export default function Navbar({ onCVOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  // Section links toggle (desktop). Default open so the nav looks normal on load.
  const [linksOpen, setLinksOpen] = useState(true);
  // Initialize synchronously so we don't trigger a setState inside an effect.
  const [isMac] = useState(() =>
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.userAgent || navigator.platform || "")
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Programmatically open the command palette via the same hotkey it listens to
  const openPalette = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
  };

  // On mobile (≤900px) the section links are hidden anyway and a hamburger
  // menu is used, so the logo just scrolls to the top there.
  const onLogoClick = () => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches) {
      handleNav("#hero");
    } else {
      setLinksOpen((o) => !o);
    }
  };

  const initials = personalInfo.name.split(" ").map((w) => w[0]).join("");

  // Variants — links unfurl out of the logo, then collapse back into it.
  // Both the logo's layout move and the link animations are driven on the
  // same timeline so the links are visibly being engulfed AS the logo
  // glides toward the centre, and emerge AS it glides back to the side.
  const NAV_DURATION = 0.55;
  const LINK_DURATION = 0.32;
  const STAGGER = 0.05;
  const NAV_EASE = [0.65, 0, 0.35, 1];

  const linksContainerVariants = {
    open: {
      transition: { staggerChildren: STAGGER, delayChildren: 0.05 },
    },
    closed: {
      transition: { staggerChildren: STAGGER, delayChildren: 0 },
    },
  };
  const linkItemVariants = {
    open: {
      opacity: 1,
      x: 0,
      scale: 1,
      width: "auto",
      marginLeft: 4,
      transition: {
        duration: LINK_DURATION,
        ease: [0.32, 0.72, 0.24, 1],
        opacity: { duration: 0.22, delay: 0.08 },
      },
    },
    closed: {
      opacity: 0,
      x: -28,
      scale: 0.5,
      width: 0,
      marginLeft: 0,
      transition: {
        duration: LINK_DURATION,
        ease: [0.76, 0, 0.68, 0],
        opacity: { duration: 0.18 },
      },
    },
  };

  return (
    <motion.nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.container}>
        <div className={`${styles.leftCluster} ${linksOpen ? "" : styles.leftClusterCentered}`}>
          <motion.button
            layout
            className={styles.logo}
            onClick={onLogoClick}
            aria-label={linksOpen ? "Hide section links" : "Show section links"}
            aria-expanded={linksOpen}
            whileHover={{ scale: 1.12, rotate: -4 }}
            whileTap={{ scale: 0.92 }}
            animate={{ rotate: linksOpen ? 0 : [0, 8, -8, 0] }}
            transition={{
              layout: { duration: NAV_DURATION, ease: NAV_EASE },
              rotate: { duration: NAV_DURATION, ease: "easeInOut" },
            }}
          >
            {initials}<span className={styles.logoDot}>.</span>
          </motion.button>

          <motion.ul
            className={styles.links}
            initial={false}
            animate={linksOpen ? "open" : "closed"}
            variants={linksContainerVariants}
          >
            {navLinks.map((link) => (
              <motion.li
                key={link.href}
                variants={linkItemVariants}
                style={{
                  overflow: "hidden",
                  display: "inline-flex",
                  whiteSpace: "nowrap",
                  transformOrigin: "left center",
                }}
              >
                <button
                  className={`${styles.link} ${active === link.href.replace("#", "") ? styles.active : ""}`}
                  onClick={() => handleNav(link.href)}
                  tabIndex={linksOpen ? 0 : -1}
                  aria-hidden={!linksOpen}
                >
                  {link.label}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className={styles.rightCluster}>
          <button
            className={styles.cmdkBtn}
            onClick={openPalette}
            aria-label="Open command palette"
            title="Quick search (⌘K)"
          >
            <Command size={13} />
            <span className={styles.cmdkLabel}>{isMac ? "⌘" : "Ctrl"} K</span>
          </button>
          <button className={styles.cvBtn} onClick={onCVOpen} aria-label="Download CV">
            <FileDown size={15} />
            <span>Download CV</span>
          </button>
          <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                className={`${styles.mobileLink} ${active === link.href.replace("#", "") ? styles.active : ""}`}
                onClick={() => handleNav(link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

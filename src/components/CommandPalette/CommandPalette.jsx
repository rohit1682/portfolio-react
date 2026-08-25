import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ArrowRight, FileDown, GitBranch, Link2, Mail, MapPin,
  Briefcase, Award, FolderOpen, GraduationCap, Sparkles,
} from "lucide-react";
import {
  navLinks, personalInfo, projects, certificates,
} from "../../constants";
import styles from "./CommandPalette.module.css";

/**
 * Cmd-K / Ctrl-K command palette — quick-jump to any section,
 * project, certificate or social profile. Fuzzy-ish substring match,
 * keyboard navigable.
 */
export default function CommandPalette({ onOpenCV }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const sectionItems = navLinks.map((l) => ({
      id: `section-${l.href}`,
      label: l.label,
      hint: "Jump to section",
      group: "Sections",
      icon: <ArrowRight size={15} />,
      /* v8 ignore next */
      run: () => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }),
    }));

    const projectItems = projects.map((p) => ({
      id: `project-${p.id}`,
      label: p.title,
      hint: p.subtitle,
      group: personalInfo.projectsTitle,
      icon: <FolderOpen size={15} />,
      /* v8 ignore next 3 */
      run: () => p.github && p.github !== "#"
        ? window.open(p.github, "_blank", "noreferrer")
        : document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
    }));

    const certItems = certificates.map((c) => ({
      id: `cert-${c.title}`,
      label: c.title,
      hint: c.issuer,
      group: personalInfo.certificatesTitle,
      icon: <Award size={15} />,
      /* v8 ignore next */
      run: () => window.open(encodeURI(c.file), "_blank", "noreferrer"),
    }));

    /* v8 ignore start */
    const actions = [
      {
        id: "act-cv", label: personalInfo.downloadCVLabel,
        hint: "Open the CV theme picker", group: "Actions",
        icon: <FileDown size={15} />, run: () => onOpenCV?.(),
      },
      {
        id: "act-email", label: `Email ${personalInfo.email}`,
        hint: "Compose mail", group: "Actions",
        icon: <Mail size={15} />, run: () => { window.location.href = `mailto:${personalInfo.email}`; },
      },
      {
        id: "act-github", label: "Open GitHub",
        hint: personalInfo.github, group: "Actions",
        icon: <GitBranch size={15} />, run: () => window.open(personalInfo.github, "_blank", "noreferrer"),
      },
      {
        id: "act-linkedin", label: "Open LinkedIn",
        hint: "Connect with me", group: "Actions",
        icon: <Link2 size={15} />, run: () => window.open(personalInfo.linkedin, "_blank", "noreferrer"),
      },
      {
        id: "act-location", label: personalInfo.location,
        hint: "Where I'm based", group: "Actions",
        icon: <MapPin size={15} />, run: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        id: "act-role", label: personalInfo.currentRole,
        hint: "Current role", group: "Actions",
        icon: <Briefcase size={15} />, run: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        id: "act-edu", label: personalInfo.educationTitle, hint: personalInfo.degree,
        group: "Actions", icon: <GraduationCap size={15} />,
        run: () => document.getElementById("education")?.scrollIntoView({ behavior: "smooth" }),
      },
    ];
    /* v8 ignore stop */

    return [...sectionItems, ...actions, ...projectItems, ...certItems];
  }, [onOpenCV]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        (it.hint && it.hint.toLowerCase().includes(q)) ||
        it.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Group rendering
  const grouped = useMemo(() => {
    const m = new Map();
    filtered.forEach((it) => {
      if (!m.has(it.group)) m.set(it.group, []);
      m.get(it.group).push(it);
    });
    return Array.from(m.entries());
  }, [filtered]);

  // Global hotkey
  useEffect(() => {
    const onKey = (e) => {
      const isToggle = (e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey);
      if (isToggle) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "/" && !open && document.activeElement === document.body) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  // Keyboard nav inside palette
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = filtered[active];
        /* v8 ignore next */
        if (target) {
          target.run();
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active]);

  // Reset active when filter shrinks
  useEffect(() => { setActive(0); }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className={styles.searchRow}>
              <Search size={16} className={styles.searchIcon} />
              <input
                ref={inputRef}
                className={styles.input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search sections, projects, certificates…"
                aria-label="Search"
              />
              <kbd className={styles.kbd}>esc</kbd>
            </div>

            <div className={styles.list}>
              {grouped.length === 0 && (
                <p className={styles.empty}>
                  <Sparkles size={14} /> No results — try “projects”, “claude”, “contact”…
                </p>
              )}
              {(() => {
                let idx = -1;
                return grouped.map(([group, list]) => (
                  <div key={group} className={styles.group}>
                    <div className={styles.groupTitle}>{group}</div>
                    {list.map((it) => {
                      idx++;
                      const isActive = idx === active;
                      return (
                        <button
                          key={it.id}
                          className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                          onMouseEnter={() => setActive(items.indexOf(it))}
                          onClick={() => { it.run(); setOpen(false); }}
                        >
                          <span className={styles.itemIcon}>{it.icon}</span>
                          <span className={styles.itemBody}>
                            <span className={styles.itemLabel}>{it.label}</span>
                            {it.hint && <span className={styles.itemHint}>{it.hint}</span>}
                          </span>
                          {isActive && <ArrowRight size={14} className={styles.itemArrow} />}
                        </button>
                      );
                    })}
                  </div>
                ));
              })()}
            </div>

            <div className={styles.footer}>
              <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> open</span>
              <span><kbd>esc</kbd> close</span>
              <span className={styles.spacer} />
              <span className={styles.brand}>⌘K · /</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

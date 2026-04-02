import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Eye } from "lucide-react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import {
  personalInfo,
  experience,
  education,
  skillTags,
  achievements,
  certifications,
  projects,
  volunteer,
} from "../../constants";
import ClassicCV from "./themes/ClassicCV";
import ModernCV from "./themes/ModernCV";
import ExecutiveCV from "./themes/ExecutiveCV";
import SidebarCV from "./themes/SidebarCV";
import CompactCV from "./themes/CompactCV";
import styles from "./CVPreview.module.css";

const cvData = {
  personalInfo,
  experience: experience.filter(e => e.company !== "Salesforce"),
  education,
  skillTags,
  achievements,
  certifications,
  projects,
  volunteer,
};

const themes = [
  {
    id: "classic",
    name: "Classic",
    tag: "Single Column",
    description: "Traditional black & green — clean, timeless",
    accent: "#2d6a4f",
    layout: "single",
    Component: ClassicCV,
  },
  {
    id: "modern",
    name: "Modern",
    tag: "Single Column",
    description: "Navy header with teal accents — contemporary",
    accent: "#0077b6",
    layout: "single",
    Component: ModernCV,
  },
  {
    id: "executive",
    name: "Executive",
    tag: "Single Column",
    description: "Centered gold & charcoal — premium executive",
    accent: "#b8860b",
    layout: "single",
    Component: ExecutiveCV,
  },
  {
    id: "sidebar",
    name: "Sidebar",
    tag: "Two Column",
    description: "Dark sidebar with skill bars — modern tech look",
    accent: "#1e3a5f",
    layout: "double",
    Component: SidebarCV,
  },
  {
    id: "compact",
    name: "Compact",
    tag: "Two Column",
    description: "Dark header, grid skills & projects — space-efficient",
    accent: "#c0392b",
    layout: "double",
    Component: CompactCV,
  },
];

function ThemeThumbnail({ layout, accent, active }) {
  if (layout === "double") {
    return (
      <div className={styles.thumbBox} style={{ borderColor: active ? accent : undefined }}>
        <div className={styles.thumbBar} style={{ backgroundColor: accent }} />
        <div className={styles.thumbTwoCols}>
          <div className={styles.thumbLeft}>
            <div className={styles.thumbLine} />
            <div className={styles.thumbLine} style={{ width: "80%" }} />
            <div className={styles.thumbLine} style={{ width: "60%" }} />
            <div className={styles.thumbLine} />
            <div className={styles.thumbLine} style={{ width: "70%" }} />
          </div>
          <div className={styles.thumbRight}>
            <div className={styles.thumbLine} />
            <div className={styles.thumbLine} style={{ width: "90%" }} />
            <div className={styles.thumbLine} style={{ width: "75%" }} />
            <div className={styles.thumbLine} />
            <div className={styles.thumbLine} style={{ width: "65%" }} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.thumbBox} style={{ borderColor: active ? accent : undefined }}>
      <div className={styles.thumbBar} style={{ backgroundColor: accent }} />
      <div className={styles.thumbLine} />
      <div className={styles.thumbLine} style={{ width: "70%" }} />
      <div className={styles.thumbLine} style={{ width: "85%" }} />
      <div className={styles.thumbBarThin} style={{ backgroundColor: accent, marginTop: 5 }} />
      <div className={styles.thumbLine} />
      <div className={styles.thumbLine} style={{ width: "60%" }} />
      <div className={styles.thumbLine} style={{ width: "80%" }} />
    </div>
  );
}

export default function CVPreview({ onClose }) {
  const [selected, setSelected] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const theme = themes[selected];
  const CVDoc = <theme.Component data={cvData} />;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>Download CV</h2>
              <p className={styles.subtitle}>Pick a theme, preview, and download your resume as PDF</p>
            </div>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          {/* Theme Selector */}
          <div className={styles.themeGrid}>
            {themes.map((t, i) => (
              <button
                key={t.id}
                className={`${styles.themeCard} ${selected === i ? styles.themeCardActive : ""}`}
                onClick={() => { setSelected(i); setShowPreview(false); }}
                style={{ "--theme-accent": t.accent }}
              >
                <ThemeThumbnail layout={t.layout} accent={t.accent} active={selected === i} />
                <div className={styles.themeInfo}>
                  <span className={styles.themeName}>{t.name}</span>
                  <span className={styles.themeTag} style={{ backgroundColor: selected === i ? t.accent : undefined }}>
                    {t.tag}
                  </span>
                </div>
                <span className={styles.themeDesc}>{t.description}</span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.previewBtn} onClick={() => setShowPreview(!showPreview)}>
              <Eye size={15} />
              {showPreview ? "Hide Preview" : "Preview PDF"}
            </button>

            <PDFDownloadLink
              document={CVDoc}
              fileName={`${personalInfo.name.replace(" ", "_")}_CV_${theme.name}.pdf`}
              className={styles.downloadBtn}
              style={{ "--theme-accent": theme.accent }}
            >
              {({ loading }) => (
                <>
                  <Download size={15} />
                  {loading ? "Preparing..." : `Download ${theme.name} CV`}
                </>
              )}
            </PDFDownloadLink>
          </div>

          {/* PDF Preview */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                className={styles.pdfViewer}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 540 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Suspense fallback={<div className={styles.loading}>Loading preview...</div>}>
                  <PDFViewer width="100%" height="100%" showToolbar={false}>
                    {CVDoc}
                  </PDFViewer>
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

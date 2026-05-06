import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Image as ImageIcon, ExternalLink, X, Download } from "lucide-react";
import { certificates } from "../../constants";
import { scaleIn } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Certificates.module.css";

export default function Certificates() {
  const [active, setActive] = useState(null);

  return (
    <section id="certificates" className="section-wrapper">
      <div className="container">
        <SectionTitle
          title="Certificates"
          subtitle="Verified credentials and program completions"
        />

        <div className={styles.grid}>
          {certificates.map((cert, i) => {
            const Icon = cert.type === "pdf" ? FileText : ImageIcon;
            const fileUrl = encodeURI(cert.file);
            return (
              <motion.div
                key={cert.title}
                className={`card ${styles.card}`}
                variants={scaleIn}
                custom={i * 0.05}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                onClick={() => setActive({ ...cert, fileUrl })}
              >
                <div className={styles.preview}>
                  {cert.type === "image" ? (
                    <img src={fileUrl} alt={cert.title} loading="lazy" />
                  ) : (
                    <object
                      data={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      type="application/pdf"
                      className={styles.pdfFrame}
                      aria-label={cert.title}
                    >
                      <div className={styles.pdfFallback}>
                        <FileText size={42} />
                        <span>PDF Preview</span>
                      </div>
                    </object>
                  )}
                  <div className={styles.overlay}>
                    <span className={styles.viewBtn}>
                      <ExternalLink size={14} /> View
                    </span>
                  </div>
                </div>

                <div className={styles.body}>
                  <div className={styles.iconWrap}>
                    <Icon size={16} />
                  </div>
                  <div className={styles.meta}>
                    <h3 className={styles.title}>{cert.title}</h3>
                    <p className={styles.issuer}>{cert.issuer}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className={styles.modalInner}
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHead}>
                <div>
                  <h3>{active.title}</h3>
                  <p>{active.issuer}</p>
                </div>
                <div className={styles.modalActions}>
                  <a
                    href={active.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.modalBtn}
                    aria-label="Open in new tab"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={active.fileUrl}
                    download
                    className={styles.modalBtn}
                    aria-label="Download"
                  >
                    <Download size={16} />
                  </a>
                  <button
                    onClick={() => setActive(null)}
                    className={styles.modalBtn}
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              <div className={styles.modalBody}>
                {active.type === "image" ? (
                  <img src={active.fileUrl} alt={active.title} />
                ) : (
                  <iframe
                    src={`${active.fileUrl}#view=FitH`}
                    title={active.title}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Reusable Framer Motion variants

export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay, ease: "backOut" },
  }),
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.6, rotate: -4 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1, rotate: 0,
    transition: { duration: 0.5, delay, ease: "backOut" },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const flipIn = {
  hidden: { opacity: 0, rotateX: 90 },
  visible: (delay = 0) => ({
    opacity: 1, rotateX: 0,
    transition: { duration: 0.6, delay, ease: "backOut" },
  }),
};

export const blurIn = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: (delay = 0) => ({
    opacity: 1, filter: "blur(0px)", y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

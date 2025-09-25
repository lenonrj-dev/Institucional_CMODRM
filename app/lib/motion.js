// lib/motion.js
export const fadeIn = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
};

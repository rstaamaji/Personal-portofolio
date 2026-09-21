// src/pages/WorkPage.jsx
import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import Projects from '../sections/Projects';
import Activities from '../sections/Activities';
import Credentials from '../sections/Credentials';
import Contact from '../sections/Contact';
import { scrollToTop, scrollHashIntoView } from '../utils/scroll';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

export default function WorkPage() {
  useLayoutEffect(() => {
    if (!window.location.hash) {
      scrollToTop(true);
    } else {
      scrollHashIntoView(window.location.hash);
    }
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="work-page-root"
    >
      <Projects />
      <Activities />
      <Credentials />
      <Contact />
    </motion.div>
  );
}

// src/pages/ProfilePage.jsx
import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Stack from '../sections/Stack';
import Experience from '../sections/Experience';
import Gallery from '../sections/Gallery';
import { scrollToTop, scrollHashIntoView } from '../utils/scroll';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

export default function ProfilePage() {
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
    >
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Gallery />

      {/* ── Page-end CTA: lead to /work ── */}
      <div className="page-end-cta">
        <div className="site-container page-end-cta-inner">
          <p className="mono-meta page-end-tag">// READY TO SEE THE WORK?</p>
          <h2 className="page-end-title">Explore projects, certifications &amp; activities.</h2>
          <Link to="/work" className="page-end-btn">
            <span>View my work</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

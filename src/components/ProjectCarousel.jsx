// src/components/ProjectCarousel.jsx
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { Github } from './Icons';
import MagneticButton from './MagneticButton';
import './ProjectCarousel.css';

/**
 * Mengubah path gambar dari portfolio.js menjadi URL yang benar.
 * - "/image/kesra-dashboard.png"  -> file di folder public/image/
 * - Kalau ada `base` di vite.config.js, BASE_URL otomatis ikut diterapkan.
 * - URL penuh (https://...) dibiarkan apa adanya.
 */
const resolveAsset = (path) => {
  if (!path) return null;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  const base = import.meta.env.BASE_URL || '/';
  return base + path.replace(/^\//, '');
};

export default function ProjectCarousel({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef(null);

  // Menyimpan id proyek yang gambarnya gagal dimuat (agar jatuh ke placeholder)
  const [failedImages, setFailedImages] = useState({});

  // Interactive 3D Tilt and Mouse Coordinates State
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    lightX: 50,
    lightY: 50,
  });

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleCardMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates -1 to 1
    const xNorm = (x / rect.width) * 2 - 1;
    const yNorm = (y / rect.height) * 2 - 1;

    // Subtle tilt: max 3.5 degrees
    const rotateY = xNorm * 3.5;
    const rotateX = -yNorm * 3.5;

    // Percentage for light sweep hotspot
    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`,
      lightX,
      lightY,
    });
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      lightX: 50,
      lightY: 50,
    });
  }, []);

  const handleImageError = useCallback((projectId) => {
    setFailedImages((prev) => ({ ...prev, [projectId]: true }));
  }, []);

  const activeProject = projects[currentIndex];

  // Tampilkan screenshot hanya jika field image ada dan file berhasil dimuat
  const hasImage = Boolean(activeProject.image) && !failedImages[activeProject.id];

  return (
    <div className="project-carousel-system">
      {/* Top Controls: Indicator Tabs & Next/Prev */}
      <div className="carousel-control-bar">
        <div className="carousel-indicators">
          {projects.map((p, idx) => {
            const isActive = idx === currentIndex;
            return (
              <motion.button
                key={p.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`indicator-tab ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to project ${p.title}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="indicator-active-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="indicator-number mono-meta">0{idx + 1}</span>
                <span className="indicator-title">{p.title}</span>
                {isActive && <span className="indicator-dot" />}
              </motion.button>
            );
          })}
        </div>

        <div className="carousel-arrow-buttons">
          <motion.button
            type="button"
            whileHover={{ scale: 1.08, x: -2 }}
            whileTap={{ scale: 0.92 }}
            className="carousel-nav-btn"
            onClick={prevProject}
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </motion.button>

          <div className="carousel-counter-badge mono-meta">
            <span className="counter-curr">0{currentIndex + 1}</span>
            <span className="counter-sep">//</span>
            <span className="counter-total">0{projects.length}</span>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.08, x: 2 }}
            whileTap={{ scale: 0.92 }}
            className="carousel-nav-btn"
            onClick={nextProject}
            aria-label="Next project"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>

      {/* Featured Large Active Project Card with 3D Tilt & Light Sweep */}
      <div className="featured-card-wrapper">
        <div
          className="featured-ambient-aura"
          aria-hidden="true"
        />

        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={{ transform: tiltStyle.transform }}
          className="featured-project-card has-corner-brackets"
        >
          {/* Dynamic Light Sweep Follower */}
          <div
            className="card-light-sweep"
            style={{
              background: `radial-gradient(circle 380px at ${tiltStyle.lightX}% ${tiltStyle.lightY}%, rgba(192, 132, 252, 0.16), transparent 80%)`,
            }}
            aria-hidden="true"
          />

          {/* AnimatePresence for Smooth Project Content Switching */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="featured-card-content"
            >
              {/* Top Technical Spec Banner */}
              <div className="project-spec-banner">
                <div className="spec-badge-group">
                  <span className="spec-index mono-meta">/{activeProject.index}</span>
                  <span className="spec-cat mono-meta">{activeProject.category}</span>
                </div>
                <div className="spec-label-mid mono-meta">
                  <span className="spec-pulse-dot" />
                  <span>PROJECT SPEC</span>
                </div>
                <div className="spec-role mono-meta">{activeProject.tag}</div>
              </div>

              {/* Main Content Layout */}
              <div className="project-card-grid">
                {/* Left Column: Interactive Visual System Mockup */}
                <div className="project-visual-col">
                  <div className={`project-mockup-frame ${hasImage ? 'has-image' : ''}`}>
                    <div className="mockup-header">
                      <div className="mockup-header-left">
                        <span className="mockup-dot" />
                        <span className="mono-meta">{activeProject.title.toUpperCase()} // SYS</span>
                      </div>
                      <span className="mockup-id-tag mono-meta">INDEX_{activeProject.index}</span>
                    </div>

                    <div className={`mockup-display ${hasImage ? 'has-image' : ''}`}>
                      {hasImage ? (
                        <>
                          {/* Screenshot proyek */}
                          <img
                            className="mockup-screenshot"
                            src={resolveAsset(activeProject.image)}
                            alt={activeProject.imageAlt || `Tampilan antarmuka ${activeProject.title}`}
                            loading="lazy"
                            draggable={false}
                            onError={() => handleImageError(activeProject.id)}
                          />
                          {/* Animated Radar Scan Line (tetap ada di atas screenshot) */}
                          <div className="mockup-scanline-beam" aria-hidden="true" />
                        </>
                      ) : (
                        <>
                          {/* Animated Radar Scan Line */}
                          <div className="mockup-scanline-beam" aria-hidden="true" />
                          <div className="mockup-cyber-lines" aria-hidden="true" />

                          <div className="mockup-center-badge">
                            <div className="mockup-badge-top">
                              <Terminal size={14} className="mockup-terminal-icon" />
                              <span className="mono-meta spec-highlight">SYSTEM WORKSPACE</span>
                            </div>
                            <h4 className="mockup-title">{activeProject.title}</h4>
                            <span className="mockup-sub">{activeProject.subtitle}</span>
                          </div>
                        </>
                      )}

                      <div className="mockup-footer-spec mono-meta">
                        <span>CONTEXT // {activeProject.tag}</span>
                        <span className="mockup-verified">STATUS: VERIFIED</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Editorial Details & Actions */}
                <div className="project-info-col">
                  <div className="project-title-row">
                    <h3 className="project-heading">{activeProject.title}</h3>
                  </div>

                  <p className="project-desc body-lead">{activeProject.description}</p>

                  {/* Technical Bullets */}
                  {activeProject.technicalDetails && (
                    <ul className="project-bullet-list">
                      {activeProject.technicalDetails.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 * idx, duration: 0.35 }}
                          className="project-bullet-item"
                        >
                          <span className="bullet-arrow">→</span>
                          <span className="bullet-text">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* Stack Tags */}
                  <div className="project-stack-wrap">
                    <span className="stack-label mono-meta">TECH STACK ARCHITECTURE:</span>
                    <div className="stack-pill-group">
                      {activeProject.stack.map((tech) => (
                        <span key={tech} className="tech-pill mono-meta">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="project-actions-row">
                    {activeProject.githubUrl && (
                      <MagneticButton
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        variant="secondary"
                        className="project-btn"
                      >
                        <Github size={16} />
                        <span>GitHub</span>
                      </MagneticButton>
                    )}

                    {activeProject.liveUrl ? (
                      <MagneticButton
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        variant="primary"
                        className="project-btn"
                      >
                        <span>View Live</span>
                        <ExternalLink size={16} />
                      </MagneticButton>
                    ) : (
                      <div className="live-pending-pill mono-meta" title="Deployment context documented in CV">
                        <ShieldCheck size={14} className="live-pending-icon" />
                        <span>CAMPUS / PRODUCTION DEPLOYMENT</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Surrounding / Adjacent Projects Strip (Makes all projects visible & selectable) */}
      <div className="adjacent-projects-section">
        <div className="adjacent-header">
          <span className="adjacent-tag mono-meta">// ALL WORKS IN THIS COLLECTION</span>
          <span className="adjacent-sub mono-meta">CLICK TO FOCUS PROJECT</span>
        </div>

        <div className="adjacent-grid">
          {projects.map((p, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <motion.div
                key={p.id}
                whileHover={{ y: -5, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentIndex(idx)}
                className={`adjacent-card ${isSelected ? 'is-selected' : ''}`}
              >
                <div className="adjacent-card-top">
                  <span className="adjacent-card-num mono-meta">[{p.index}]</span>
                  <span className="adjacent-card-cat mono-meta">{p.category.split('//')[0]}</span>
                </div>

                <h4 className="adjacent-card-title">{p.title}</h4>
                <p className="adjacent-card-sub body-muted">{p.subtitle}</p>

                <div className="adjacent-card-footer">
                  <span className="adjacent-tech-preview mono-meta">
                    {p.stack.slice(0, 2).join(' + ')}
                  </span>
                  <span className={`adjacent-select-cue mono-meta ${isSelected ? 'active-cue' : ''}`}>
                    {isSelected ? '● ACTIVE' : 'VIEW →'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
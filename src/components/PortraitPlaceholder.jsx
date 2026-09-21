// src/components/PortraitPlaceholder.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/portfolio';
import './PortraitPlaceholder.css';

export default function PortraitPlaceholder() {
  const { identity } = profileData;

  return (
    <div className="portrait-container">
      {/* Outer Rotating HUD Orbit Ring */}
      <div className="portrait-orbit-ring" aria-hidden="true" />
      <div className="portrait-orbit-ring portrait-orbit-ring--2" aria-hidden="true" />

      {/* Corner HUD Bracket Decorations */}
      <div className="portrait-corner portrait-corner--tl" aria-hidden="true" />
      <div className="portrait-corner portrait-corner--tr" aria-hidden="true" />
      <div className="portrait-corner portrait-corner--bl" aria-hidden="true" />
      <div className="portrait-corner portrait-corner--br" aria-hidden="true" />

      {/* Main Portrait Frame with Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="portrait-poly-wrapper"
      >
        <div className="portrait-poly-frame">
          {identity.image ? (
            <>
              {/* Real Photo */}
              <img
                src={identity.image}
                alt={identity.name}
                className="portrait-img"
                draggable="false"
              />
              {/* Subtle overlay to blend photo with dark theme */}
              <div className="portrait-photo-overlay" aria-hidden="true" />
              {/* Scanline effect over photo */}
              <div className="portrait-scanlines" aria-hidden="true" />
              {/* Bottom gradient fade */}
              <div className="portrait-bottom-gradient" aria-hidden="true" />
            </>
          ) : (
            /* Fallback Placeholder */
            <div className="portrait-placeholder-content">
              <div className="portrait-scanlines" aria-hidden="true" />
              <div className="portrait-cyber-grid" aria-hidden="true" />
              <div className="portrait-monogram">
                <span>{identity.monogram}</span>
              </div>
              <div className="portrait-badge">
                <span className="portrait-dot" />
                <span className="mono-meta">PORTRAIT // PENDING</span>
              </div>
              <div className="portrait-subtag">
                <span className="mono-meta">{identity.subRole}</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* HUD Top Label — Animated Fade-in */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0, ease: 'easeOut' }}
        className="portrait-hud-top mono-meta"
      >
        <span className="hud-bracket">[</span>
        <span className="hud-name">{identity.name}</span>
        <span className="hud-bracket">]</span>
      </motion.div>

      {/* Label "LOC // ..." dan "STATUS // ONLINE" sudah dihapus */}
    </div>
  );
}
// src/sections/Footer.jsx
import React from 'react';
import { ArrowUp } from 'lucide-react';
import { profileData } from '../data/portfolio';
import './Footer.css';

export default function Footer() {
  const { identity } = profileData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-system">
      <div className="site-container footer-inner">
        {/* Left: Brand info & Monogram */}
        <div className="footer-brand-block">
          <div className="footer-monogram">
            <span>{identity.monogram}</span>
          </div>
          <div className="footer-brand-text">
            <span className="footer-author">{identity.name}</span>
            <span className="footer-sub mono-meta">
              UNIVERSITAS SEBELAS MARET (UNS) // SURAKARTA, ID
            </span>
          </div>
        </div>

        {/* Center: Live Coordinates & System Status */}
        <div className="footer-telemetry mono-meta">
          <div className="telemetry-item">
            <span className="telemetry-dot" />
            <span>GEO // {identity.coordinates}</span>
          </div>
          <div className="telemetry-item">
            <span>SYS // CRAFTED WITH REACT 19 &amp; THREE.JS</span>
          </div>
        </div>

        {/* Right: Back to top button */}
        <div className="footer-actions">
          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span className="mono-meta">TOP</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <div className="site-container footer-copyright-bar mono-meta">
        <span>© {new Date().getFullYear()} {identity.name}. ALL RIGHTS RESERVED.</span>
        <span>SECURITY // VERIFIED ENCRYPTED WORKSPACE</span>
      </div>
    </footer>
  );
}

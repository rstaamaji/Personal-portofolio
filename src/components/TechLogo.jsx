// src/components/TechLogo.jsx
import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import './TechLogo.css';

/**
 * Returns the logo src URL for a given tech object.
 * Uses tech.logo if provided, otherwise resolves from /logos/{id}.svg.
 */
export function getLogoSrc(tech) {
  if (tech?.logo) return tech.logo;
  const base = import.meta.env.BASE_URL ?? '/';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  return `${cleanBase}logos/${tech.id}.svg`;
}

/**
 * TechLogo — renders the SVG logo for a technology card.
 * Falls back to a <Terminal> icon if the image fails to load.
 */
export default function TechLogo({ tech }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="tech-logo-box tech-logo-fallback" aria-hidden="true">
        <Terminal size={24} />
      </div>
    );
  }

  return (
    <div className="tech-logo-box" aria-hidden="true">
      <img
        src={getLogoSrc(tech)}
        alt=""
        className="tech-logo-img"
        onError={() => setErrored(true)}
        draggable="false"
      />
    </div>
  );
}
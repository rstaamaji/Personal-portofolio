// src/components/TechMarquee.jsx
import React, { useState } from 'react';
import { profileData } from '../data/portfolio';
import { getLogoSrc } from './TechLogo';
import './TechMarquee.css';

/**
 * TechMarquee — horizontally scrolling logo strip (right → left).
 * Renders the full tech list twice for seamless looping.
 * Pauses on hover. Falls back gracefully when images fail.
 */
export default function TechMarquee() {
  const allTech = profileData.techStack.technologies;
  const ariaLabel = allTech.map((t) => t.name).join(', ');

  return (
    <div
      className="marquee-wrapper"
      role="group"
      aria-label={`Logo teknologi: ${ariaLabel}`}
    >
      {/* Fade edges */}
      <div className="marquee-fade-left"  aria-hidden="true" />
      <div className="marquee-fade-right" aria-hidden="true" />

      <div className="marquee-track-outer">
        <div className="marquee-track">
          {/* Group 1 — real */}
          <MarqueeGroup items={allTech} />
          {/* Group 2 — clone for seamless loop */}
          <MarqueeGroup items={allTech} hidden />
        </div>
      </div>
    </div>
  );
}

function MarqueeGroup({ items, hidden = false }) {
  return (
    <div
      className="marquee-group"
      aria-hidden={hidden ? 'true' : undefined}
    >
      {items.map((tech) => (
        <MarqueeItem key={tech.id} tech={tech} />
      ))}
    </div>
  );
}

function MarqueeItem({ tech }) {
  const [errored, setErrored] = useState(false);

  if (errored) return null; // skip broken images silently

  return (
    <div className="marquee-item" title={tech.name}>
      <img
        src={getLogoSrc(tech)}
        alt={tech.name}
        className="marquee-logo"
        onError={() => setErrored(true)}
        draggable="false"
      />
    </div>
  );
}
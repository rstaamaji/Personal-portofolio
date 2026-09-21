// src/sections/Hero.jsx
import React from 'react';
import { ArrowRight, ExternalLink, Shield } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import { profileData } from '../data/portfolio';
import HeroScene from '../three/HeroScene';
import PortraitPlaceholder from '../components/PortraitPlaceholder';
import MagneticButton from '../components/MagneticButton';
import TrajectoryDivider from '../components/TrajectoryDivider';
import './Hero.css';

export default function Hero() {
  const { identity, hero } = profileData;

  return (
    <section id="hero" className="hero-section">
      {/* 3D Background Canvas */}
      <HeroScene />

      <div className="site-container hero-container">
        <div className="hero-grid">
          {/* Left / Center Column: Typography & CTAs */}
          <div className="hero-content">
            {/* Availability Pill */}
            <div className="hero-status-pill">
              <span className="status-pulse-dot" />
              <span className="mono-meta">{identity.statusText}</span>
              <span className="pill-separator">//</span>
              <span className="mono-meta pill-muted">{identity.city}</span>
            </div>

            {/* Massive Display Headline */}
            <h1 className="hero-headline display-title">
              <span>{hero.headline.line1}</span>
              <span className="hero-accent-line text-accent">
                {hero.headline.highlight}
              </span>
              <span>{hero.headline.line3}</span>
            </h1>

            {/* Supporting Introduction */}
            <p className="hero-bio body-lead">
              {hero.bio}
            </p>

            {/* CTAs */}
            <div className="hero-cta-group">
              <MagneticButton
                to="/work#projects"
                variant="primary"
                className="hero-primary-btn"
              >
                <span>View Projects</span>
                <ArrowRight size={18} className="cta-arrow" />
              </MagneticButton>

              <MagneticButton
                href={identity.linkedin}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                className="hero-secondary-btn"
              >
                <Linkedin size={16} />
                <span>LinkedIn Profile</span>
                <ExternalLink size={14} className="ext-icon" />
              </MagneticButton>

              <MagneticButton
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                className="hero-icon-btn"
                title="GitHub Profile"
              >
                <Github size={20} />
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Hexagonal Portrait Placeholder */}
          <div className="hero-portrait-col">
            <PortraitPlaceholder />
          </div>
        </div>

        {/* Hero Bottom Stats Bar */}
        <div className="hero-stats-bar">
          {hero.stats.map((stat) => (
            <div key={stat.id} className="hero-stat-item">
              <span className="hero-stat-value display-font">{stat.value}</span>
              <span className="hero-stat-label mono-meta">{stat.label}</span>
            </div>
          ))}
          <div className="hero-stat-item hero-stat-item--role">
            <span className="hero-stat-value display-font">FULL-STACK</span>
            <span className="hero-stat-label mono-meta">ENGINEER &amp; PM</span>
          </div>
        </div>
      </div>

      {/* Trajectory Divider connecting Hero to About */}
      <TrajectoryDivider sectionNumber="01" />
    </section>
  );
}

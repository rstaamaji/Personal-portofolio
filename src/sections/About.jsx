// src/sections/About.jsx
import React from 'react';
import { Award, Code2, Users, Building } from 'lucide-react';
import { profileData } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import SpecCodeWindow from '../components/SpecCodeWindow';
import './About.css';

export default function About() {
  const { about } = profileData;

  return (
    <section id="about" className="about-section section-spacing">
      <div className="site-container">
        <SectionHeader
          number={about.sectionNumber}
          tag={about.tag}
          title={about.title}
        />

        <div className="about-grid">
          {/* Left Column: Code Spec Window */}
          <div className="about-code-col">
            <SpecCodeWindow spec={about.codeSpec} />
          </div>

          {/* Right Column: Narrative & Key Highlights */}
          <div className="about-content-col">
            <div className="about-narrative-group">
              {about.narrative.map((paragraph, index) => (
                <p key={index} className="about-p body-lead">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Metric / Credibility Cards */}
            <div className="about-highlights-grid">
              <div className="about-hl-card">
                <div className="hl-icon-wrap">
                  <Building size={20} className="hl-icon" />
                </div>
                <div className="hl-text">
                  <span className="hl-value mono-meta">UNS SURAKARTA</span>
                  <span className="hl-label body-muted">D3 Informatics Engineering (2024 – Present)</span>
                </div>
              </div>

              <div className="about-hl-card">
                <div className="hl-icon-wrap">
                  <Users size={20} className="hl-icon" />
                </div>
                <div className="hl-text">
                  <span className="hl-value mono-meta">PROJECT MANAGER</span>
                  <span className="hl-label body-muted">Leading 5-Person Dev Team for Government Welfare</span>
                </div>
              </div>

              <div className="about-hl-card">
                <div className="hl-icon-wrap">
                  <Code2 size={20} className="hl-icon" />
                </div>
                <div className="hl-text">
                  <span className="hl-value mono-meta">FULL-STACK &amp; IOT</span>
                  <span className="hl-label body-muted">Vue 3, FastAPI, Midtrans, RFID &amp; ANPR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

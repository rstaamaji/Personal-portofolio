// src/sections/Contact.jsx
import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import { profileData } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import MagneticButton from '../components/MagneticButton';
import './Contact.css';

export default function Contact() {
  const { identity, contact } = profileData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(identity.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="contact-section section-spacing">
      <div className="site-container">
        <div className="contact-header-tag mono-meta">
          <span className="contact-num">[{contact.sectionNumber}]</span>
          <span>//</span>
          <span>{contact.tag}</span>
        </div>

        {/* Large Editorial Statement */}
        <div className="contact-statement-box">
          <h2 className="contact-statement display-title">
            <span>{contact.statement.line1}</span>
            <span className="contact-accent text-accent">
              {contact.statement.highlight}
            </span>
          </h2>
        </div>

        {/* Bottom Contact System Grid */}
        <div className="contact-layout-grid">
          {/* Left Column: Scope of Availability */}
          <div className="contact-avail-col">
            <span className="contact-sub-label mono-meta">AVAILABLE FOR:</span>
            <div className="contact-tags-list">
              {contact.availableFor.map((item, idx) => (
                <div key={idx} className="avail-tag-item">
                  <span className="avail-tag-dash">—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Direct Email Box & Socials */}
          <div className="contact-action-col">
            <span className="contact-sub-label mono-meta">DIRECT TRANSMISSION:</span>

            <div className="email-action-box has-corner-brackets">
              <div className="email-row">
                <Mail size={22} className="email-icon" />
                <a href={`mailto:${identity.email}`} className="email-address-text">
                  {identity.email}
                </a>
              </div>

              <div className="email-button-group">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="email-copy-btn"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                  <span className="mono-meta">{copied ? 'COPIED' : 'COPY'}</span>
                </button>

                <a
                  href={`mailto:${identity.email}`}
                  className="email-send-btn"
                  aria-label="Send email"
                >
                  <span className="mono-meta">SEND MAIL</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            {/* Social Connect Links */}
            <div className="social-links-row">
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                className="social-link-pill"
              >
                <Github size={16} />
                <span className="mono-meta">GITHUB</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href={identity.linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-link-pill"
              >
                <Linkedin size={16} />
                <span className="mono-meta">LINKEDIN</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

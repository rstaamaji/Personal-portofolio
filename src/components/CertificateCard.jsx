// src/components/CertificateCard.jsx
import React from 'react';
import { Award, CheckCircle2, ExternalLink } from 'lucide-react';
import './CertificateCard.css';

const resolveAsset = (path) => {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  const base = import.meta.env.BASE_URL || '/';
  return (base.endsWith('/') ? base : base + '/') + path.replace(/^\//, '');
};

export default function CertificateCard({ item, active = false }) {
  return (
    <div className={`cert-card ${active ? 'is-active' : ''}`}>
      <div className="cert-card-inner">
        {/* Certificate Header */}
        <div className="cert-header">
          <div className="cert-badge-row">
            <span className="cert-index mono-meta">[{item.index}]</span>
            <span className="cert-category mono-meta">{item.badge}</span>
          </div>
          <div className="cert-verified-pill mono-meta">
            <CheckCircle2 size={12} className="cert-verified-icon" />
            <span>{item.status}</span>
          </div>
        </div>

        {/* Certificate Visual Area */}
        <div className="cert-visual-frame">
          {item.image ? (
            <div className="cert-image-container">
              <img
                src={resolveAsset(item.image)}
                alt={item.title}
                className="cert-img"
                loading="lazy"
                draggable="false"
              />
              <div className="cert-scanlines" aria-hidden="true" />
            </div>
          ) : (
            <div className="cert-placeholder-content">
              <div className="cert-seal">
                <Award size={36} className="cert-seal-icon" />
              </div>
              <div className="cert-placeholder-text">
                <span className="mono-meta">CERTIFICATE IMAGE PENDING</span>
                <span className="cert-issuer-label">{item.issuer}</span>
              </div>
            </div>
          )}

          <div className="cert-frame-corner top-left" />
          <div className="cert-frame-corner top-right" />
          <div className="cert-frame-corner bottom-left" />
          <div className="cert-frame-corner bottom-right" />
        </div>

        {/* Certificate Content */}
        <div className="cert-content">
          <h3 className="cert-title">{item.title}</h3>
          <p className="cert-issuer mono-meta">ISSUED BY // {item.issuer}</p>
          <p className="cert-desc body-muted">{item.description}</p>
          
          {item.credentialUrl && (
            <a
              href={item.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-credential-link mono-meta"
            >
              <span>VIEW BADGE ON CREDLY</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

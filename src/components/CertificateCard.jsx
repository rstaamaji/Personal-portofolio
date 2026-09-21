// src/components/CertificateCard.jsx
import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import './CertificateCard.css';

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
          <div className="cert-seal">
            <Award size={36} className="cert-seal-icon" />
          </div>

          <div className="cert-placeholder-text">
            <span className="mono-meta">CERTIFICATE IMAGE PENDING</span>
            <span className="cert-issuer-label">{item.issuer}</span>
          </div>

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
        </div>
      </div>
    </div>
  );
}

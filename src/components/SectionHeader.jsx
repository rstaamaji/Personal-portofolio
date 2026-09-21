// src/components/SectionHeader.jsx
import React from 'react';
import './SectionHeader.css';

export default function SectionHeader({
  number,
  tag,
  title,
  subtitle,
  className = ''
}) {
  return (
    <div className={`section-header-block ${className}`}>
      <div className="section-header-top">
        <div className="section-number-tag mono-meta">
          <span className="sect-num">[{number}]</span>
          <span className="sect-slash">//</span>
          <span className="sect-tag">{tag}</span>
        </div>
        <div className="section-header-line" aria-hidden="true" />
      </div>

      <div className="section-header-content">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle body-lead">{subtitle}</p>}
      </div>
    </div>
  );
}

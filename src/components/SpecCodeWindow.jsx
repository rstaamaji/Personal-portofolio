// src/components/SpecCodeWindow.jsx
import React from 'react';
import './SpecCodeWindow.css';

export default function SpecCodeWindow({ spec }) {
  return (
    <div className="spec-window">
      <div className="spec-window-header">
        <div className="spec-traffic-lights">
          <span className="light light--red" />
          <span className="light light--yellow" />
          <span className="light light--green" />
        </div>
        <div className="spec-filename mono-meta">{spec.filename}</div>
        <div className="spec-badge mono-meta">TYPESCRIPT</div>
      </div>

      <div className="spec-window-body">
        <pre className="spec-code">
          <code>
            <div><span className="token-keyword">interface</span> <span className="token-type">SoftwareEngineer</span> &#123;</div>
            <div>  developer: <span className="token-string">"{spec.developer}"</span>;</div>
            <div>  role: <span className="token-string">"{spec.role}"</span>;</div>
            <div>  institution: <span className="token-string">"{spec.institution}"</span>;</div>
            <div>  degree: <span className="token-string">"{spec.degree}"</span>;</div>
            <div>  coreFocus: [</div>
            {spec.coreFocus.map((f, i) => (
              <div key={i}>    <span className="token-string">"{f}"</span>,</div>
            ))}
            <div>  ];</div>
            <div>  currentStatus: <span className="token-string">"{spec.currentStatus}"</span>;</div>
            <div>&#125;;</div>
          </code>
        </pre>
      </div>

      <div className="spec-window-footer mono-meta">
        <span>UTF-8</span>
        <span>LN 16, COL 2</span>
        <span className="spec-sync">SYNC // READY</span>
      </div>
    </div>
  );
}

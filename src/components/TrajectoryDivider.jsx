// src/components/TrajectoryDivider.jsx
import React from 'react';
import './TrajectoryDivider.css';

export default function TrajectoryDivider({ sectionNumber = "01" }) {
  return (
    <div className="trajectory-wrapper site-container" aria-hidden="true">
      <div className="trajectory-line-track">
        <div className="trajectory-node trajectory-node--left">
          <span className="trajectory-cross">+</span>
        </div>

        <div className="trajectory-node trajectory-node--hex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 21,7.5 21,16.5 12,22 3,16.5 3,7.5" stroke="#A855F7" strokeWidth="1.5" fill="rgba(168, 85, 247, 0.15)"/>
          </svg>
        </div>

        <div className="trajectory-node trajectory-node--pulse">
          <span className="trajectory-dot" />
        </div>

        {/* Dynamic Curved SVG Connector Trail */}
        <svg className="trajectory-svg-curve" viewBox="0 0 1000 60" preserveAspectRatio="none">
          <path
            d="M0,30 Q250,55 500,30 T1000,30"
            fill="none"
            stroke="rgba(168, 85, 247, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <circle cx="500" cy="30" r="4" fill="#C084FC">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>

        <div className="trajectory-node trajectory-node--square">
          <span className="trajectory-square" />
        </div>

        <div className="trajectory-node trajectory-node--right">
          <span className="trajectory-cross">+</span>
        </div>
      </div>
      
      <div className="trajectory-meta mono-meta">
        <span>TRAJECTORY // SECT_{sectionNumber}</span>
        <span>LAT: -7.6167 LON: 110.9500</span>
      </div>
    </div>
  );
}

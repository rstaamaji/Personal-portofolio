// src/components/ArchiveCard.jsx
import React from 'react';
import './ArchiveCard.css';

export default function ArchiveCard({ item }) {
  return (
    <div className="archive-card has-corner-brackets">
      <div className="archive-preview-box">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="archive-img"
            loading="lazy"
            draggable="false"
          />
        ) : null}
        <div className="archive-scanlines" aria-hidden="true" />
      </div>

      <div className="archive-body">
        <h3 className="archive-title">{item.title}</h3>
        <p className="archive-caption body-muted">{item.caption}</p>
      </div>
    </div>
  );
}

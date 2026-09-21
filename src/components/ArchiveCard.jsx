// src/components/ArchiveCard.jsx
import React from 'react';
import './ArchiveCard.css';

const resolveAsset = (path) => {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  const base = import.meta.env.BASE_URL || '/';
  return (base.endsWith('/') ? base : base + '/') + path.replace(/^\//, '');
};

export default function ArchiveCard({ item }) {
  return (
    <div className="archive-card has-corner-brackets">
      <div className="archive-preview-box">
        {item.image ? (
          <img
            src={resolveAsset(item.image)}
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

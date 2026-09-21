// src/sections/Gallery.jsx
import React from 'react';
import { profileData } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import ArchiveCard from '../components/ArchiveCard';
import './Gallery.css';

export default function Gallery() {
  const { gallery } = profileData;

  return (
    <section id="gallery" className="gallery-section section-spacing">
      <div className="site-container">
        <SectionHeader
          number={gallery.sectionNumber}
          tag={gallery.tag}
          title={gallery.title}
          subtitle={gallery.subtitle}
        />

        <div className="gallery-grid">
          {gallery.items.map((item) => (
            <ArchiveCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

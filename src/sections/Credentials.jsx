// src/sections/Credentials.jsx
import React from 'react';
import { profileData } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import CertificateCard from '../components/CertificateCard';
import './Credentials.css';

export default function Credentials() {
  const { certifications } = profileData;

  return (
    <section id="credentials" className="credentials-section section-spacing">
      <div className="site-container">
        <SectionHeader
          number={certifications.sectionNumber}
          tag={certifications.tag}
          title={certifications.title}
          subtitle={certifications.subtitle}
        />

        <div className="cert-grid">
          {certifications.items.map((cert) => (
            <CertificateCard key={cert.id} item={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}

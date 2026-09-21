// src/sections/Stack.jsx
import React, { useState } from 'react';
import { profileData } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import TechLogo from '../components/TechLogo';
import TechMarquee from '../components/TechMarquee';
import './Stack.css';

export default function Stack() {
  const { techStack } = profileData;
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTech =
    activeCategory === 'all'
      ? techStack.technologies
      : techStack.technologies.filter((t) => t.category === activeCategory);

  return (
    <section id="stack" className="stack-section section-spacing">
      <div className="site-container">
        <SectionHeader
          number={techStack.sectionNumber}
          tag={techStack.tag}
          title={techStack.title}
          subtitle={techStack.subtitle}
        />

        {/* Category Selector Tabs */}
        <div className="stack-category-tabs">
          {techStack.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`stack-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="mono-meta">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Technology Cards Grid */}
        <div className="tech-grid">
          {filteredTech.map((tech) => (
            <div key={tech.id} className="tech-card has-corner-brackets">
              <div className="tech-card-top">
                <TechLogo tech={tech} />
              </div>
              <div className="tech-card-body">
                <h3 className="tech-name">{tech.name}</h3>
                <span className="tech-role mono-meta">{tech.role}</span>
                <p className="tech-context body-muted">{tech.context}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scrolling logo marquee strip */}
        <TechMarquee />
      </div>
    </section>
  );
}

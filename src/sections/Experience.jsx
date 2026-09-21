// src/sections/Experience.jsx
import React from 'react';
import { Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { profileData } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import './Experience.css';

export default function Experience() {
  const { experience } = profileData;

  return (
    <section id="experience" className="experience-section section-spacing">
      <div className="site-container">
        <SectionHeader
          number={experience.sectionNumber}
          tag={experience.tag}
          title={experience.title}
          subtitle={experience.subtitle}
        />

        <div className="timeline-container">
          <div className="timeline-spine-line" aria-hidden="true" />

          <div className="timeline-list">
            {experience.items.map((item) => (
              <div key={item.id} className="timeline-item has-corner-brackets">
                <div className="timeline-marker-col">
                  <div className="timeline-node">
                    <span className="node-inner" />
                  </div>
                  <span className="timeline-index mono-meta">[{item.index}]</span>
                </div>

                <div className="timeline-content-card">
                  <div className="timeline-card-header">
                    <div className="timeline-badge-group">
                      <span className="exp-badge mono-meta">{item.badge}</span>
                      <div className="exp-period mono-meta">
                        <Calendar size={13} />
                        <span>{item.period}</span>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-card-body">
                    <h3 className="exp-role">{item.role}</h3>
                    <div className="exp-org-row">
                      <span className="exp-org">{item.organization}</span>
                      <span className="exp-dot-sep">·</span>
                      <span className="exp-context mono-meta">{item.context}</span>
                    </div>

                    <p className="exp-summary body-lead">{item.summary}</p>

                    <div className="exp-bullets">
                      {item.responsibilities.map((bullet, idx) => (
                        <div key={idx} className="exp-bullet-item">
                          <span className="exp-bullet-arrow">→</span>
                          <span className="body-muted">{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="exp-stack-chips">
                      {item.stack.map((tech) => (
                        <span key={tech} className="exp-tech-chip mono-meta">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

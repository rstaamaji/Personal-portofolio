// src/sections/Activities.jsx
import React from 'react';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { profileData } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import './Activities.css';

export default function Activities() {
  const { activities } = profileData;

  return (
    <section id="activities" className="activities-section section-spacing">
      <div className="site-container">
        <SectionHeader
          number={activities.sectionNumber}
          tag={activities.tag}
          title={activities.title}
          subtitle={activities.subtitle}
        />

        <div className="activities-list">
          {activities.items.map((act) => (
            <div key={act.id} className="activity-row has-corner-brackets">
              <div className="activity-year-col">
                <span className="activity-year display-font">{act.year}</span>
                <span className="activity-index mono-meta">[{act.index}]</span>
              </div>

              <div className="activity-content-col">
                <div className="activity-header">
                  <span className="activity-cat-pill mono-meta">{act.category}</span>
                  <span className="activity-org mono-meta">{act.organization}</span>
                </div>

                <h3 className="activity-title">{act.title}</h3>
                <p className="activity-desc body-muted">{act.description}</p>
              </div>

              <div className="activity-status-col">
                <span className="act-status-dot" />
                <span className="mono-meta act-status-text">RECORDED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

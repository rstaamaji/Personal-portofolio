// src/sections/Projects.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import ProjectCarousel from '../components/ProjectCarousel';
import './Projects.css';

export default function Projects() {
  const { projects } = profileData;

  return (
    <section id="projects" className="projects-section section-spacing">
      {/* Scoped Ambient Futuristic Background Elements */}
      <div className="projects-bg-ambient" aria-hidden="true">
        <div className="projects-glow-orb projects-glow-orb--top" />
        <div className="projects-glow-orb projects-glow-orb--bottom" />
        <div className="projects-grid-overlay" />
        
        {/* Constellation Nodes */}
        <div className="projects-constellation-node node-1" />
        <div className="projects-constellation-node node-2" />
        <div className="projects-constellation-node node-3" />
        <div className="projects-constellation-node node-4" />
      </div>

      <div className="site-container relative-container">
        {/* Scroll Entrance Animation on Header */}
        <motion.div
          initial={{ opacity: 0, y: 36, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            number={projects.sectionNumber}
            tag={projects.tag}
            title={projects.title}
            subtitle={projects.subtitle}
          />
        </motion.div>

        {/* Scroll Entrance Animation on Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProjectCarousel projects={projects.items} />
        </motion.div>
      </div>
    </section>
  );
}

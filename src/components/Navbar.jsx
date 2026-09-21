// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/portfolio';
import { PAGES, getPageByPath } from '../config/pages';
import { scrollToTop, scrollToTarget } from '../utils/scroll';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = getPageByPath(location.pathname);
  const currentSections = currentPage.sections || [];

  // Handle scroll detection and section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section spy for current page
      const sectionElements = currentSections.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 180;

      let found = false;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const sec = sectionElements[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(currentSections[i].id);
          found = true;
          break;
        }
      }
      if (!found || window.scrollY < 120) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, currentSections]);

  // Navigate or smooth scroll to section
  const handleSectionClick = (e, targetPath, sectionId) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname === targetPath) {
      scrollToTarget(`#${sectionId}`, -92);
      window.history.pushState(null, '', `${targetPath}#${sectionId}`);
    } else {
      navigate(`${targetPath}#${sectionId}`);
    }
  };

  // Brand click: scroll to top if already home, otherwise navigate to home
  const handleBrandClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToTop(false);
      window.history.pushState(null, '', '/');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-inner site-container">
        {/* Brand Block */}
        <Link to="/" className="navbar-brand" onClick={handleBrandClick}>
          <div className="brand-monogram">
            <span>{profileData.identity.monogram}</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">{profileData.identity.name}</span>
            <span className="brand-role mono-meta">{profileData.identity.subRole}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav" aria-label="Main Navigation">
          {/* Page Switcher Tabs */}
          <div className="nav-page-selector">
            {PAGES.map((page) => {
              const isCurrentPage = location.pathname === page.path;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className={`nav-page-btn ${isCurrentPage ? 'active' : ''}`}
                >
                  {isCurrentPage && <span className="nav-link-dot" />}
                  <span>{page.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="nav-divider-v" aria-hidden="true" />

          {/* Current Page Section Links */}
          <ul className="nav-list">
            {currentSections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <li key={section.id} className="nav-item">
                  <a
                    href={`${currentPage.path}#${section.id}`}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleSectionClick(e, currentPage.path, section.id)}
                  >
                    {isActive && <span className="nav-link-dot" />}
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Utility Block */}
        <div className="navbar-utilities">
          <div className="status-badge mono-meta" title="Based in Indonesia (GMT+7)">
            <span className="status-indicator-dot" />
            <span>ID</span>
          </div>

          <a
            href="/work#contact"
            className="nav-cta-btn"
            onClick={(e) => handleSectionClick(e, '/work', 'contact')}
          >
            <span>Contact</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {/* Page Switcher in Mobile Drawer */}
          <div className="mobile-page-switch">
            <span className="mobile-label mono-meta">// PAGE</span>
            <div className="mobile-page-buttons">
              {PAGES.map((page) => {
                const isCurrentPage = location.pathname === page.path;
                return (
                  <Link
                    key={page.path}
                    to={page.path}
                    className={`mobile-page-btn ${isCurrentPage ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {page.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sections of Current Page in Mobile Drawer */}
          <div className="mobile-sections-block">
            <span className="mobile-label mono-meta">// SECTIONS</span>
            <nav className="mobile-nav">
              {currentSections.map((section) => (
                <a
                  key={section.id}
                  href={`${currentPage.path}#${section.id}`}
                  className={`mobile-nav-link ${activeSection === section.id ? 'active' : ''}`}
                  onClick={(e) => handleSectionClick(e, currentPage.path, section.id)}
                >
                  <span>{section.label}</span>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Direct Contact CTA */}
          <div className="mobile-drawer-footer">
            <a
              href="/work#contact"
              className="mobile-contact-btn"
              onClick={(e) => handleSectionClick(e, '/work', 'contact')}
            >
              <span>Contact Rustam</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

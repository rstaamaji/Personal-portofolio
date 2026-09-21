// src/App.jsx
import React, { useEffect, lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import ProfilePage from './pages/ProfilePage';
import {
  registerLenis,
  unregisterLenis,
  scrollToTop,
  scrollHashIntoView,
} from './utils/scroll';
import './pages/pages.css';

const WorkPage = lazy(() => import('./pages/WorkPage'));

gsap.registerPlugin(ScrollTrigger);

// ─── Smooth scroll + GSAP sync ───────────────────────────────
function SmoothScrollProvider() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    registerLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const reqId = requestAnimationFrame(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
      unregisterLenis();
    };
  }, []);

  return null;
}

// ─── Centralized Scroll Manager for Route & Hash Changes ─────
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      scrollHashIntoView(hash, -92);
    } else {
      scrollToTop(true);
      // Double guarantee after DOM updates
      const rId = requestAnimationFrame(() => scrollToTop(true));
      const tId = setTimeout(() => scrollToTop(true), 60);
      return () => {
        cancelAnimationFrame(rId);
        clearTimeout(tId);
      };
    }
  }, [pathname, hash]);

  // Handle browser back / forward buttons
  useEffect(() => {
    const onPopState = () => {
      if (!window.location.hash) {
        scrollToTop(true);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return null;
}

// ─── Document title per route ─────────────────────────────────
function TitleManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title =
      pathname === '/work'
        ? 'Work | Rustam Aji'
        : 'Rustam Aji | Full-Stack Developer & Project Manager';
  }, [pathname]);

  return null;
}

// ─── Animated routes with exit & mount scroll guarantee ──────
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        // Exiting page has completely unmounted. Reset scroll if no hash.
        if (!window.location.hash) {
          scrollToTop(true);
        }
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ProfilePage />} />
        <Route
          path="/work"
          element={
            <Suspense
              fallback={
                <div
                  style={{
                    minHeight: '100vh',
                    background: 'var(--bg)',
                  }}
                />
              }
            >
              <WorkPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

// ─── Root App ─────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    // Preload WorkPage chunk so route transitions are instantaneous
    import('./pages/WorkPage');
  }, []);

  return (
    <BrowserRouter>
      <SmoothScrollProvider />
      <ScrollManager />
      <TitleManager />
      <div className="app-root">
        <Navbar />
        <main id="main-content">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

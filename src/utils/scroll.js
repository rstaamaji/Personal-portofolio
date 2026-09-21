// src/utils/scroll.js

// Active Lenis instance reference
let activeLenis = null;

export function registerLenis(lenis) {
  activeLenis = lenis;
}

export function unregisterLenis() {
  activeLenis = null;
}

export function getLenis() {
  return activeLenis;
}

/**
 * Resets scroll to top immediately and reliably.
 * Synchronizes native browser scroll (window, documentElement, body) and Lenis.
 */
export function scrollToTop(immediate = true) {
  if (typeof window === 'undefined') return;

  // 1. Native window & document reset
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: immediate ? 'instant' : 'smooth',
  });
  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
  }

  // 2. Sync Lenis if active
  if (activeLenis) {
    try {
      activeLenis.scrollTo(0, {
        immediate: immediate,
        force: true,
      });
    } catch {
      // ignore
    }
  }
}

/**
 * Scrolls to a target element or selector with fixed navbar offset.
 */
export function scrollToTarget(target, offset = -92, immediate = false) {
  if (typeof window === 'undefined') return;
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (activeLenis && !prefersReducedMotion && !immediate) {
    try {
      activeLenis.scrollTo(el, { offset, immediate: false, duration: 0.9 });
      return;
    } catch {
      // fallback to native
    }
  }

  el.scrollIntoView({
    behavior: prefersReducedMotion || immediate ? 'instant' : 'smooth',
    block: 'start',
  });
}

/**
 * Waits for a target hash element to appear in DOM, then scrolls to it.
 * Uses requestAnimationFrame polling up to maxDurationMs.
 */
export function scrollHashIntoView(hash, offset = -92, maxDurationMs = 1200) {
  if (!hash || typeof window === 'undefined') return;
  const id = hash.replace(/^#/, '');
  const startTime = performance.now();

  const check = () => {
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        scrollToTarget(el, offset);
      });
    } else if (performance.now() - startTime < maxDurationMs) {
      requestAnimationFrame(check);
    }
  };

  requestAnimationFrame(check);
}

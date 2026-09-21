// src/config/pages.js
// ─────────────────────────────────────────────────────────────
// Single source of truth for routing, navbar, and page layout.
// To move a section between pages, edit only this file.
// ─────────────────────────────────────────────────────────────

// Lazy-loaded page components (resolved by router, not here)
// Section components are resolved dynamically in page files.

export const PAGES = [
  {
    path: '/',
    label: 'Profile',
    docTitle: 'Rustam Aji | Full-Stack Developer & Project Manager',
    sections: [
      { id: 'about',      label: 'About'      },
      { id: 'stack',      label: 'Stack'       },
      { id: 'experience', label: 'Experience'  },
      { id: 'gallery',    label: 'Gallery'     },
    ],
  },
  {
    path: '/work',
    label: 'Work',
    docTitle: 'Work | Rustam Aji',
    sections: [
      { id: 'projects',    label: 'Projects'    },
      { id: 'activities',  label: 'Activities'  },
      { id: 'credentials', label: 'Credentials' },
      { id: 'contact',     label: 'Contact'     },
    ],
  },
];

/** Returns the page config for a given pathname (ignores hash). */
export function getPageByPath(pathname) {
  return PAGES.find((p) => p.path === pathname) ?? PAGES[0];
}

/** Returns the page that owns a given section id. */
export function getPageBySectionId(sectionId) {
  return PAGES.find((p) => p.sections.some((s) => s.id === sectionId));
}

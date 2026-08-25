# Rohit Ghosh - Portfolio

A modern, immersive portfolio website built with React 19, featuring a 3D hero scene, Apple-style scroll-driven animations, and a command palette for quick navigation.

## Tech Stack

- **Framework:** React 19 + Vite 8
- **3D:** Three.js / React Three Fiber / Drei
- **Animation:** Framer Motion (scroll-driven transforms) + Lenis (smooth scroll)
- **Styling:** CSS Modules, dark theme
- **PDF:** @react-pdf/renderer (lazy-loaded CV generator)
- **Testing:** Vitest + Testing Library + V8 coverage (>95% all metrics)
- **Quality:** ESLint (zero warnings), Husky + lint-staged pre-commit hooks

## Features

- Interactive 3D hero scene (icosahedron crystal + particle field)
- Continuous scroll-driven animations across every section
- Mouse-tracking tilt cards with 3D perspective transforms
- Command palette (Cmd+K) for quick-jumping to any section, project, or certificate
- Multi-theme CV generator with PDF preview and download
- GitHub contribution heatmap with auto-refresh
- Device capability detection with graceful 3D degradation
- Keyboard-navigable certificate modal viewer
- Fully responsive, accessible, reduced-motion aware

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm test` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:ci` | CI mode: tests + coverage + verbose |
| `npm run lint` | ESLint check |

## Project Structure

```
src/
  components/       # UI components (each with .jsx, .module.css, .test.jsx)
    Hero/            # Landing section with typed roles
    Hero3D/          # Three.js canvas, crystal mesh, particles
    About/           # Bio, stats, GitHub calendar
    Skills/          # Proficiency bars + tag cloud views
    Experience/      # Scroll-driven sticky timeline
    Education/       # Education + volunteer cards
    Projects/        # Featured/all project grid with filters
    Achievements/    # Recognition cards
    Certificates/    # Certificate grid with modal viewer
    Hobbies/         # Hobby cards with icon mapping
    Contact/         # Contact form + details + copy buttons
    Navbar/          # Animated nav with logo link toggle
    Footer/          # Social links + back-to-top
    CommandPalette/  # Cmd+K quick search
    CVPreview/       # Multi-theme PDF generator
    SmoothScroll/    # Lenis smooth scroll wrapper
    ScrollProgress/  # Top progress bar
    SectionTitle/    # Shared section header
    SocialLinks/     # GitHub/LinkedIn/LeetCode links
    TiltCard/        # Shared mouse-tracking 3D tilt card
    Toast/           # Copy confirmation toast
  constants/         # All portfolio data (personal, projects, skills, etc.)
  hooks/             # useDeviceCapability, useScrollSection, animations
  styles/            # Global CSS, variables, utilities
  test/              # Test setup and mocks
```

## Testing

310 tests across 36 test files with >95% coverage on all metrics (statements, branches, functions, lines).

```bash
npm run test:coverage
```

## Pre-commit Hooks

Commits are gated by Husky + lint-staged:

1. **ESLint** runs on staged `.js`/`.jsx` files with `--max-warnings=0`
2. **Vitest** runs the full test suite with coverage thresholds

A commit is blocked if either lint errors or coverage drops below 95%.

## Customization

All portfolio content lives in `src/constants/`. Edit these files to customize:

- `personal.js` - Name, contact, bio, social links, typed roles
- `skills.js` - Skill categories, proficiency levels, tag groups
- `experience.js` - Work history
- `education.js` - Education + volunteer entries
- `projects.js` - Project cards
- `achievements.js` - Achievement entries
- `certificates.js` - Certificate entries + categories
- `hobbies.js` - Hobby cards
- `navigation.js` - Nav link order

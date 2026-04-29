# FSuits - Financial Tools Calculator

A professional financial calculator web application built with Next.js, TypeScript, and custom CSS.

## Project Overview

FSuits is a modern financial tools suite designed to help users understand investment growth and make informed financial decisions. The application features a clean, professional UI with a responsive sidebar navigation and professional financial calculators.

**Live Demo:** https://johndoe2x.github.io/Fsuits/

## Technology Stack

- **Framework:** Next.js 16.2.4
- **Language:** TypeScript 5
- **Styling:** Custom CSS (no Tailwind - works better with static export)
- **Deployment:** GitHub Pages + GitHub Actions
- **Node Version:** 20+
- **Package Manager:** npm

## Features

### Current Tools
1. **Rule of 72 Calculator** - Estimate investment doubling time
   - Adjustable annual return rate (0.1% - 50%)
   - Dynamic calculation of years to double
   - Visual result cards with gradient backgrounds
   - Formula explanation
   - Currency: Indian Rupee (₹)

### Planned Tools
- Compound Interest Calculator
- Investment Return Tracker
- More financial calculators

## Project Structure

```
Fsuits/
├── app/
│   ├── layout.tsx           # Root layout with sidebar
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global custom CSS
│   ├── rule-of-72/
│   │   └── page.tsx        # Rule of 72 calculator
│   └── favicon.ico
├── components/
│   └── Sidebar.tsx         # Navigation sidebar component
├── public/                 # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
├── next.config.ts          # Next.js configuration (with basePath: "/Fsuits")
├── postcss.config.mjs       # PostCSS config
├── package.json
├── tsconfig.json
├── CLAUDE.md              # This file
└── README.md
```

## Development

### Setup
```bash
npm install
```

### Run Local Dev Server
```bash
npm run dev
```
Then visit: http://localhost:3000/Fsuits/

### Build for Production
```bash
npm run build
```

### Deploy
Push to main branch - GitHub Actions automatically builds and deploys to GitHub Pages.

## Design Decisions

1. **Custom CSS over Tailwind:** Initially used Tailwind CSS but switched to custom CSS for better compatibility with Next.js static export. Tailwind compilation issues were resolved by writing plain CSS.

2. **Static Export:** Using `output: "export"` in next.config.ts for GitHub Pages compatibility. This generates a pure static site without server-side rendering.

3. **BasePath Configuration:** Set `basePath: "/Fsuits"` in Next.js config to ensure all assets (CSS, JS, images) load correctly from the `/Fsuits/` subdirectory on GitHub Pages.

4. **Currency:** Using Indian Rupee (₹) instead of USD. All number formatting uses `en-IN` locale.

5. **Sidebar Navigation:** Client-side navigation with active state detection using `usePathname()` hook.

## Key Files & Their Purpose

- **app/globals.css** - All custom CSS styling (450+ lines)
  - Sidebar styling
  - Card components
  - Form inputs
  - Result cards with gradients
  - Responsive layout

- **components/Sidebar.tsx** - Navigation sidebar
  - Displays menu items
  - Active link highlighting
  - Disabled state for coming-soon features

- **app/rule-of-72/page.tsx** - Calculator implementation
  - Uses React hooks (useState, useEffect)
  - Real-time calculations
  - Gradient result cards (blue & green)
  - Form inputs with range slider

- **next.config.ts** - Next.js configuration
  - Static export configuration
  - BasePath set to "/Fsuits"
  - Image optimization disabled

## Session Summary (April 29, 2026)

### What Was Built
1. ✅ Created new Next.js 16 project with TypeScript
2. ✅ Built professional sidebar navigation
3. ✅ Implemented Rule of 72 Calculator with full functionality
4. ✅ Designed professional, minimal UI with custom CSS
5. ✅ Set up GitHub Pages deployment with GitHub Actions
6. ✅ Fixed CSS compilation and deployment issues
7. ✅ Changed currency to INR (₹)
8. ✅ Improved sidebar visibility and styling

### Issues Encountered & Resolved
| Issue | Solution |
|-------|----------|
| npm naming restrictions (capital letters) | Created project as lowercase, then moved to proper folder |
| Deprecated GitHub Actions | Updated to latest action versions (v3, v4) |
| CSS not loading | Added basePath configuration for GitHub Pages |
| Tailwind CSS compilation issues | Switched to custom CSS for better static export compatibility |
| Sidebar text too faint | Darkened text colors and improved contrast |

### Deployment
- **Repository:** https://github.com/johndoe2x/Fsuits
- **Live Site:** https://johndoe2x.github.io/Fsuits/
- **CI/CD:** GitHub Actions (auto-deploy on push to main)

## Future Enhancements

1. Add Compound Interest calculator
2. Add Investment Return tracker
3. Add chart/graph visualizations
4. Add more financial formulas
5. Add dark mode toggle
6. Add export/save calculation results
7. Add historical calculation tracking
8. Responsive mobile design improvements
9. Add more currency options
10. Add educational content/tutorials

## Git Workflow

All changes tracked with clear commit messages:
- Initial project setup
- Design iterations
- CSS and styling fixes
- Currency changes
- Deployment configuration fixes

View commit history: `git log`

## Running Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Check for lint errors
npm run lint

# View git history
git log --oneline
```

## Notes for Future Development

1. The sidebar is fixed-width (16rem) - consider responsive design for mobile
2. Calculator pages use `"use client"` directive for interactivity
3. CSS uses custom variables for colors (easily changeable)
4. All components are functional components with React hooks
5. No external UI libraries - pure React + CSS
6. Static export means no dynamic routes or API calls possible

## Contact & Info
- **Created:** April 29, 2026
- **Last Updated:** April 29, 2026
- **Developer:** Shaan (jrsolutionsceo@gmail.com)
- **Repository:** https://github.com/johndoe2x/Fsuits

---

**Status:** ✅ Production Ready - Rule of 72 Calculator fully functional and deployed to GitHub Pages.

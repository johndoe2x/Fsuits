# FSuits - Financial Tools

Next.js 16 + TypeScript + Tailwind CSS financial calculator suite.

## Project Setup

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages (via GitHub Actions)

## Features

- **Sidebar Navigation**: Quick access to all tools
- **Rule of 72 Calculator**: Estimate investment doubling time
- **Extensible**: Easy to add more financial tools

## Development

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build for production
```

## GitHub Pages Deployment

1. Push to `main` branch
2. GitHub Actions automatically builds and deploys to `{repo-name}.github.io`
3. No additional configuration needed

## File Structure

```
app/
├── layout.tsx           # Root layout with sidebar
├── page.tsx            # Home page
├── rule-of-72/
│   └── page.tsx        # Rule of 72 calculator
└── globals.css         # Global styles

components/
└── Sidebar.tsx         # Navigation sidebar
```

## Adding New Tools

1. Create new folder in `app/` (e.g., `app/compound-interest/`)
2. Add `page.tsx` in that folder
3. Update `Sidebar.tsx` menu items
4. Implement calculation logic with "use client" directive

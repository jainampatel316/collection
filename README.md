# Oryn / Kova frontend

A React and TypeScript frontend powered by Vite and styled with the Oryn / Kova design system.

## Project guidance

- [ORYN_README.md](./ORYN_README.md) describes the product vision, current implementation status, and planned architecture.
- [ORYN_INSTRUCTIONS.md](./ORYN_INSTRUCTIONS.md) contains the project's design and implementation rules.
- [src/styles/oryn-design-system.css](./src/styles/oryn-design-system.css) is the visual-token and component-style source of truth.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Get started

```sh
npm install
npm run dev
```

Vite prints the local URL when the development server starts.

## Available commands

```sh
npm run dev      # Start the development server with hot reload
npm run build    # Type-check and create a production build in dist/
npm run preview  # Preview the production build locally
```

The application entry point is `src/main.tsx`; edit `src/App.tsx` to build the UI.
The first page is a sample library preview. Search, filters, and saved URLs run in the browser session; persistent storage and semantic search are not connected yet.

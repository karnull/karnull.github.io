# karsh.page

Personal site, built with React, Vite and Tailwind CSS 4.

## Building

```bash
npm ci
npm run build
```

The built site lands in `dist/`. Use `npm run dev` for a local server while
working on it.

Tailwind is configured in `src/index.css`; there is no separate Tailwind config
file.

## Projects page

The projects page lists repositories on `github.com/karnull` only, and links to
the `karshosphere` organisation for everything else. Entries live in
`src/pages/Codebase.tsx`.

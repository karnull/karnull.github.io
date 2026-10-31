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

## Dependency updates

Renovate keeps dependencies current and is set to group every update, majors
included, into a single pull request, opened before 6am on Sundays (Melbourne time). An
open pull request is not touched outside that window. Security fixes ignore the
schedule. See `renovate.json`.

Renovate updates lockfiles with npm 11, because npm 12 refuses to install
Tailwind 4's wasm engine package. TypeScript is held below 7 until
`typescript-eslint` supports it.

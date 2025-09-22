# Quick Notes — Ocean Professional (Vue 3 + Vite)

A minimalist notes app frontend allowing users to create, read, update, and delete personal notes.
Styled with the Ocean Professional theme (blue & amber accents, subtle gradients, rounded corners, and soft shadows).
Notes persist locally via localStorage.

## Tech
- Vue 3, TypeScript
- Pinia (state)
- Vue Router
- Vite

## Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

Open the served URL and start capturing your ideas.

### Build

```sh
npm run build
```

### Lint

```sh
npm run lint
```

## Notes
- No backend required; data persists in localStorage (`notes_app_v1`).
- Layout:
  - Sidebar: search, new note, list with favorites prioritization
  - Main: note title and actions toolbar, note content editor with autosave
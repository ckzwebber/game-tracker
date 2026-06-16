# game-tracker

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Personal game catalog tracking hours played, campaign progress, ratings, and notes. Cover images are served directly from the Steam CDN via `appid` — no asset hosting required.

Demo: [webbergametracker.netlify.app](https://webbergametracker.netlify.app/)

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Data model

The game list is static, defined in `src/data/games.json` with types in `src/types/game.ts`. Adding a game means editing the JSON.

Each entry includes:

| Field | Type |
|-------|------|
| `id`, `appid`, `title`, `platform` | identifiers |
| `hoursPlayed`, `mainStoryProgress`, `rating` | progress |
| `status` | `playing` \| `completed` \| `dropped` |
| `tags`, `notes` | optional metadata |

## Setup

```bash
pnpm install
pnpm dev
```

## License

MIT

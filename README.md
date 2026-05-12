# GameTracker

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Catálogo pessoal de jogos com horas jogadas, progresso da campanha, avaliação e notas. Imagens servidas direto da Steam CDN via `appid`.

Demo: [webbergametracker.netlify.app](https://webbergametracker.netlify.app/)

## Visão geral

Projeto pessoal com foco em design de interface, motion e tipografia. A lista de jogos é estática, definida em `src/data/games.json`, com schema tipado em `src/types/game.ts`. Adicionar um jogo novo é editar o JSON.

## Tecnologias

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Estrutura de dados

Cada jogo é definido por:

- `id`, `appid`, `title`, `platform`
- `hoursPlayed`, `mainStoryProgress`, `rating`
- `status`: `jogando` | `concluido` | `largado`
- `tags`, `notes` (opcional)

As imagens (capsule, hero, logo) são derivadas do `appid` apontando para a Steam CDN, sem necessidade de hospedar assets.

## Rodando localmente

```bash
pnpm install
pnpm dev
```

## Licença

MIT

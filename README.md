# Podthem

A premium, immersive podcast landing page inspired by luxury editorial layouts (Savor). Built with **React**, **Vite**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **shadcn/ui** patterns.

## Features

- **Curved Mask Hero Reveal** — Cinematic video hero with a cream SVG mask that slides upward on scroll, revealing main content through a smooth concave arc
- **Episode Waterfall** — Asymmetric, staggered media stream with parallax cards and lens-blur text sync on the left
- **Scroll-Illuminated Manifesto** — Word-by-word typography that lights up as you scroll
- **Revealing Footer** — Giant wordmark characters mask up with a spring bounce

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Customizing Episodes

Edit `src/data/episodes.ts`. Each episode uses this shape:

```ts
{
  id: string
  episodeNumber: number
  title: string
  description: string
  audioUrl: string
  imageUrl: string
}
```

Swap `PODCAST_NAME`, `MANIFESTO_TEXT`, and the hero video URL in `src/components/HeroReveal.tsx` to match your brand.

## Project Structure

```
src/
├── components/
│   ├── HeroReveal.tsx       # Curved mask hero
│   ├── EpisodeWaterfall.tsx # Asymmetric episode stream
│   ├── ManifestoSection.tsx # Scroll-illuminated text
│   ├── RevealingFooter.tsx  # Spring wordmark footer
│   └── ui/                  # shadcn-style primitives
├── data/episodes.ts         # Episode content array
├── pages/
│   ├── Home.tsx
│   └── EpisodePage.tsx
└── types/episode.ts
```

## Build

```bash
npm run build
npm run preview
```

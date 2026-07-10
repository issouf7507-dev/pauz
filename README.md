# PAUZ — Site web

Landing page animée + système QR/lots pour **PAUZ**, eau de coco 100% naturelle livrée à Abidjan.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **GSAP** (+ ScrollTrigger) — flottement canette, parallaxe, brillance des lots
- **Framer Motion** — apparitions au scroll, micro-interactions, boutons
- **React Router** — routing SPA
- **pnpm** — gestion des paquets

## Démarrage

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # build de production (tsc + vite)
pnpm preview    # prévisualise le build
```

## Structure

```
src/
  main.tsx              # entrée + RouterProvider
  router.tsx            # routes: / /scan/:code /commander /merci /admin
  data/site.ts          # packs, lots, quartiers, contact (à éditer)
  lib/
    gsap.ts             # enregistre ScrollTrigger
    useGsap.ts          # hook gsap.context (cleanup auto, reduced-motion)
    whatsapp.ts         # liens wa.me + messages pré-remplis
  styles/global.css     # design tokens PAUZ + reset
  components/
    layout/  Header, Footer
    landing/ Hero, Product, ScanWin, Prizes, Order (+ sections.css)
    effects/ DropsCanvas (particules), CocoCan (canette SVG)
    ui/      Button, Reveal
  pages/                # HomePage (landing) + stubs Scan/Commander/Merci/Admin
```

## Design tokens (cf. cahier des charges)

- Fond `#0D2B0F` · Accent `#4CAF50` · Texte `#FFFFFF`
- Ambiance sombre / premium / tropical · mobile-first
- `prefers-reduced-motion` respecté (animations désactivées)

## À configurer avant mise en ligne

Dans `src/data/site.ts` :
- `BRAND.whatsapp` — numéro WhatsApp Business réel (actuellement placeholder `2250700000000`)
- `BRAND.socials` — URLs TikTok / Instagram / Facebook / WhatsApp
- `PACKS`, `PRIZES`, `QUARTIERS` — contenus réels

## État

- ✅ Landing page complète et animée (Hero, Produit, Scanner, Lots, Commander, Footer)
- 🚧 Pages `/scan/:code`, `/commander`, `/merci`, `/admin` : stubs à développer
- 🚧 Backend (tirage QR, commandes, WhatsApp auto) : non inclus — le CDC prévoyait Supabase/API

> Note stack : le cahier des charges suggérait Next.js ; le choix retenu est **Vite + React** (SPA)
> conformément à la demande. Les routes dynamiques (`/scan/:code`) et le SEO/OG devront en tenir
> compte (pré-rendu ou migration si besoin de SSR).

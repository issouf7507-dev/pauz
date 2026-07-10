/** Données métier PAUZ — centralisées pour édition facile (cf. admin plus tard). */

export const BRAND = {
  name: 'PAUZ',
  slogan: 'La fraîcheur, simplement.',
  baseline: '100% Eau de Coco · Naturelle · Livrée à Abidjan',
  // Numéro WhatsApp Business (format international, sans +, sans espaces)
  whatsapp: '2250700000000',
  socials: {
    tiktok: 'https://www.tiktok.com/@pauz',
    instagram: 'https://www.instagram.com/pauz',
    facebook: 'https://www.facebook.com/pauz',
    whatsapp: 'https://wa.me/2250700000000',
  },
} as const

export interface Pack {
  id: 'solo' | 'pack6' | 'pack12' | 'carton24'
  name: string
  units: number
  price: number // FCFA
  target: string
  popular?: boolean
}

export const PACKS: Pack[] = [
  { id: 'solo', name: 'Solo', units: 1, price: 500, target: 'Découverte, impulse' },
  { id: 'pack6', name: 'Pack 6', units: 6, price: 2500, target: 'Usage personnel régulier', popular: true },
  { id: 'pack12', name: 'Pack 12', units: 12, price: 4500, target: 'Famille, semaine' },
  { id: 'carton24', name: 'Carton 24', units: 24, price: 8000, target: 'Revendeur, pro, grande famille' },
]

export interface Prize {
  icon: string
  name: string
}

export const PRIZES: Prize[] = [
  { icon: '🥥', name: 'Pack 6 offert' },
  { icon: '🎽', name: 'T-shirt PAUZ' },
  { icon: '🧢', name: 'Casquette édition limitée' },
  { icon: '🎁', name: 'Carton 24 gratuit' },
  { icon: '🎧', name: 'Écouteurs sans fil' },
  { icon: '💳', name: 'Bon d’achat 5 000 F' },
  { icon: '🥤', name: 'Gourde isotherme' },
  { icon: '🏝️', name: 'Surprise du mois' },
]

export const PRODUCT_ARGS = [
  { icon: '💧', title: 'Ultra Hydratant', text: 'Riche en électrolytes naturels pour une hydratation immédiate.' },
  { icon: '🌿', title: 'Zéro Additif', text: '100% eau de coco pure. Aucun sucre ajouté, aucun conservateur.' },
  { icon: '⚡', title: 'Énergie Naturelle', text: 'Un boost sain et léger, sans coup de barre.' },
]

export const SCAN_STEPS = [
  { n: 1, icon: '📱', title: 'Scanne le QR de ta canette', text: 'Chaque canette a un code unique.' },
  { n: 2, icon: '🎡', title: 'Joue et gagne en 60 secondes', text: 'Roue de fortune, gains immédiats.' },
  { n: 3, icon: '💬', title: 'Reçois ton gain sur WhatsApp', text: 'Et rejoins la Famille PAUZ.' },
]

/** Bandeau de stats sous le hero immersif (maquette 1b). */
export const HERO_STATS: { value: string; label: string; gold?: boolean }[] = [
  { value: '100%', label: 'Naturel, sans sucre ajouté' },
  { value: '330ml', label: 'Canette premium' },
  { value: '24h', label: 'Livraison Grand Abidjan' },
  { value: '1 QR', label: '= 1 chance de gagner', gold: true },
]

/** Texte défilant du bandeau marquee (maquette). */
export const MARQUEE_ITEMS = [
  '100% NATUREL',
  'SCANNE & GAGNE',
  'LIVRÉ À ABIDJAN',
  'ÉLECTROLYTES NATURELS',
] as const

/**
 * Segments de la roue de fortune (écran Scan & Jeu, maquette 1d).
 * `tone` pilote la couleur du secteur ; ordre = sens horaire depuis le haut.
 */
export type WheelTone = 'green' | 'dark' | 'gold'
export interface WheelSegment {
  label: string
  tone: WheelTone
  win: boolean
}
export const WHEEL_SEGMENTS: WheelSegment[] = [
  { label: '+1 CAN', tone: 'dark', win: true },
  { label: '50 PTS', tone: 'green', win: true },
  { label: 'REJOUE', tone: 'dark', win: false },
  { label: 'PACK 6', tone: 'gold', win: true },
  { label: '20 PTS', tone: 'dark', win: true },
  { label: 'T-SHIRT', tone: 'green', win: true },
  { label: '100 PTS', tone: 'dark', win: true },
  { label: '1 MOIS', tone: 'green', win: true },
]

/** Témoignages clients (section Testimonials, maquette lessestudio). */
export interface Testimonial {
  quote: string
  name: string
  role: string
}
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "« J'ai commandé un Pack 6 le matin, livré à Cocody avant midi. Fraîche, pas sucrée, exactement ce que je cherchais. En scannant ma canette j'ai gagné un t-shirt — mes enfants étaient trop contents. On est clients pour de bon. »",
    name: 'Awa K.',
    role: 'Cliente, Cocody',
  },
  {
    quote:
      "« Enfin une eau de coco locale au goût vraiment naturel. Le service WhatsApp est ultra simple et rapide. »",
    name: 'Yann T.',
    role: 'Client, Marcory',
  },
]

/** Actualités / promos (section Latest News, maquette lessestudio). */
export interface NewsItem {
  title: string
  date: string
  image: string
}
export const NEWS: NewsItem[] = [
  { title: 'De nouveaux gagnants chaque semaine', date: 'Cette semaine', image: '/img/news-1.png' },
  { title: 'Rejoins la Famille PAUZ sur WhatsApp', date: 'Toujours ouvert', image: '/img/news-2.png' },
]

/** Grandes lignes « Comment ça marche » (section Latest Work, maquette lessestudio). */
export const WORK_STEPS: { n: string; title: string; text: string; image: string; metaK: string; metaV: string }[] = [
  {
    n: '01',
    title: 'Scanne le QR de ta canette',
    text: 'Chaque canette PAUZ porte un code unique. Ouvre l’appareil photo de ton téléphone, vise le QR — pas d’app à installer.',
    image: '/img/work-1.png',
    metaK: 'Étape',
    metaV: '10 SECONDES',
  },
  {
    n: '02',
    title: 'Joue et gagne en 60 secondes',
    text: 'La roue de la fortune se lance. Lots immédiats, surprises garanties : canettes offertes, t-shirts, casquettes, bons d’achat…',
    image: '/img/work-2.png',
    metaK: 'Canal',
    metaV: 'ROUE DE LA FORTUNE',
  },
  {
    n: '03',
    title: 'Reçois ton gain sur WhatsApp',
    text: 'Ton lot arrive directement dans la conversation WhatsApp PAUZ. Tu rejoins la Famille PAUZ et tu recommandes en un clic.',
    image: '/img/work-3.png',
    metaK: 'Récompense',
    metaV: 'IMMÉDIATE',
  },
]

/** Communes d'Abidjan couvertes par la livraison. */
export const QUARTIERS = [
  'Cocody',
  'Plateau',
  'Marcory',
  'Treichville',
  'Yopougon',
  'Abobo',
  'Adjamé',
  'Koumassi',
  'Port-Bouët',
  'Attécoubé',
  'Bingerville',
  'Songon',
] as const

export const fcfa = (n: number) => `${n.toLocaleString('fr-FR')} FCFA`

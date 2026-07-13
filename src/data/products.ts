export type Drink = {
  id: string
  name: string
  flavor: string
  price: string
  body: string
  cap: string
  /** tile theme */
  tileBg: string
  tileText: string
}

export type Gummy = {
  id: string
  name: string
  mood: string
  price: string
  body: string
  accent: string
  tileBg: string
  tileText: string
}

export const drinks: Drink[] = [
  { id: 'd1', name: 'Tropical Tangerine', flavor: 'Citrus + Ginger', price: '$4.50', body: '#c5dd7f', cap: '#9ec27a', tileBg: '#fbf6ed', tileText: '#1b5e20' },
  { id: 'd2', name: 'Lush Cherry', flavor: 'Dark Cherry', price: '$4.50', body: '#4a9a4e', cap: '#2e7d32', tileBg: '#1b5e20', tileText: '#fbf6ed' },
  { id: 'd3', name: 'Wild Berries', flavor: 'Mixed Berry', price: '$4.50', body: '#2e7d32', cap: '#1b5e20', tileBg: '#2e7d32', tileText: '#f0e9d6' },
  { id: 'd4', name: 'Ruby Orange', flavor: 'Blood Orange', price: '$4.50', body: '#6b9c4f', cap: '#4a7a34', tileBg: '#123018', tileText: '#c5dd7f' },
]

export const gummies: Gummy[] = [
  { id: 'g1', name: 'Social Spark', mood: 'Uplift + Energy', price: '$28.00', body: '#c5dd7f', accent: '#1b5e20', tileBg: '#2e7d32', tileText: '#fbf6ed' },
  { id: 'g2', name: 'Sweet Dreams', mood: 'Rest + Calm', price: '$28.00', body: '#4a9a4e', accent: '#123018', tileBg: '#123018', tileText: '#c5dd7f' },
  { id: 'g3', name: 'Pure Zen', mood: 'Balance', price: '$28.00', body: '#9ec27a', accent: '#1b5e20', tileBg: '#fbf6ed', tileText: '#1b5e20' },
  { id: 'g4', name: 'Stress Melt', mood: 'Unwind', price: '$28.00', body: '#6b9c4f', accent: '#123018', tileBg: '#1b5e20', tileText: '#c5dd7f' },
]

export const testimonials = [
  { rating: 5, title: 'Perfect way to unwind', body: 'I was honestly a bit skeptical at first, but PAUZ drinks completely changed my mind. The effect is smooth and relaxing without feeling overwhelming.', author: 'Tina A.' },
  { rating: 5, title: 'My new favorite treat', body: 'These gummies are amazing. The flavor is actually really good and I take one after work and if just melts the stress away. Will definitely be ordering again.', author: 'Sara M.' },
  { rating: 5, title: 'Subtle, relaxing, delicious', body: 'These drinks taste great and give a calm, happy feeling without being too intense. Perfect for a chill night at home.', author: 'Nina K.' },
]

export const moments = [
  { title: 'Unwind & Reset', body: 'Take a breath and let the day melt off. Made for after-work exhales, cozy nights in, and those quiet moments when you finally get to slow down.' },
  { title: 'Gather & Connect', body: 'Good company, easy laughter, and conversations that linger. Perfect for dinner parties, book clubs, backyard hangs, and the everyday moments that bring people closer.' },
  { title: 'Celebrate & Spark', body: 'Bring a little extra glow to the occasion. From girls’ nights and birthday toasts to bachelorette parties, these are the moments made to feel lively, light, and unforgettable.' },
  { title: 'Play & Indulge', body: 'Say yes to the fun part. Think pool days, tailgates, BBQs, weekend escapes, and carefree afternoons where the mood is sunny, social, and full of joy.' },
]

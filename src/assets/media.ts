/**
 * Single source of truth for the photo shoot in `assets/imgs`.
 * Filenames come straight from the client's delivery (spaces, mixed case),
 * so they're imported once here and referenced by role everywhere else.
 *
 * We ship the .webp siblings, not the .jpg/.png masters: same pixels, 13 MB
 * down to 2.9 MB. The masters stay in the folder as the source of truth —
 * regenerate with `cwebp -q 82 -m 6` (add `-alpha_q 100` for the packshots).
 */

// --- logos (détourés, deux couleurs, avec ou sans baseline) ---
import logoGreen from './logos/pauz-green.webp'
import logoWhite from './logos/pauz-white.webp'
import logoGreenTagline from './logos/pauz-green-tagline.webp'
import logoWhiteTagline from './logos/pauz-white-tagline.webp'

// --- packshots détourés (fond transparent) ---
import canTrio from './imgs/produit transparent 1.webp'
import canStudio from './imgs/produit transparent 2.webp'
import canFront from './imgs/produit transparent 3.webp'

// --- bannières paysage ---
import bannerSip from './imgs/Banner 1.webp'
import bannerHold from './imgs/banner 2.webp'
import bannerCheers from './imgs/Banner 3.webp'
import bannerCrew from './imgs/Banner 4.webp'
import bannerBeach from './imgs/banner 5.webp'

// --- lifestyle / studio portrait ---
import fridge from './imgs/Img1.webp'
import sipScarf from './imgs/img2.webp'
import stormy from './imgs/img3.webp'
import car from './imgs/img4.webp'
import beachSmile from './imgs/img5.webp'
import livingRoom from './imgs/img6.webp'
import knit from './imgs/img7.webp'
import coconuts from './imgs/img8.webp'
import handGreen from './imgs/img9.webp'

/** Wordmark lockups. `tagline` adds the "Eau de coco / 100% Naturelle" baseline. */
export const logos = {
  green: logoGreen,
  white: logoWhite,
  greenTagline: logoGreenTagline,
  whiteTagline: logoWhiteTagline,
}

export const cans = { trio: canTrio, studio: canStudio, front: canFront }

export const banners = {
  sip: bannerSip,
  hold: bannerHold,
  cheers: bannerCheers,
  crew: bannerCrew,
  beach: bannerBeach,
}

export const shots = {
  fridge,
  sipScarf,
  stormy,
  car,
  beachSmile,
  livingRoom,
  knit,
  coconuts,
  handGreen,
}

/** Ordered lookbook strip — lifestyle first, product beauty shots to close. */
export const lookbook = [
  { src: sipScarf, alt: 'Femme buvant une canette PAUZ à la paille, au coucher du soleil' },
  { src: livingRoom, alt: 'Deux amies en selfie avec un plateau de canettes PAUZ' },
  { src: car, alt: 'Femme accoudée à la portière d’une voiture, canette PAUZ à la main' },
  { src: knit, alt: 'Canette PAUZ tenue contre un pull en maille écrue' },
  { src: stormy, alt: 'Portrait sous ciel d’orage avec une canette PAUZ' },
  { src: fridge, alt: 'Canettes PAUZ alignées dans un réfrigérateur' },
  { src: handGreen, alt: 'Main tenant une canette PAUZ sur fond vert profond' },
  { src: coconuts, alt: 'Canette PAUZ entourée de noix de coco fraîches' },
  { src: beachSmile, alt: 'Femme souriante à la plage avec une canette PAUZ' },
]

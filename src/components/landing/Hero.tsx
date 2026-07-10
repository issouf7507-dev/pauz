import { motion } from 'framer-motion'
import CocoCan from '@/components/effects/CocoCan'
import { BRAND } from '@/data/site'
import { waLink } from '@/lib/whatsapp'
import './hero.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

/**
 * Hero sombre (clone lessestudio) : fond noir, objet métallique centré (canette),
 * eyebrow en haut, titre deux-tons ancré en bas-gauche, pill à droite, « Défiler ».
 */
export default function Hero() {
  return (
    <section className="hero" aria-label="Accueil PAUZ">
      <p className="hero__eyebrow container">Marque ivoirienne · 100% eau de coco</p>

      <div className="hero__object">
        <motion.div
          className="hero__object-anim"
          initial={{ opacity: 0, scale: 0.86, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <CocoCan className="hero__can" />
        </motion.div>
      </div>

      <div className="hero__foot container">
        <motion.h1 className="hero__title" custom={0} variants={fadeUp} initial="hidden" animate="show">
          PAUZ, l’eau de coco fraîche livrée à Abidjan.{' '}
          <span className="text-muted">
            Sans sucre ajouté — et une chance de gagner à chaque canette.
          </span>
        </motion.h1>

        <motion.a
          className="hero__cta pauz-btn pauz-btn--light"
          href={waLink(`Bonjour ${BRAND.name} ! Je souhaite commander.`)}
          target="_blank"
          rel="noopener noreferrer"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Commander <span aria-hidden="true">↗</span>
        </motion.a>
      </div>

      <a href="#formats" className="hero__scroll" aria-label="Faire défiler">
        Défiler <span aria-hidden="true">⌄</span>
      </a>
    </section>
  )
}

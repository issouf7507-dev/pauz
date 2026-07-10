import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Décalage d'apparition en secondes (pour effet de cascade). */
  delay?: number
  /** Direction d'entrée. */
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'span'
  once?: boolean
}

/**
 * Apparition douce au scroll (fade + translate) via Framer Motion.
 * Respecte `prefers-reduced-motion` : le contenu s'affiche immédiatement,
 * ce qui garantit qu'aucun élément ne reste masqué.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  as = 'div',
  once = true,
}: RevealProps) {
  const MotionTag = motion[as]
  const reduce = useReducedMotion()

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

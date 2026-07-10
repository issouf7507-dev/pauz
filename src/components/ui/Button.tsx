import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import './button.css'

type Variant = 'primary' | 'ghost' | 'whatsapp'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

interface LinkProps extends BaseProps {
  href: string
  target?: string
  rel?: string
  onClick?: never
}
interface BtnProps extends BaseProps {
  onClick?: () => void
  href?: never
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...rest
}: LinkProps | BtnProps) {
  const cls = `pauz-btn pauz-btn--${variant} ${className}`.trim()
  const motionProps = {
    whileHover: { scale: 1.035, y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 420, damping: 26 },
  }

  if ('href' in rest && rest.href) {
    return (
      <motion.a className={cls} {...motionProps} {...rest}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button className={cls} type="button" {...motionProps} {...(rest as BtnProps)}>
      {children}
    </motion.button>
  )
}

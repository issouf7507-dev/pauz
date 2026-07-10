import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BRAND } from '@/data/site'
import './header.css'

const NAV = [
  { label: 'La marque', href: '#approche' },
  { label: 'Formats', href: '#formats' },
  { label: 'Scanner', href: '#scanner' },
  { label: 'Lots', href: '#lots' },
  { label: 'Contact', href: '#commander' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`site-header ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="site-header__inner container">
        <Link to="/" className="site-header__logo" aria-label="Accueil PAUZ">
          P
        </Link>

        <nav className="site-header__nav" aria-label="Navigation principale">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={BRAND.socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="site-header__icon"
          aria-label="Commander sur WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-1-.3-1.6-.6-2.9-1.3-4.8-4.2-4.9-4.4-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.2.1.4.1.6-.1l.7-.9c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.9-.1 1.5Z"
            />
          </svg>
        </a>
      </div>
    </motion.header>
  )
}

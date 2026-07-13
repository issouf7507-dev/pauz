import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Wordmark } from './Visuals'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`header ${scrolled ? 'header--solid' : ''}`}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header__inner container">
        <nav className="header__nav header__nav--left">
          <a href="#drinks">Products ▾</a>
          <a href="#learn">Learn ▾</a>
        </nav>

        <a href="#top" className="header__logo" aria-label="PAUZ home">
          <Wordmark size={34} />
        </a>

        <nav className="header__nav header__nav--right">
          <a href="#account">Account</a>
          <a href="#cart" className="header__cart">
            Cart <span>0</span>
          </a>
        </nav>
      </div>

      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          transition: background .3s ease, color .3s ease, box-shadow .3s ease;
          color: var(--cream);
        }
        .header--solid {
          background: var(--cream);
          color: var(--maroon);
          box-shadow: 0 1px 0 var(--line);
        }
        .header__inner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          height: 66px;
        }
        .header__nav {
          display: flex;
          gap: 1.6rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .12em;
          font-size: .68rem;
        }
        .header__nav a { transition: opacity .2s; }
        .header__nav a:hover { opacity: .6; }
        .header__nav--right { justify-content: flex-end; }
        .header__logo { justify-self: center; }
        .header__cart span {
          display: inline-grid;
          place-items: center;
          min-width: 18px;
          height: 18px;
          padding: 0 4px;
          margin-left: 4px;
          border-radius: 999px;
          background: currentColor;
          color: var(--cream);
          font-size: .6rem;
        }
        .header--solid .header__cart span { color: var(--cream); }
        @media (max-width: 720px) {
          .header__nav--left a:last-child,
          .header__nav a { font-size: .6rem; gap: .8rem; }
          .header__nav { gap: .9rem; }
        }
      `}</style>
    </motion.header>
  )
}

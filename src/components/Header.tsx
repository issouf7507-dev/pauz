import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Wordmark } from './Visuals'
import { useOrder } from '../lib/order'

/**
 * Le site tient sur une seule page : la nav est donc une table des matières,
 * pas un routeur. Chaque entrée pointe une section réelle — pas de menu
 * déroulant promis puis absent, pas de lien « Compte » alors qu'il n'y a pas
 * de compte client (une commande est identifiée par son numéro de téléphone).
 */
const LINKS = [
  { href: '#drinks', label: 'Le produit' },
  { href: '#learn', label: 'D’où ça vient' },
  { href: '#label', label: 'L’étiquette' },
  { href: '#packs', label: 'Les packs' },
]

/** Hauteur du bandeau : sert d'offset au scroll-spy comme à Lenis. */
const HEADER_H = 66

export default function Header() {
  const { openOrder } = useOrder()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // Un seul écouteur pour les deux besoins : l'état plein du bandeau, et la
  // section courante — celle dont le haut est passé juste sous le bandeau.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      let current: string | null = null
      for (const link of LINKS) {
        const section = document.querySelector(link.href)
        if (section && section.getBoundingClientRect().top <= HEADER_H + 40) current = link.href
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu mobile : Échap ferme, et la page dessous ne défile plus.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  return (
    <motion.header
      className={`header ${scrolled ? 'header--solid' : ''} ${menuOpen ? 'header--open' : ''}`}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header__inner container">
        <button
          type="button"
          className="header__burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span className={`header__burger-box ${menuOpen ? 'is-open' : ''}`}>
            <i />
            <i />
          </span>
        </button>

        <nav className="header__nav header__nav--left" aria-label="Sections du site">
          {LINKS.slice(0, 2).map((link) => (
            <a key={link.href} href={link.href} aria-current={active === link.href ? 'true' : undefined}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#top" className="header__logo" aria-label="Accueil PAUZ">
          <Wordmark size={24} variant="white" alt="" className="header__mark" />
          <Wordmark size={24} alt="" className="header__mark header__mark--solid" />
        </a>

        <nav className="header__nav header__nav--right" aria-label="Sections du site (suite)">
          {LINKS.slice(2).map((link) => (
            <a key={link.href} href={link.href} aria-current={active === link.href ? 'true' : undefined}>
              {link.label}
            </a>
          ))}
          <button type="button" className="header__order" onClick={() => openOrder(1)}>
            Commander
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="header__panel"
            id="menu-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Menu">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === link.href ? 'true' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              className="header__panel-cta"
              onClick={() => {
                setMenuOpen(false)
                openOrder(1)
              }}
            >
              Commander
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          transition: background .3s ease, color .3s ease, box-shadow .3s ease;
          color: var(--cream);
        }
        .header--solid,
        .header--open {
          background: var(--cream);
          color: var(--maroon);
          box-shadow: 0 1px 0 var(--line);
        }
        .header__inner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          height: ${HEADER_H}px;
        }

        .header__nav {
          display: flex;
          align-items: center;
          gap: 1.6rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .12em;
          font-size: .68rem;
        }
        .header__nav--right { justify-content: flex-end; }

        /* Le soulignement pousse depuis la gauche ; la section courante le garde. */
        .header__nav a {
          position: relative;
          padding: 4px 0;
          transition: opacity .2s ease;
        }
        .header__nav a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1.5px;
          width: 100%;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .28s cubic-bezier(.22,1,.36,1);
        }
        .header__nav a:hover::after,
        .header__nav a[aria-current]::after { transform: scaleX(1); }
        .header__nav a[aria-current] { opacity: 1; }

        /* Both inks are rendered and cross-faded rather than swapping src:
           the second file would not be in cache on the first scroll. */
        .header__logo { justify-self: center; position: relative; line-height: 0; }
        .header__mark { transition: opacity .3s ease; }
        .header__mark--solid { position: absolute; inset: 0; opacity: 0; }
        .header--solid .header__mark,
        .header--open .header__mark { opacity: 0; }
        .header--solid .header__mark--solid,
        .header--open .header__mark--solid { opacity: 1; }

        /* Pas de panier : le bouton ouvre directement le tunnel de commande. */
        .header__order {
          font: inherit;
          color: inherit;
          padding: .5em 1.1em;
          border-radius: 999px;
          border: 1.5px solid currentColor;
          background: transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: background .2s ease, color .2s ease;
        }
        /* Sur le héros le bouton est crème sur vert ; une fois le bandeau plein,
           il s'inverse. currentColor ne peut pas servir ici : la couleur change
           dans la même règle. */
        .header__order:hover { background: var(--cream); color: var(--maroon); }
        .header--solid .header__order:hover,
        .header--open .header__order:hover { background: var(--maroon); color: var(--cream); }

        /* ---------- burger + panneau mobile ---------- */
        .header__burger {
          display: none;
          width: 34px;
          height: 34px;
          padding: 0;
          border: 0;
          background: none;
          color: inherit;
          cursor: pointer;
        }
        .header__burger-box { display: block; position: relative; height: 12px; }
        .header__burger-box i {
          position: absolute;
          left: 0;
          width: 22px;
          height: 1.5px;
          background: currentColor;
          transition: transform .3s cubic-bezier(.22,1,.36,1), opacity .2s ease;
        }
        .header__burger-box i:first-child { top: 0; }
        .header__burger-box i:last-child { top: 10px; }
        .header__burger-box.is-open i:first-child { transform: translateY(5px) rotate(45deg); }
        .header__burger-box.is-open i:last-child { transform: translateY(-5px) rotate(-45deg); }

        .header__panel {
          position: absolute;
          left: 0;
          right: 0;
          top: ${HEADER_H}px;
          background: var(--cream);
          color: var(--maroon);
          border-top: 1px solid var(--line);
          padding: 20px clamp(16px, 5vw, 32px) 26px;
          box-shadow: 0 24px 40px rgba(9, 26, 13, .18);
        }
        .header__panel nav { display: flex; flex-direction: column; }
        .header__panel a {
          padding: 14px 0;
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 500;
          letter-spacing: -.01em;
          border-bottom: 1px solid var(--line);
        }
        .header__panel a[aria-current] { color: var(--maroon-deep); }
        .header__panel-cta {
          margin-top: 20px;
          width: 100%;
          font-family: var(--font-mono);
          font-size: .72rem;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          padding: 1.05em 1.6em;
          border: 0;
          border-radius: 999px;
          background: var(--maroon);
          color: var(--cream);
          cursor: pointer;
        }

        @media (max-width: 860px) {
          .header__inner { grid-template-columns: 1fr auto 1fr; }
          .header__burger { display: grid; place-items: center; }
          .header__nav--left { display: none; }
          .header__nav--right a { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .header__nav a::after, .header__burger-box i { transition: none; }
        }
      `}</style>
    </motion.header>
  )
}

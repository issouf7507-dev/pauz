import type { ReactNode } from 'react'
import { Wordmark } from './Visuals'
import Footer from './Footer'
import { useOrder } from '../lib/order'

/**
 * Cadre des pages annexes (suivi de commande, politiques) : un bandeau sobre
 * qui ramène à l'accueil, le contenu, et le même pied de page que le site.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  const { openOrder } = useOrder()

  return (
    <>
      <header className="shell__bar">
        <div className="container shell__inner">
          <a href="/" className="shell__logo" aria-label="Accueil PAUZ">
            <Wordmark size={22} />
          </a>
          <button type="button" className="shell__order" onClick={() => openOrder(1)}>
            Commander
          </button>
        </div>
      </header>

      <main>{children}</main>
      <Footer />

      <style>{`
        .shell__bar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--cream);
          color: var(--maroon);
          box-shadow: 0 1px 0 var(--line);
        }
        .shell__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 66px;
        }
        .shell__logo { line-height: 0; }
        .shell__order {
          font-family: var(--font-mono);
          font-size: .68rem;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: inherit;
          padding: .5em 1.1em;
          border-radius: 999px;
          border: 1.5px solid currentColor;
          background: transparent;
          cursor: pointer;
          transition: background .2s ease, color .2s ease;
        }
        .shell__order:hover { background: var(--maroon); color: var(--cream); }
      `}</style>
    </>
  )
}

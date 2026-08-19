import { Wordmark, Sun } from './Visuals'

const columns = [
  { title: 'Boutique', links: ['PAUZ Eau de coco', 'Canette à l’unité', 'Pack de 12', 'Abonnement & économies'] },
  { title: 'À savoir', links: ['À propos', 'Notre sourcing', 'FAQ'] },
  { title: 'Compte', links: ['Nous contacter', 'Mon compte', 'Suivre ma commande'] },
  { title: 'Mentions', links: ['Politique de remboursement', 'Politique de confidentialité', 'Politique de livraison', 'Conditions générales'] },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Wordmark size={44} variant="white" />
          <p>Une canette d’eau de coco 100 % pure. Sans sucre ajouté, sans concentré, sans colorant.</p>
        </div>
        <div className="footer__cols">
          {columns.map((c) => (
            <div key={c.title} className="footer__col">
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer__disclaimer container">
        <p>
          PAUZ est une boisson à base d’eau de coco 100 % pure. C’est un produit alimentaire, pas un
          médicament : il n’est destiné à diagnostiquer, traiter, guérir ni prévenir aucune maladie.
          À servir bien fraîche, et à consommer dans les jours qui suivent l’ouverture.
        </p>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <span>© {new Date().getFullYear()} PAUZ. Tous droits réservés.</span>
          <span className="footer__suns">
            <Sun size={14} color="var(--orange-soft)" />
            <Sun size={14} color="var(--yellow)" />
          </span>
        </div>
      </div>

      <style>{`
        .footer { background: var(--maroon-deep); color: var(--cream); }
        .footer__top {
          display: grid;
          grid-template-columns: 1.2fr 3fr;
          gap: clamp(24px, 4vw, 60px);
          padding: clamp(50px, 7vw, 90px) 0 40px;
        }
        @media (max-width: 820px) { .footer__top { grid-template-columns: 1fr; } }
        .footer__brand p { margin-top: 1rem; max-width: 260px; opacity: .7; font-size: .85rem; line-height: 1.5; }
        .footer__cols {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }
        @media (max-width: 720px) { .footer__cols { grid-template-columns: repeat(2, 1fr); gap: 28px; } }
        .footer__col h4 {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .1em;
          font-size: .68rem;
          margin-bottom: 1rem;
          color: var(--orange-soft);
        }
        .footer__col li { margin-bottom: .55rem; }
        .footer__col a { font-size: .82rem; opacity: .8; transition: opacity .2s; }
        .footer__col a:hover { opacity: 1; }
        .footer__disclaimer {
          padding: 24px 0;
          border-top: 1px solid rgba(255,255,255,.1);
        }
        .footer__disclaimer p { font-size: .66rem; line-height: 1.6; opacity: .5; max-width: 900px; }
        .footer__bar { background: rgba(0,0,0,.2); }
        .footer__bar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          font-family: var(--font-mono);
          font-size: .64rem;
          letter-spacing: .06em;
          text-transform: uppercase;
          opacity: .7;
        }
        .footer__suns { display: inline-flex; gap: 6px; }
      `}</style>
    </footer>
  )
}

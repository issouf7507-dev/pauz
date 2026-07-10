import { BRAND } from '@/data/site'
import './footer.css'

interface Col {
  head: string
  links: string[]
}
const GROUPS: { label: string; cols: Col[] }[] = [
  {
    label: 'La marque',
    cols: [
      { head: 'Le produit', links: ['Eau de coco 100%', 'Canette 330 ml', 'Électrolytes naturels', 'Sans sucre ajouté'] },
      { head: 'Nos formats', links: ['Solo', 'Pack 6', 'Pack 12', 'Carton 24'] },
      { head: 'Scanne & gagne', links: ['Scanner ma canette', 'Roue de la fortune', 'Lots à gagner', 'Famille PAUZ'] },
      { head: 'Livraison', links: ['Cocody', 'Plateau', 'Marcory', 'Grand Abidjan'] },
    ],
  },
  {
    label: 'Commander',
    cols: [
      { head: 'Commander', links: ['Sur WhatsApp', 'Formulaire', 'Zones couvertes', 'Tarifs packs'] },
      { head: 'À propos', links: ['Notre histoire', '100% naturel', 'Abidjan, CI', 'Nous contacter'] },
      { head: 'Aide', links: ['Livraison 24 h', 'Paiement', 'Suivi commande', 'FAQ'] },
      { head: 'Légal', links: ['Mentions légales', 'Confidentialité'] },
    ],
  },
]

const SOCIALS: { label: string; href: string }[] = [
  { label: 'Instagram', href: BRAND.socials.instagram },
  { label: 'TikTok', href: BRAND.socials.tiktok },
  { label: 'Facebook', href: BRAND.socials.facebook },
  { label: 'WhatsApp', href: BRAND.socials.whatsapp },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        {GROUPS.map((group) => (
          <div className="footer__group" key={group.label}>
            <p className="footer__group-label">{group.label}</p>
            <div className="footer__cols">
              {group.cols.map((col) => (
                <nav className="footer__col" key={col.head} aria-label={col.head}>
                  <a className="footer__col-head" href="#commander">
                    {col.head} <span aria-hidden="true">↗</span>
                  </a>
                  <ul>
                    {col.links.map((l) => (
                      <li key={l}>
                        <a href="#commander">{l}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="footer__wordmark" aria-hidden="true">
        PAUZ
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} PAUZ · Abidjan</span>
        <nav className="footer__socials" aria-label="Réseaux sociaux">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

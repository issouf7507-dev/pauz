import { Sun } from './Visuals'

const items = [
  'LIVRAISON OFFERTE DÈS 75 $',
  '100 % EAU DE COCO',
  'JAMAIS DE SUCRE AJOUTÉ',
  'UNE CANETTE. RIEN À AJOUTER.',
]

export default function AnnouncementBar() {
  const row = [...items, ...items]
  return (
    <div className="announce">
      <div className="announce__track">
        {row.map((t, i) => (
          <span className="announce__item" key={i}>
            <Sun size={12} color="var(--orange-soft)" />
            {t}
          </span>
        ))}
      </div>
      <style>{`
        .announce {
          background: var(--maroon-deep);
          color: var(--cream);
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,.08);
          position: relative;
          z-index: 60;
        }
        .announce__track {
          display: flex;
          gap: 2.4rem;
          width: max-content;
          padding: 7px 0;
          animation: announce-scroll 26s linear infinite;
          white-space: nowrap;
        }
        .announce__item {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          font-family: var(--font-mono);
          font-size: .64rem;
          letter-spacing: .16em;
        }
        @keyframes announce-scroll {
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

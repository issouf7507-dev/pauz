import { Sun } from './Visuals'

const items = ['100 % Eau de coco', 'Sans sucre ajouté', 'Naturellement isotonique', 'Peu calorique', 'Vegan']

export default function Ticker() {
  const row = [...items, ...items, ...items]
  return (
    <div className="ticker">
      <div className="ticker__track">
        {row.map((t, i) => (
          <span className="ticker__item" key={i}>
            {t}
            <Sun size={13} color="var(--yellow)" />
          </span>
        ))}
      </div>
      <style>{`
        .ticker {
          background: var(--maroon);
          color: var(--cream);
          overflow: hidden;
          padding: 12px 0;
        }
        .ticker__track {
          display: flex;
          align-items: center;
          gap: 1.8rem;
          width: max-content;
          animation: ticker-scroll 30s linear infinite;
        }
        .ticker__item {
          display: inline-flex;
          align-items: center;
          gap: 1.8rem;
          font-family: var(--font-display);
          font-weight: 700;
          text-transform: uppercase;
          font-size: 1rem;
          letter-spacing: .02em;
          white-space: nowrap;
        }
        @keyframes ticker-scroll {
          to { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </div>
  )
}

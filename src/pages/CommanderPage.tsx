import { useState } from 'react'
import { Link } from 'react-router-dom'
import CocoCan from '@/components/effects/CocoCan'
import { PACKS, QUARTIERS, fcfa, type Pack } from '@/data/site'
import { waLink, orderMessage } from '@/lib/whatsapp'
import './commander-page.css'

export default function CommanderPage() {
  const [selectedId, setSelectedId] = useState<Pack['id']>(
    PACKS.find((p) => p.popular)?.id ?? PACKS[0].id,
  )
  const selected = PACKS.find((p) => p.id === selectedId) ?? PACKS[0]

  return (
    <main className="cmd">
      <div className="cmd__card">
        <div className="cmd__head">
          <Link to="/" className="cmd__logo">PAUZ</Link>
          <span className="cmd__ship">Livraison Abidjan 24h</span>
        </div>

        <h1 className="cmd__title">Choisis ton pack.</h1>

        <div className="cmd__packs" role="radiogroup" aria-label="Packs disponibles">
          {PACKS.map((pack) => {
            const active = pack.id === selectedId
            return (
              <button
                key={pack.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`cmd__pack ${active ? 'is-active' : ''} ${pack.popular ? 'is-popular' : ''}`}
                onClick={() => setSelectedId(pack.id)}
              >
                {pack.popular && <span className="cmd__tag">POPULAIRE</span>}
                <span className="cmd__thumb" aria-hidden="true">
                  <CocoCan />
                </span>
                <span className="cmd__pack-info">
                  <span className="cmd__pack-name">{pack.name}</span>
                  <span className="cmd__pack-sub">
                    {pack.units} canette{pack.units > 1 ? 's' : ''} · {pack.target}
                  </span>
                </span>
                <span className="cmd__price">{fcfa(pack.price)}</span>
              </button>
            )
          })}
        </div>

        <div className="cmd__zone">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span className="cmd__zone-text">{QUARTIERS.slice(0, 4).join(', ')}…</span>
          <span className="cmd__zone-change">Changer</span>
        </div>

        <a
          className="cmd__cta"
          href={waLink(orderMessage(selected))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D2B0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.35 8.5 8.5 0 0 1-3.8-.9L3 20l1.05-3.2A8.38 8.38 0 1 1 21 11.5z" />
          </svg>
          <span>Commander {selected.name} sur WhatsApp</span>
        </a>
        <p className="cmd__note">Ta commande part directement dans la conversation.</p>
      </div>
    </main>
  )
}

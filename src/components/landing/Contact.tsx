import { useState } from 'react'
import { PACKS, QUARTIERS, fcfa } from '@/data/site'
import { waLink } from '@/lib/whatsapp'
import './contact.css'

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [quartier, setQuartier] = useState('')
  const [message, setMessage] = useState('')
  const [packId, setPackId] = useState(PACKS.find((p) => p.popular)?.id ?? PACKS[0].id)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const pack = PACKS.find((p) => p.id === packId)!
    const body =
      `Bonjour PAUZ ! Je souhaite commander :\n` +
      `• Pack : ${pack.name} (${pack.units} canette${pack.units > 1 ? 's' : ''}) — ${fcfa(pack.price)}\n` +
      `• Nom : ${name || '—'}\n` +
      `• Téléphone : ${phone || '—'}\n` +
      `• Quartier : ${quartier || '—'}\n` +
      (message ? `• Précisions : ${message}\n` : '') +
      `\nMerci de me confirmer la livraison.`
    window.open(waLink(body), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="contact section section--dark" id="commander">
      <div className="container contact__grid">
        <div className="contact__intro">
          <h2 className="contact__title">
            Prêt à <span className="text-muted">commander&nbsp;?</span>
          </h2>
          <p className="contact__note">
            Remplis le formulaire, on te répond sur WhatsApp et on livre dans le Grand Abidjan
            sous 24&nbsp;h.
          </p>
          <ul className="contact__zones">
            {QUARTIERS.slice(0, 8).map((q) => (
              <li key={q}>{q}</li>
            ))}
            <li>+ autres</li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={submit}>
          <p className="contact__form-label">Remplis le formulaire pour commander :</p>

          <div className="contact__fields">
            <input
              className="contact__input"
              placeholder="Ton nom *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="contact__input"
              placeholder="Téléphone *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <select
              className="contact__input contact__input--full"
              value={quartier}
              onChange={(e) => setQuartier(e.target.value)}
            >
              <option value="">Ton quartier (Abidjan)</option>
              {QUARTIERS.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
            <textarea
              className="contact__input contact__input--full contact__textarea"
              placeholder="Précisions sur ta commande (optionnel)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          <p className="contact__form-label contact__form-label--pack">Choisis ton pack :</p>
          <div className="contact__packs">
            {PACKS.map((pack) => (
              <label
                key={pack.id}
                className={`contact__pack ${packId === pack.id ? 'is-selected' : ''}`}
              >
                <input
                  type="radio"
                  name="pack"
                  value={pack.id}
                  checked={packId === pack.id}
                  onChange={() => setPackId(pack.id)}
                />
                <span className="contact__pack-name">{pack.name}</span>
                <span className="contact__pack-price">{fcfa(pack.price)}</span>
              </label>
            ))}
          </div>

          <button type="submit" className="pauz-btn pauz-btn--light contact__submit">
            Envoyer sur WhatsApp <span aria-hidden="true">↗</span>
          </button>
        </form>
      </div>
    </section>
  )
}

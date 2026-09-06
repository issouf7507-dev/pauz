import type { Ref } from 'react'
import type { PaymentMethod } from '../lib/api'

/**
 * Les coordonnées demandées au client — les mêmes dans le tunnel de commande
 * du site et dans la confirmation d'un lien de commande envoyé par l'équipe.
 * Un seul endroit à corriger si un champ change.
 */
export type ContactForm = {
  customerName: string
  customerPhone: string
  customerEmail: string
  deliveryCity: string
  deliveryAddress: string
  deliveryNote: string
}

export const EMPTY_CONTACT: ContactForm = {
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  deliveryCity: '',
  deliveryAddress: '',
  deliveryNote: '',
}

/** Coordonnées prêtes pour l'API : rognées, et les champs vides retirés. */
export function toContactPayload(form: ContactForm) {
  return {
    customerName: form.customerName.trim(),
    customerPhone: form.customerPhone.trim(),
    ...(form.customerEmail.trim() ? { customerEmail: form.customerEmail.trim() } : {}),
    ...(form.deliveryCity.trim() ? { deliveryCity: form.deliveryCity.trim() } : {}),
    ...(form.deliveryAddress.trim() ? { deliveryAddress: form.deliveryAddress.trim() } : {}),
    ...(form.deliveryNote.trim() ? { deliveryNote: form.deliveryNote.trim() } : {}),
  }
}

export const PAYMENTS: { value: PaymentMethod; label: string; hint: string }[] = [
  { value: 'CASH_ON_DELIVERY', label: 'À la livraison', hint: 'Tu règles en espèces au livreur' },
  { value: 'MOBILE_MONEY', label: 'Mobile Money', hint: 'Orange, MTN, Moov, Wave' },
  { value: 'BANK_TRANSFER', label: 'Virement', hint: 'Coordonnées envoyées après validation' },
]

export function ContactFields({
  value,
  errors,
  onChange,
  firstFieldRef,
}: {
  value: ContactForm
  errors: Record<string, string[]>
  onChange: <K extends keyof ContactForm>(key: K, next: string) => void
  firstFieldRef?: Ref<HTMLInputElement>
}) {
  return (
    <div className="ofld__grid">
      <label className="ofld">
        <span>Nom complet</span>
        <input
          ref={firstFieldRef}
          value={value.customerName}
          onChange={(e) => onChange('customerName', e.target.value)}
          autoComplete="name"
          required
        />
        {errors.customerName && <em>{errors.customerName.join(', ')}</em>}
      </label>

      <label className="ofld">
        <span>Téléphone</span>
        <input
          value={value.customerPhone}
          onChange={(e) => onChange('customerPhone', e.target.value)}
          placeholder="07 07 12 34 56"
          inputMode="tel"
          autoComplete="tel"
          required
        />
        {errors.customerPhone && <em>{errors.customerPhone.join(', ')}</em>}
      </label>

      <label className="ofld">
        <span>Ville</span>
        <input
          value={value.deliveryCity}
          onChange={(e) => onChange('deliveryCity', e.target.value)}
          placeholder="Abidjan"
          autoComplete="address-level2"
        />
      </label>

      <label className="ofld">
        <span>
          Email <i>(facultatif)</i>
        </span>
        <input
          type="email"
          value={value.customerEmail}
          onChange={(e) => onChange('customerEmail', e.target.value)}
          autoComplete="email"
        />
        {errors.customerEmail && <em>{errors.customerEmail.join(', ')}</em>}
      </label>

      <label className="ofld ofld--wide">
        <span>Adresse de livraison</span>
        <input
          value={value.deliveryAddress}
          onChange={(e) => onChange('deliveryAddress', e.target.value)}
          placeholder="Quartier, rue, repère"
          autoComplete="street-address"
        />
      </label>

      <label className="ofld ofld--wide">
        <span>
          Précision <i>(facultatif)</i>
        </span>
        <textarea
          rows={2}
          value={value.deliveryNote}
          onChange={(e) => onChange('deliveryNote', e.target.value)}
          placeholder="Heure qui t'arrange, étage, code…"
        />
      </label>

      <style>{`
        .ofld__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 620px) { .ofld__grid { grid-template-columns: 1fr; } }
        .ofld--wide { grid-column: 1 / -1; }
        .ofld { display: flex; flex-direction: column; gap: 5px; }
        .ofld > span {
          font-family: var(--font-mono);
          font-size: .68rem;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          opacity: .72;
        }
        .ofld i { font-style: normal; opacity: .6; text-transform: none; letter-spacing: 0; }
        .ofld input,
        .ofld textarea {
          font: inherit;
          color: inherit;
          padding: 11px 13px;
          border: 1.5px solid var(--line);
          border-radius: 10px;
          background: #fff;
          resize: vertical;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .ofld input:focus,
        .ofld textarea:focus {
          outline: none;
          border-color: var(--maroon);
          box-shadow: 0 0 0 3px rgba(46,125,50,.15);
        }
        .ofld em { font-style: normal; font-size: .76rem; color: #b3261e; }
      `}</style>
    </div>
  )
}

export function PaymentChoice({
  value,
  onChange,
}: {
  value: PaymentMethod
  onChange: (next: PaymentMethod) => void
}) {
  return (
    <fieldset className="opay">
      <legend>Paiement</legend>
      {PAYMENTS.map((p) => (
        <label key={p.value} className={`opay__opt ${value === p.value ? 'is-on' : ''}`}>
          <input
            type="radio"
            name="payment"
            value={p.value}
            checked={value === p.value}
            onChange={() => onChange(p.value)}
          />
          <b>{p.label}</b>
          <span>{p.hint}</span>
        </label>
      ))}

      <style>{`
        .opay { border: 0; margin: 20px 0 0; padding: 0; }
        .opay legend {
          font-family: var(--font-mono);
          font-size: .68rem;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          opacity: .72;
          margin-bottom: 8px;
        }
        .opay__opt {
          display: grid;
          grid-template-columns: auto 1fr;
          column-gap: 10px;
          align-items: center;
          padding: 10px 13px;
          border: 1.5px solid var(--line);
          border-radius: 10px;
          margin-bottom: 8px;
          cursor: pointer;
          background: #fff;
          transition: border-color .2s ease, background .2s ease;
        }
        .opay__opt.is-on { border-color: var(--maroon); background: rgba(46,125,50,.07); }
        .opay__opt input { accent-color: var(--maroon); grid-row: 1 / 3; }
        .opay__opt b { font-size: .9rem; }
        .opay__opt span { font-size: .78rem; opacity: .68; }
      `}</style>
    </fieldset>
  )
}

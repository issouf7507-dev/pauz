import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  ApiError,
  createOrder,
  fetchProducts,
  formatPrice,
  type ApiProduct,
  type OrderConfirmation,
  type PaymentMethod,
} from '../lib/api'
import {
  ContactFields,
  EMPTY_CONTACT,
  PaymentChoice,
  toContactPayload,
  type ContactForm,
} from './ContactFields'
import { cans } from '../assets/media'

/** Le suivi vit sur le site : lien interne si l'origine est la même. */
function trackHref(trackUrl: string) {
  try {
    const url = new URL(trackUrl)
    return url.origin === window.location.origin ? url.pathname : trackUrl
  } catch {
    return trackUrl
  }
}

/** Quantités proposées d'emblée : l'unité, le demi-pack, le pack. */
const PRESETS = [1, 6, 12, 24]

export default function OrderDialog({
  initialQuantity,
  onClose,
}: {
  initialQuantity: number
  onClose: () => void
}) {
  const [product, setProduct] = useState<ApiProduct | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(initialQuantity)
  const [form, setForm] = useState<ContactForm>(EMPTY_CONTACT)
  const [payment, setPayment] = useState<PaymentMethod>('CASH_ON_DELIVERY')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState<OrderConfirmation | null>(null)

  const panelRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)

  // Le catalogue fait autorité sur le prix et l'identifiant du produit : on ne
  // commande jamais avec l'id figé dans le code du site.
  useEffect(() => {
    let alive = true
    fetchProducts()
      .then((products) => {
        if (!alive) return
        const first = products[0]
        if (!first) return setLoadError('Le catalogue est vide pour le moment.')
        setProduct(first)
      })
      .catch((err) => alive && setLoadError(err instanceof ApiError ? err.message : 'Catalogue indisponible'))
    return () => {
      alive = false
    }
  }, [])

  // Échap ferme, et la page derrière ne défile plus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstFieldRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  const stock = product?.stock ?? null
  const max = stock && stock > 0 ? Math.min(stock, 500) : 500
  const subtotal = product ? product.price * quantity : 0

  function set<K extends keyof ContactForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    setFieldErrors(({ [key]: _drop, ...rest }) => rest)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!product) return
    setBusy(true)
    setError(null)
    setFieldErrors({})
    try {
      const confirmation = await createOrder({
        ...toContactPayload(form),
        paymentMethod: payment,
        items: [{ productId: product.id, quantity }],
      })
      setDone(confirmation)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
        if (err.details) setFieldErrors(err.details)
      } else {
        setError('Commande impossible pour le moment')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <motion.div
      className="odlg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="odlg__panel"
        ref={panelRef}
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-label="Commander PAUZ"
        initial={{ y: 26, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="odlg__close" type="button" onClick={onClose} aria-label="Fermer">
          ×
        </button>

        {done ? (
          <div className="odlg__done">
            <img src={cans.front} alt="" className="odlg__done-can" />
            <p className="odlg__eyebrow">Commande reçue</p>
            <h2 className="odlg__title">Merci, c'est noté.</h2>
            <p className="odlg__lead">
              On t'appelle sur le {form.customerPhone} pour confirmer la livraison.
            </p>
            <dl className="odlg__recap">
              <div>
                <dt>Référence</dt>
                <dd>{done.reference}</dd>
              </div>
              <div>
                <dt>Total</dt>
                <dd>{formatPrice(done.total, done.currency)}</dd>
              </div>
            </dl>
            <p className="odlg__note">
              Garde cette référence : elle identifie ta commande auprès de l'équipe.
            </p>
            <a className="odlg__submit" href={trackHref(done.trackUrl)}>
              Suivre ma commande
            </a>
            <button className="odlg__close-link" type="button" onClick={onClose}>
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <p className="odlg__eyebrow">Commande directe</p>
            <h2 className="odlg__title">Combien de canettes ?</h2>
            <p className="odlg__lead">
              Pas de panier : tu choisis la quantité, on te livre et tu règles à la réception.
            </p>

            {loadError && <p className="odlg__error">{loadError}</p>}

            <div className="odlg__product">
              <img src={cans.trio} alt="" />
              <div>
                <b>{product?.name ?? 'PAUZ Eau de coco'}</b>
                <span>
                  {product?.size ?? '330 ml'} · {product ? formatPrice(product.price) : '—'} l'unité
                </span>
                {stock !== null && stock <= 24 && <em className="odlg__stock">Plus que {stock} en stock</em>}
              </div>
            </div>

            <div className="odlg__qty">
              <div className="odlg__presets">
                {PRESETS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`odlg__preset ${quantity === n ? 'is-on' : ''}`}
                    onClick={() => setQuantity(Math.min(n, max))}
                  >
                    ×{n}
                  </button>
                ))}
              </div>
              <div className="odlg__stepper">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Retirer une canette">
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={max}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(max, Math.max(1, Number(e.target.value) || 1)))}
                  aria-label="Quantité"
                />
                <button type="button" onClick={() => setQuantity((q) => Math.min(max, q + 1))} aria-label="Ajouter une canette">
                  +
                </button>
              </div>
            </div>

              <ContactFields
                value={form}
                errors={fieldErrors}
                onChange={set}
                firstFieldRef={firstFieldRef}
              />

              <PaymentChoice value={payment} onChange={setPayment} />

            {error && <p className="odlg__error">{error}</p>}

            <div className="odlg__foot">
              <div className="odlg__total">
                <span>Sous-total</span>
                <b>{formatPrice(subtotal)}</b>
                <em>Livraison confirmée à l'appel</em>
              </div>
              <button className="odlg__submit" disabled={busy || !product}>
                {busy ? 'Envoi…' : 'Valider la commande'}
              </button>
            </div>
          </form>
        )}
      </motion.div>

      <style>{`
        .odlg {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: grid;
          place-items: center;
          padding: 16px;
          background: rgba(18, 48, 24, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .odlg__panel {
          position: relative;
          width: min(680px, 100%);
          max-height: min(92vh, 900px);
          overflow-y: auto;
          background: var(--cream);
          border-radius: var(--radius);
          padding: clamp(22px, 4vw, 38px);
          box-shadow: 0 30px 80px rgba(9, 26, 13, 0.35);
        }
        .odlg__close {
          position: absolute;
          top: 12px;
          right: 14px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1.5px solid var(--line);
          background: transparent;
          color: var(--ink);
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
          transition: background .2s ease;
        }
        .odlg__close:hover { background: rgba(20,53,26,.08); }

        .odlg__eyebrow {
          font-family: var(--font-mono);
          font-size: .66rem;
          font-weight: 600;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--maroon);
        }
        .odlg__title {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 600;
          letter-spacing: -.02em;
          margin: .35rem 0 .5rem;
        }
        .odlg__lead { font-size: .92rem; line-height: 1.55; opacity: .78; margin-bottom: 1.4rem; }

        /* ---------- produit + quantité ---------- */
        .odlg__product {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 14px;
          border: 1.5px solid var(--line);
          border-radius: var(--radius);
          background: var(--paper);
        }
        .odlg__product img { width: 74px; height: auto; flex: none; }
        .odlg__product b { display: block; font-size: .95rem; }
        .odlg__product span { font-size: .82rem; opacity: .7; }
        .odlg__stock {
          display: block;
          margin-top: 4px;
          font-family: var(--font-mono);
          font-size: .68rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--maroon-deep);
        }

        .odlg__qty {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: space-between;
          align-items: center;
          margin: 14px 0 20px;
        }
        .odlg__presets { display: flex; gap: 8px; flex-wrap: wrap; }
        .odlg__preset {
          font-family: var(--font-mono);
          font-size: .72rem;
          font-weight: 600;
          letter-spacing: .08em;
          padding: .55em 1.1em;
          border-radius: 999px;
          border: 1.5px solid var(--line);
          background: transparent;
          color: var(--ink);
          cursor: pointer;
          transition: background .2s ease, color .2s ease, border-color .2s ease;
        }
        .odlg__preset:hover { border-color: var(--maroon); }
        .odlg__preset.is-on { background: var(--maroon); border-color: var(--maroon); color: var(--cream); }

        .odlg__stepper {
          display: flex;
          align-items: center;
          border: 1.5px solid var(--line);
          border-radius: 999px;
          overflow: hidden;
        }
        .odlg__stepper button {
          width: 38px;
          height: 38px;
          border: 0;
          background: transparent;
          font-size: 18px;
          cursor: pointer;
          color: var(--ink);
        }
        .odlg__stepper button:hover { background: rgba(20,53,26,.08); }
        .odlg__stepper input {
          width: 54px;
          height: 38px;
          border: 0;
          background: transparent;
          text-align: center;
          font: inherit;
          font-weight: 600;
          -moz-appearance: textfield;
        }
        .odlg__stepper input::-webkit-outer-spin-button,
        .odlg__stepper input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

        /* ---------- pied ---------- */
        .odlg__foot {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          justify-content: space-between;
          margin-top: 22px;
          padding-top: 18px;
          border-top: 1.5px solid var(--line);
        }
        .odlg__total span {
          display: block;
          font-family: var(--font-mono);
          font-size: .68rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          opacity: .7;
        }
        .odlg__total b { font-size: 1.5rem; font-weight: 600; letter-spacing: -.02em; }
        .odlg__total em { display: block; font-style: normal; font-size: .74rem; opacity: .6; }

        .odlg__submit {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: .72rem;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          padding: 1.05em 1.9em;
          border: 0;
          border-radius: 999px;
          background: var(--maroon);
          color: var(--cream);
          cursor: pointer;
          transition: background .2s ease, transform .2s ease;
        }
        .odlg__submit:hover:not(:disabled) { background: var(--maroon-deep); }
        .odlg__submit:active:not(:disabled) { transform: translateY(1px); }
        .odlg__submit:disabled { opacity: .55; cursor: default; }

        .odlg__error {
          margin-top: 14px;
          padding: 10px 13px;
          border-radius: 10px;
          background: #fdecea;
          color: #b3261e;
          font-size: .85rem;
        }

        /* ---------- confirmation ---------- */
        .odlg__done { text-align: center; }
        .odlg__done-can { width: 92px; height: auto; margin: 0 auto .6rem; display: block; }
        .odlg__recap {
          display: flex;
          justify-content: center;
          gap: 34px;
          margin: 18px 0 22px;
        }
        .odlg__recap dt {
          font-family: var(--font-mono);
          font-size: .66rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          opacity: .7;
        }
        .odlg__recap dd { font-size: 1.1rem; font-weight: 600; }
        .odlg__note { font-size: .84rem; opacity: .7; margin-bottom: 1.1rem; }
        .odlg__close-link {
          display: block;
          margin: 12px auto 0;
          border: 0;
          background: none;
          font: inherit;
          font-size: .84rem;
          color: inherit;
          text-decoration: underline;
          opacity: .7;
          cursor: pointer;
        }
      `}</style>
    </motion.div>
  )
}

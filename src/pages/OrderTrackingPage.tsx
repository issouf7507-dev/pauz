import { useEffect, useState, type FormEvent } from 'react'
import {
  ApiError,
  confirmOrder,
  fetchOrder,
  formatPrice,
  type OrderStatus,
  type PaymentMethod,
  type PublicOrder,
} from '../lib/api'
import {
  ContactFields,
  EMPTY_CONTACT,
  PaymentChoice,
  toContactPayload,
  type ContactForm,
} from '../components/ContactFields'
import { contact, telUrl, whatsappUrl } from '../data/contact'

/** Les étapes visibles par le client, dans l'ordre où elles s'enchaînent. */
const STEPS: { status: OrderStatus; label: string; hint: string }[] = [
  { status: 'PENDING', label: 'Reçue', hint: 'On t’appelle pour confirmer' },
  { status: 'CONFIRMED', label: 'Confirmée', hint: 'C’est validé avec toi' },
  { status: 'PREPARING', label: 'En préparation', hint: 'Le colis se prépare' },
  { status: 'SHIPPED', label: 'En route', hint: 'Le livreur est en chemin' },
  { status: 'DELIVERED', label: 'Livrée', hint: 'Bonne dégustation' },
]

const dateFr = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export default function OrderTrackingPage({ token }: { token: string }) {
  const [order, setOrder] = useState<PublicOrder | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [form, setForm] = useState<ContactForm>(EMPTY_CONTACT)
  const [payment, setPayment] = useState<PaymentMethod>('CASH_ON_DELIVERY')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let alive = true
    fetchOrder(token)
      .then((data) => {
        if (!alive) return
        setOrder(data)
        // Le back-office a pu pré-remplir le nom en préparant le lien.
        if (data.customerName || data.deliveryCity) {
          setForm((f) => ({
            ...f,
            customerName: data.customerName ?? f.customerName,
            deliveryCity: data.deliveryCity ?? f.deliveryCity,
          }))
        }
      })
      .catch((err) =>
        alive && setLoadError(err instanceof ApiError ? err.message : 'Commande introuvable'),
      )
    return () => {
      alive = false
    }
  }, [token])

  function set<K extends keyof ContactForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    setFieldErrors(({ [key]: _drop, ...rest }) => rest)
  }

  async function onConfirm(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    setFieldErrors({})
    try {
      await confirmOrder(token, { ...toContactPayload(form), paymentMethod: payment })
      const refreshed = await fetchOrder(token)
      setOrder(refreshed)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
        if (err.details) setFieldErrors(err.details)
      } else {
        setError('Confirmation impossible pour le moment')
      }
    } finally {
      setBusy(false)
    }
  }

  if (loadError) {
    return (
      <Frame title="Commande introuvable">
        <p className="track__lead">{loadError}</p>
        <p className="track__lead">
          Vérifie le lien reçu, ou écris-nous avec ton numéro de référence — on retrouve la commande
          en deux minutes.
        </p>
        <Aide />
      </Frame>
    )
  }

  if (!order) {
    return (
      <Frame title="Chargement…">
        <p className="track__lead">On récupère ta commande.</p>
      </Frame>
    )
  }

  // Un lien préparé par l'équipe attend d'être confirmé par le client.
  const awaitingConfirmation = order.status === 'DRAFT' && !order.expired
  const linkExpired = order.status === 'DRAFT' && order.expired
  const currentStep = STEPS.findIndex((s) => s.status === order.status)

  return (
    <Frame title={awaitingConfirmation ? 'Confirme ta commande' : `Commande ${order.reference}`}>
      {awaitingConfirmation && (
        <p className="track__lead">
          {order.customerName ? `${order.customerName}, l` : 'L'}’équipe PAUZ t’a préparé cette
          commande. Vérifie-la, complète tes coordonnées, et c’est parti.
        </p>
      )}

      {linkExpired && (
        <p className="track__alert">
          Ce lien de commande a expiré. Écris-nous : on t’en renvoie un nouveau tout de suite.
        </p>
      )}

      {order.status === 'CANCELLED' && (
        <p className="track__alert">Cette commande a été annulée. Contacte-nous si c’est une erreur.</p>
      )}

      {!awaitingConfirmation && !linkExpired && order.status !== 'CANCELLED' && (
        <ol className="track__steps">
          {STEPS.map((step, i) => (
            <li key={step.status} className={i <= currentStep ? 'is-done' : ''}>
              <span className="track__dot" />
              <b>{step.label}</b>
              <span className="track__hint">{step.hint}</span>
            </li>
          ))}
        </ol>
      )}

      <div className="track__recap">
        <ul>
          {order.items.map((item) => (
            <li key={item.productName}>
              <span>
                {item.quantity} × {item.productName}
              </span>
              <b>{formatPrice(item.total, order.currency)}</b>
            </li>
          ))}
        </ul>
        <dl>
          <div>
            <dt>Sous-total</dt>
            <dd>{formatPrice(order.subtotal, order.currency)}</dd>
          </div>
          {order.deliveryFee > 0 && (
            <div>
              <dt>Livraison</dt>
              <dd>{formatPrice(order.deliveryFee, order.currency)}</dd>
            </div>
          )}
          {order.discount > 0 && (
            <div>
              <dt>Remise</dt>
              <dd>− {formatPrice(order.discount, order.currency)}</dd>
            </div>
          )}
          <div className="track__total">
            <dt>Total</dt>
            <dd>{formatPrice(order.total, order.currency)}</dd>
          </div>
        </dl>
        <p className="track__meta">
          Référence {order.reference} · passée le {dateFr(order.createdAt)}
          {order.deliveredAt ? ` · livrée le ${dateFr(order.deliveredAt)}` : ''}
        </p>
      </div>

      {awaitingConfirmation && (
        <form className="track__form" onSubmit={onConfirm}>
          <ContactFields value={form} errors={fieldErrors} onChange={set} />
          <PaymentChoice value={payment} onChange={setPayment} />
          {error && <p className="track__alert">{error}</p>}
          <button className="btn track__submit" disabled={busy}>
            {busy ? 'Envoi…' : 'Confirmer la commande'}
          </button>
        </form>
      )}

      <Aide />
    </Frame>
  )
}

function Aide() {
  return (
    <p className="track__aide">
      Une question ? <a href={whatsappUrl('Bonjour PAUZ, au sujet de ma commande ')}>WhatsApp</a> ·{' '}
      <a href={telUrl()}>{contact.phone}</a> · <a href={`mailto:${contact.email}`}>{contact.email}</a>
    </p>
  )
}

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="track container">
      <h1 className="track__title">{title}</h1>
      {children}

      <style>{`
        .track { padding: clamp(40px, 7vw, 90px) 0 clamp(50px, 8vw, 100px); max-width: 720px; }
        .track__title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          font-weight: 600;
          letter-spacing: -.025em;
          margin-bottom: .8rem;
        }
        .track__lead { font-size: .95rem; line-height: 1.6; opacity: .78; margin-bottom: 1rem; }
        .track__alert {
          margin: 1rem 0;
          padding: 12px 14px;
          border-radius: 10px;
          background: #fdecea;
          color: #b3261e;
          font-size: .88rem;
        }

        /* ---------- étapes ---------- */
        .track__steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin: 28px 0;
        }
        @media (max-width: 640px) { .track__steps { grid-template-columns: 1fr; gap: 14px; } }
        .track__steps li { position: relative; opacity: .4; }
        .track__steps li.is-done { opacity: 1; }
        .track__dot {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--line);
          margin-bottom: 8px;
        }
        .track__steps li.is-done .track__dot { background: var(--maroon); }
        .track__steps b { display: block; font-size: .9rem; }
        .track__hint { font-size: .76rem; opacity: .7; }

        /* ---------- récapitulatif ---------- */
        .track__recap {
          border: 1.5px solid var(--line);
          border-radius: var(--radius);
          padding: 18px 20px;
          background: var(--paper);
        }
        .track__recap ul { margin-bottom: 12px; }
        .track__recap li {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 6px 0;
          font-size: .92rem;
        }
        .track__recap dl { border-top: 1px solid var(--line); padding-top: 10px; }
        .track__recap dl > div {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          font-size: .88rem;
          padding: 3px 0;
        }
        .track__recap dt { opacity: .7; }
        .track__total { font-size: 1.05rem !important; font-weight: 600; margin-top: 4px; }
        .track__meta { margin-top: 12px; font-size: .76rem; opacity: .6; }

        .track__form { margin-top: 28px; }
        .track__submit { margin-top: 22px; }
        .track__aide { margin-top: 26px; font-size: .84rem; opacity: .75; }
        .track__aide a { text-decoration: underline; }
      `}</style>
    </section>
  )
}

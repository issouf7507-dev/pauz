/**
 * Client de l'API PAUZ.
 *
 * En développement, Vite proxifie `/api` vers le serveur : le site et l'API
 * sont donc en même origine. En production, `VITE_API_URL` porte l'origine
 * complète de l'API.
 */

const BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? ''

/** Erreur renvoyée par l'API, avec son code et le détail par champ. */
export class ApiError extends Error {
  code: string
  details: Record<string, string[]> | undefined

  constructor(message: string, code: string, details?: Record<string, string[]>) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.details = details
  }
}

async function request<T>(path: string, init?: Omit<RequestInit, 'body'> & { body?: unknown }): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: init?.body ? { 'content-type': 'application/json' } : undefined,
      body: init?.body ? JSON.stringify(init.body) : undefined,
    })
  } catch {
    throw new ApiError('Serveur injoignable. Réessaie dans un instant.', 'NETWORK_ERROR')
  }

  const payload = await res.json().catch(() => null)

  if (!res.ok) {
    const error = payload?.error
    throw new ApiError(
      error?.message ?? 'Une erreur est survenue',
      error?.code ?? 'UNKNOWN',
      error?.details,
    )
  }

  return payload.data as T
}

export type ApiProduct = {
  id: string
  slug: string
  name: string
  description: string | null
  price: number
  size: string | null
  stock: number | null
}

export type PaymentMethod = 'CASH_ON_DELIVERY' | 'MOBILE_MONEY' | 'BANK_TRANSFER'

export type OrderPayload = {
  customerName: string
  customerPhone: string
  customerEmail?: string
  deliveryCity?: string
  deliveryAddress?: string
  deliveryNote?: string
  paymentMethod: PaymentMethod
  items: { productId: string; quantity: number }[]
}

export type OrderConfirmation = {
  reference: string
  total: number
  currency: string
  status: string
  trackUrl: string
}

/** Commande lue par son jeton public : suivi, ou lien envoyé par le back-office. */
export type PublicOrder = {
  reference: string
  status: OrderStatus
  source: 'WEBSITE' | 'LINK' | 'BACKOFFICE'
  expired: boolean
  items: { productName: string; unitPrice: number; quantity: number; total: number }[]
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  currency: string
  customerName: string | null
  deliveryCity: string | null
  createdAt: string
  deliveredAt: string | null
}

export type OrderStatus =
  | 'DRAFT'
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'

export type ConfirmPayload = Omit<OrderPayload, 'items'>

/** Le jeu à gratter : campagne en cours et lots à afficher. */
export type PrizeType = 'PRODUCT' | 'DISCOUNT' | 'CASH' | 'GOODIE'

export type ApiPrize = {
  name: string
  description: string | null
  type: PrizeType
  value: number | null
  imageUrl: string | null
}

export type ApiCampaign = {
  slug: string
  name: string
  description: string | null
  endsAt: string
  maxScansPerPhonePerDay: number
  prizes: ApiPrize[]
}

export type ScanResult = {
  result: 'WIN' | 'LOSE'
  prize: ApiPrize | null
  claimCode: string | null
  claimExpiresAt: string | null
}

export const fetchCampaign = () => request<ApiCampaign | null>('/api/scan/campaign')

export const playCode = (payload: { code: string; phone: string; name?: string }) =>
  request<ScanResult>('/api/scan', { method: 'POST', body: payload })

export const fetchProducts = () => request<ApiProduct[]>('/api/products')

export const fetchOrder = (token: string) => request<PublicOrder>(`/api/orders/${encodeURIComponent(token)}`)

export const confirmOrder = (token: string, payload: ConfirmPayload) =>
  request<{ reference: string; status: OrderStatus; total: number; currency: string }>(
    `/api/orders/${encodeURIComponent(token)}/confirm`,
    { method: 'POST', body: payload },
  )

export const createOrder = (payload: OrderPayload) =>
  request<OrderConfirmation>('/api/orders', { method: 'POST', body: payload })

/** 12000 → « 12 000 FCFA » */
export function formatPrice(amount: number, currency = 'FCFA') {
  return `${new Intl.NumberFormat('fr-FR').format(amount)} ${currency}`
}

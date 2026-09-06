import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import OrderDialog from '../components/OrderDialog'

type OrderState = {
  /** Ouvre le tunnel de commande, éventuellement sur une quantité précise. */
  openOrder: (quantity?: number) => void
}

const OrderContext = createContext<OrderState | null>(null)

/**
 * Pas de panier : chaque bouton du site ouvre directement le formulaire de
 * commande, avec la quantité que ce bouton propose (une canette, un pack).
 */
export function OrderProvider({ children }: { children: ReactNode }) {
  const [quantity, setQuantity] = useState<number | null>(null)

  const openOrder = useCallback((qty = 1) => setQuantity(qty), [])
  const close = useCallback(() => setQuantity(null), [])

  const value = useMemo(() => ({ openOrder }), [openOrder])

  return (
    <OrderContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {quantity !== null && <OrderDialog initialQuantity={quantity} onClose={close} />}
      </AnimatePresence>
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrder doit être utilisé dans un OrderProvider')
  return context
}

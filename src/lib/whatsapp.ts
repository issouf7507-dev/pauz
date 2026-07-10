import { BRAND, fcfa, type Pack } from '@/data/site'

/** Construit un lien wa.me avec message pré-rempli. */
export function waLink(message: string, phone: string = BRAND.whatsapp) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function orderMessage(pack: Pack, qty = 1) {
  const total = pack.price * qty
  return (
    `Bonjour PAUZ 🥥 ! Je souhaite commander :\n` +
    `• ${pack.name} (${pack.units} canette${pack.units > 1 ? 's' : ''})\n` +
    `• Quantité : ${qty}\n` +
    `• Total : ${fcfa(total)}\n\n` +
    `Merci de me confirmer la livraison.`
  )
}

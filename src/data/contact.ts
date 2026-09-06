/**
 * Coordonnées publiques de PAUZ. Tout le site les lit ici : un seul endroit à
 * modifier si le numéro ou l'adresse changent.
 */
export const contact = {
  /** Format international sans espaces ni « + », tel qu'attendu par wa.me. */
  whatsapp: '2250152431010',
  /** Même ligne que WhatsApp, en affichage groupé. */
  phone: '+225 01 52 43 10 10',
  email: 'Tonmomentpauz@gmail.com',
}

/** Lien WhatsApp avec un message pré-rempli. */
export const whatsappUrl = (message = 'Bonjour PAUZ, ') =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`

/** Lien téléphonique : les espaces d'affichage ne passent pas dans un tel:. */
export const telUrl = () => `tel:${contact.phone.replace(/\s/g, '')}`

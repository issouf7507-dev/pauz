export type Product = {
  id: string
  name: string
  flavor: string
  price: string
  size: string
  tagline: string
  body: string
  specs: { label: string; value: string }[]
}

/** Le seul produit PAUZ commercialisé pour le moment. */
export const product: Product = {
  id: 'pauz-coconut-water',
  name: 'PAUZ Eau de coco',
  flavor: '100 % eau de coco',
  price: '1 000 FCFA',
  size: '330 ml',
  tagline: 'Une canette. Rien à ajouter.',
  body: "De l’eau de coco pure, mise en canette à froid, et rien d’autre. Sans sucre ajouté, sans concentré, sans colorant — juste l’hydratation nette et naturellement douce dont tu as envie après le soleil, la salle, ou une longue journée.",
  specs: [
    { label: 'Format', value: 'Canette slim 330 ml' },
    { label: 'Sucres', value: 'Sans sucre ajouté' },
    { label: 'Ingrédients', value: '100 % eau de coco' },
    { label: 'Service', value: 'Bien fraîche, à la canette' },
  ],
}

export const testimonials = [
  { rating: 5, title: 'Le goût de la vraie', body: 'J’étais sceptique sur l’eau de coco en canette, mais celle-ci a vraiment le goût du frais — pas le truc plat et sirupeux qu’on obtient à partir de concentré. C’est devenue ma boisson d’après-course.', author: 'Tina A.' },
  { rating: 5, title: 'Enfin sans sucre ajouté', body: 'Je lis toutes les étiquettes et celle-ci est d’un ennui rafraîchissant : de l’eau de coco, et c’est tout. Légère, nette, et pas bizarrement sucrée comme les autres.', author: 'Sara M.' },
  { rating: 5, title: 'Parfaite sortie du frigo', body: 'J’en garde toujours quelques-unes au frais. Froide, directement à la canette, un après-midi de chaleur : c’est tout l’intérêt — pas de verre, pas de pulpe, rien à ajouter.', author: 'Nina K.' },
]

export const moments = [
  { title: 'Après le soleil', body: 'Les journées plage, les longues marches, les après-midi plus chauds que prévu. Naturellement isotonique, elle remet ce que la chaleur a pris — froide, directement à la canette.' },
  { title: 'Après le sport', body: 'Du potassium et des électrolytes naturels sans sucre ajouté, pour les vingt minutes après la dernière série, quand l’eau seule ne suffit pas tout à fait.' },
  { title: 'La pause de midi', body: 'L’intervalle entre deux réunions, le retour du déjeuner. Une canette, quatre minutes, et le reste de la journée repart de plus haut.' },
  { title: 'La fin de journée', body: 'Quand tu veux quelque chose de froid qui ne soit pas sucré, pas caféiné, et qui ne te demande rien. Juste de l’eau de coco, et rien à ajouter.' },
]

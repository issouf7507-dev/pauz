/**
 * Politiques et conditions du site.
 *
 * ⚠️ BROUILLON. Le contenu décrit fidèlement le fonctionnement réel du site
 * (ce qui est collecté, comment on paie, comment on est livré), mais tout ce
 * qui relève de l'identité légale et des délais commerciaux est laissé entre
 * crochets : ces valeurs doivent être renseignées, et l'ensemble relu, avant
 * la mise en ligne.
 */

export type LegalDoc = {
  slug: string
  path: string
  title: string
  summary: string
  sections: { title: string; paragraphs: string[] }[]
}

const IDENTITE =
  '[Raison sociale], [forme juridique] au capital de [capital], immatriculée au RCCM sous le numéro [RCCM], dont le siège est situé [adresse complète], Abidjan, Côte d’Ivoire.'

export const legalDocs: LegalDoc[] = [
  {
    slug: 'conditions-generales',
    path: '/politiques/conditions-generales',
    title: 'Conditions générales de vente',
    summary:
      'Les règles qui s’appliquent à toute commande passée sur ce site : qui vend, ce qui est vendu, à quel prix, et comment la commande se déroule.',
    sections: [
      {
        title: '1. Le vendeur',
        paragraphs: [
          `Le site est édité et exploité par ${IDENTITE}`,
          'Toute question relative à une commande peut être adressée aux coordonnées indiquées en bas de page.',
        ],
      },
      {
        title: '2. Les produits',
        paragraphs: [
          'PAUZ commercialise une boisson à base d’eau de coco 100 % pure, conditionnée en canette de 330 ml. Les photographies présentées sur le site sont les plus fidèles possibles ; elles n’engagent pas au-delà des caractéristiques décrites sur la fiche produit et sur l’étiquette.',
          'Il s’agit d’un produit alimentaire et non d’un médicament : il n’est destiné à diagnostiquer, traiter, guérir ni prévenir aucune maladie.',
        ],
      },
      {
        title: '3. Prix',
        paragraphs: [
          'Les prix sont affichés en francs CFA (XOF), toutes taxes comprises. Le prix retenu est celui affiché au moment de la validation de la commande : une évolution ultérieure du tarif est sans effet sur une commande déjà enregistrée.',
          'Les frais de livraison éventuels sont annoncés lors de l’appel de confirmation et s’ajoutent au sous-total affiché.',
        ],
      },
      {
        title: '4. Commande',
        paragraphs: [
          'La commande se passe directement depuis le site : quantité, coordonnées, mode de paiement. Aucun compte client n’est nécessaire — une commande est identifiée par son numéro de référence et par le numéro de téléphone renseigné.',
          'La commande est enregistrée avec le statut « en attente ». Elle n’est ferme qu’après confirmation par notre équipe, par téléphone, sur le numéro que vous avez indiqué. Nous pouvons refuser une commande en cas de coordonnées manifestement erronées, de zone non desservie, d’indisponibilité du produit ou d’impayé antérieur.',
        ],
      },
      {
        title: '5. Paiement',
        paragraphs: [
          'Trois modes de paiement sont proposés : espèces à la livraison, Mobile Money, et virement bancaire. Pour le virement, les coordonnées bancaires vous sont communiquées après validation de la commande.',
          'Aucune donnée de paiement n’est saisie sur ce site : le règlement se fait à la livraison ou par les canaux communiqués par notre équipe.',
        ],
      },
      {
        title: '6. Livraison',
        paragraphs: [
          'Les modalités, zones et délais de livraison sont détaillés dans la politique de livraison.',
        ],
      },
      {
        title: '7. Réclamations et remboursement',
        paragraphs: [
          'Les conditions de réclamation, d’échange et de remboursement sont détaillées dans la politique de remboursement.',
        ],
      },
      {
        title: '8. Données personnelles',
        paragraphs: [
          'Le traitement des informations que vous nous confiez est décrit dans la politique de confidentialité.',
        ],
      },
      {
        title: '9. Droit applicable',
        paragraphs: [
          'Les présentes conditions sont soumises au droit ivoirien. En cas de différend, une solution amiable sera recherchée en priorité ; à défaut, le litige relèvera des tribunaux compétents d’Abidjan.',
        ],
      },
    ],
  },
  {
    slug: 'livraison',
    path: '/politiques/livraison',
    title: 'Politique de livraison',
    summary: 'Où nous livrons, en combien de temps, et ce qui se passe le jour de la livraison.',
    sections: [
      {
        title: 'Zones desservies',
        paragraphs: [
          'Nous livrons à Abidjan et [zones desservies à compléter]. Si votre adresse se trouve hors zone, notre équipe vous le dit lors de l’appel de confirmation et la commande est annulée sans frais.',
        ],
      },
      {
        title: 'Délais',
        paragraphs: [
          'Après confirmation téléphonique, la livraison intervient sous [délai à compléter] jours ouvrés. Les commandes passées le week-end ou un jour férié sont traitées le jour ouvré suivant.',
          'Ces délais sont indicatifs. En cas de retard, nous vous prévenons sur le numéro renseigné à la commande.',
        ],
      },
      {
        title: 'Frais',
        paragraphs: [
          'Les frais de livraison s’élèvent à [montant à compléter] et sont annoncés lors de l’appel de confirmation, avant tout engagement de votre part. [Condition de gratuité éventuelle à compléter.]',
        ],
      },
      {
        title: 'Le jour de la livraison',
        paragraphs: [
          'Le livreur vous appelle avant de se présenter. Merci de rester joignable au numéro indiqué : sans réponse après [nombre] tentatives, la livraison est reprogrammée.',
          'Vérifiez les canettes en présence du livreur. Toute anomalie constatée à la réception doit être signalée immédiatement, ce qui simplifie l’échange.',
        ],
      },
      {
        title: 'Conservation',
        paragraphs: [
          'La boisson se sert bien fraîche et se consomme dans les jours qui suivent l’ouverture. Nous vous conseillons de la placer au frais dès réception.',
        ],
      },
    ],
  },
  {
    slug: 'remboursement',
    path: '/politiques/remboursement',
    title: 'Politique de remboursement',
    summary: 'Ce que nous faisons si le produit ne va pas, et comment nous joindre pour une réclamation.',
    sections: [
      {
        title: 'Produit abîmé ou non conforme',
        paragraphs: [
          'Si une canette arrive percée, bosselée au point de fuir, ou si la commande ne correspond pas à ce que vous avez validé, nous la remplaçons ou la remboursons intégralement. Signalez-le dans les [délai à compléter] heures suivant la livraison, photo à l’appui.',
        ],
      },
      {
        title: 'Denrée alimentaire',
        paragraphs: [
          'S’agissant d’un produit alimentaire, une canette ouverte ne peut être ni reprise ni échangée, sauf défaut manifeste du produit. Cette restriction ne prive d’aucun droit garanti par la loi en cas de produit impropre à la consommation.',
        ],
      },
      {
        title: 'Annulation',
        paragraphs: [
          'Tant que la commande n’est pas expédiée, vous pouvez l’annuler sans frais : appelez-nous ou écrivez-nous avec votre numéro de référence.',
        ],
      },
      {
        title: 'Modalités de remboursement',
        paragraphs: [
          'Le remboursement est effectué par le canal utilisé pour le paiement — espèces, Mobile Money ou virement — sous [délai à compléter] jours ouvrés après accord.',
        ],
      },
      {
        title: 'Nous joindre',
        paragraphs: [
          'Munissez-vous de votre numéro de référence (format PAUZ-XXXXXX), reçu à la validation de la commande. Nos coordonnées figurent en bas de chaque page.',
        ],
      },
    ],
  },
  {
    slug: 'confidentialite',
    path: '/politiques/confidentialite',
    title: 'Politique de confidentialité',
    summary: 'Ce que nous collectons, pourquoi, combien de temps, et ce que vous pouvez exiger.',
    sections: [
      {
        title: 'Responsable du traitement',
        paragraphs: [
          `Les données collectées sur ce site sont traitées par ${IDENTITE}`,
          'Pour toute demande relative à vos données, écrivez-nous aux coordonnées indiquées en bas de page.',
        ],
      },
      {
        title: 'Ce que nous collectons',
        paragraphs: [
          'Au moment de la commande : votre nom, votre numéro de téléphone, et — si vous les renseignez — votre adresse email, votre ville, votre adresse de livraison et vos précisions de livraison.',
          'Le numéro de téléphone sert d’identifiant client : il permet de rattacher vos commandes successives sans vous demander de créer un compte ni un mot de passe.',
          'Nous ne collectons aucune donnée bancaire : aucun moyen de paiement n’est saisi sur ce site.',
        ],
      },
      {
        title: 'Pourquoi',
        paragraphs: [
          'Ces informations servent exclusivement à traiter la commande : vous rappeler pour la confirmer, préparer le colis, vous livrer, et gérer une éventuelle réclamation. Elles alimentent aussi notre historique de commandes, nécessaire à notre comptabilité.',
          'Nous ne vous envoyons pas de message commercial sans votre accord, et nous ne vendons ni ne louons vos données.',
        ],
      },
      {
        title: 'Qui y a accès',
        paragraphs: [
          'Les membres de l’équipe PAUZ habilités, via un back-office protégé par mot de passe, ainsi que le livreur pour les seules informations nécessaires à la livraison. Nos prestataires techniques (hébergement) peuvent y accéder dans la stricte mesure de leur mission.',
        ],
      },
      {
        title: 'Combien de temps',
        paragraphs: [
          'Les données liées à une commande sont conservées [durée à compléter] à compter de la livraison, notamment pour répondre à nos obligations comptables. Passé ce délai, elles sont supprimées ou anonymisées.',
        ],
      },
      {
        title: 'Cookies',
        paragraphs: [
          'Ce site ne dépose aucun cookie publicitaire ni aucun traceur de mesure d’audience. Seules les données strictement nécessaires à votre commande sont transmises au serveur.',
        ],
      },
      {
        title: 'Vos droits',
        paragraphs: [
          'Vous pouvez demander l’accès à vos données, leur rectification ou leur suppression, dans les conditions prévues par la loi ivoirienne n° 2013-450 relative à la protection des données à caractère personnel. Écrivez-nous avec votre numéro de téléphone de commande : nous répondons sous [délai à compléter] jours.',
        ],
      },
    ],
  },
]

export const findLegalDoc = (path: string) => legalDocs.find((doc) => doc.path === path)

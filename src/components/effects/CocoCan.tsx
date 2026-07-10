/**
 * Canette PAUZ stylisée en SVG — pas d'image externe, léger et net à toute taille.
 * Les gouttes de condensation ont la classe `.can-drop` pour être animées par le parent.
 */
export default function CocoCan({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 420"
      role="img"
      aria-label="Canette PAUZ eau de coco 330ml"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="canBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0f3d16" />
          <stop offset="0.18" stopColor="#1c6b28" />
          <stop offset="0.5" stopColor="#2f9c3c" />
          <stop offset="0.82" stopColor="#15561f" />
          <stop offset="1" stopColor="#0c3312" />
        </linearGradient>
        <linearGradient id="canMetal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7b8a7c" />
          <stop offset="0.5" stopColor="#e8f0e9" />
          <stop offset="1" stopColor="#6d7a6e" />
        </linearGradient>
        <radialGradient id="canGloss" cx="0.32" cy="0.25" r="0.7">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Top rim */}
      <ellipse cx="110" cy="40" rx="66" ry="16" fill="url(#canMetal)" />
      <ellipse cx="110" cy="36" rx="60" ry="13" fill="#0c3312" />
      <ellipse cx="110" cy="35" rx="60" ry="12" fill="none" stroke="#3fae4a" strokeWidth="1.5" opacity="0.6" />

      {/* Body */}
      <path
        d="M46 44 Q44 60 44 90 L44 360 Q44 392 110 400 Q176 392 176 360 L176 90 Q176 60 174 44 Q150 60 110 60 Q70 60 46 44 Z"
        fill="url(#canBody)"
      />
      {/* Gloss highlight */}
      <path
        d="M46 44 Q44 60 44 90 L44 360 Q44 392 110 400 Q176 392 176 360 L176 90 Q176 60 174 44 Q150 60 110 60 Q70 60 46 44 Z"
        fill="url(#canGloss)"
      />

      {/* Brand mark */}
      <g transform="translate(110 180)" textAnchor="middle" fill="#ffffff">
        {/* drop logo */}
        <path
          d="M0 -46 C 20 -18, 26 -4, 26 10 A 26 26 0 1 1 -26 10 C -26 -4, -20 -18, 0 -46 Z"
          fill="#eafbe9"
        />
        <circle cx="-8" cy="6" r="7" fill="#2f9c3c" opacity="0.85" />
        <text
          y="86"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="42"
          letterSpacing="2"
        >
          PAUZ
        </text>
        <text
          y="118"
          fontFamily="'Inter', sans-serif"
          fontWeight="600"
          fontSize="13"
          letterSpacing="3"
          fillOpacity="0.75"
        >
          EAU DE COCO
        </text>
        <text
          y="150"
          fontFamily="'Inter', sans-serif"
          fontWeight="500"
          fontSize="11"
          letterSpacing="2"
          fillOpacity="0.55"
        >
          330 ML · 100% NATUREL
        </text>
      </g>

      {/* Condensation drops */}
      <g fill="#dff7e0">
        <circle className="can-drop" cx="66" cy="130" r="4" opacity="0.7" />
        <circle className="can-drop" cx="158" cy="170" r="3" opacity="0.6" />
        <circle className="can-drop" cx="60" cy="250" r="5" opacity="0.65" />
        <circle className="can-drop" cx="162" cy="300" r="4" opacity="0.55" />
        <circle className="can-drop" cx="80" cy="340" r="3" opacity="0.6" />
        <circle className="can-drop" cx="150" cy="360" r="3" opacity="0.5" />
      </g>

      {/* Bottom */}
      <ellipse cx="110" cy="400" rx="66" ry="14" fill="#0a2b0e" />
    </svg>
  )
}

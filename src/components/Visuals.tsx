/* Original SVG product visuals — cans & gummy pouches drawn in code. */

export function Wordmark({ color = 'currentColor', size = 30 }: { color?: string; size?: number }) {
  return (
    <span
      className="script"
      style={{ fontSize: size, color, lineHeight: 1, display: 'inline-block' }}
    >
      PAUZ
    </span>
  )
}

export function Sun({ size = 18, color = 'var(--yellow)' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="5" fill={color} />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x="11.2"
          y="0.5"
          width="1.6"
          height="4"
          rx="0.8"
          fill={color}
          transform={`rotate(${i * 45} 12 12)`}
        />
      ))}
    </svg>
  )
}

export function Can({ body, cap }: { body: string; cap: string }) {
  return (
    <svg viewBox="0 0 140 260" width="100%" style={{ display: 'block' }} aria-hidden>
      <defs>
        <linearGradient id={`sheen-${body}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      {/* body */}
      <rect x="18" y="26" width="104" height="210" rx="16" fill={body} />
      <rect x="18" y="26" width="104" height="210" rx="16" fill={`url(#sheen-${body})`} />
      {/* top rim */}
      <ellipse cx="70" cy="30" rx="52" ry="12" fill={cap} />
      <ellipse cx="70" cy="27" rx="40" ry="8" fill={body} opacity="0.85" />
      {/* bottom */}
      <ellipse cx="70" cy="234" rx="52" ry="11" fill={cap} opacity="0.9" />
      {/* label band */}
      <rect x="18" y="96" width="104" height="70" fill="#fff" opacity="0.12" />
      <text
        x="70"
        y="138"
        textAnchor="middle"
        fontFamily="Pacifico, cursive"
        fontSize="26"
        fill="#fff"
      >
        PAUZ
      </text>
    </svg>
  )
}

export function Pouch({ body, accent }: { body: string; accent: string }) {
  return (
    <svg viewBox="0 0 180 220" width="100%" style={{ display: 'block' }} aria-hidden>
      <defs>
        <linearGradient id={`pg-${accent}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.16" />
        </linearGradient>
      </defs>
      {/* crimped top */}
      <rect x="34" y="10" width="112" height="14" rx="3" fill={accent} opacity="0.55" />
      {/* body */}
      <path
        d="M30 24 h120 a8 8 0 0 1 8 8 v168 a8 8 0 0 1 -8 8 h-120 a8 8 0 0 1 -8 -8 v-168 a8 8 0 0 1 8 -8 Z"
        fill={body}
      />
      <path
        d="M30 24 h120 a8 8 0 0 1 8 8 v168 a8 8 0 0 1 -8 8 h-120 a8 8 0 0 1 -8 -8 v-168 a8 8 0 0 1 8 -8 Z"
        fill={`url(#pg-${accent})`}
      />
      {/* label */}
      <circle cx="90" cy="96" r="42" fill="#fff" opacity="0.15" />
      <text x="90" y="104" textAnchor="middle" fontFamily="Pacifico, cursive" fontSize="26" fill="#fff">
        PAUZ
      </text>
      <rect x="52" y="150" width="76" height="8" rx="4" fill="#fff" opacity="0.4" />
      <rect x="66" y="166" width="48" height="6" rx="3" fill="#fff" opacity="0.28" />
    </svg>
  )
}

export function Stars({ n = 5, color = 'var(--orange)' }: { n?: number; color?: string }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, color }} aria-label={`${n} sur 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={color} aria-hidden>
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
        </svg>
      ))}
    </span>
  )
}

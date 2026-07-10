/**
 * Petit glyphe « pixel » (grille de carrés) façon lessestudio.
 * Déterministe à partir d'un seed → motif stable et reproductible.
 */
interface PixelGlyphProps {
  seed: number
  size?: number
  className?: string
}

const GRID = 5

function pattern(seed: number): boolean[] {
  const cells: boolean[] = []
  let s = seed * 2654435761
  for (let i = 0; i < GRID * GRID; i++) {
    s = (s ^ (s << 13)) >>> 0
    s = (s ^ (s >> 17)) >>> 0
    s = (s ^ (s << 5)) >>> 0
    const col = i % GRID
    // symétrie miroir horizontale pour un rendu « icône »
    if (col > Math.floor(GRID / 2)) {
      const mirror = i - 2 * (col - Math.floor(GRID / 2))
      cells[i] = cells[mirror]
    } else {
      cells[i] = (s & 7) > 3
    }
  }
  return cells
}

export default function PixelGlyph({ seed, size = 22, className = '' }: PixelGlyphProps) {
  const cells = pattern(seed)
  const gap = Math.max(1, Math.round(size / 14))
  return (
    <span
      className={`pixel-glyph ${className}`}
      aria-hidden="true"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID}, 1fr)`,
        gap,
        width: size,
        height: size,
      }}
    >
      {cells.map((on, i) => (
        <span
          key={i}
          style={{
            borderRadius: 1,
            background: on ? 'currentColor' : 'transparent',
          }}
        />
      ))}
    </span>
  )
}

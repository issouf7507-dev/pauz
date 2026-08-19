/* "Quick Add" CTA with the diagonal double-arrow slide-on-hover effect. */

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5.83398 14.1663L14.1673 5.83301M14.1673 5.83301H5.83398M14.1673 5.83301V14.1663"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function QuickAdd({
  label = 'Ajout rapide',
  onClick,
}: {
  label?: string
  onClick?: () => void
}) {
  return (
    <button className="qadd" type="button" onClick={onClick} data-cart="add">
      <span className="qadd__label">{label}</span>
      <span className="qadd__arrows">
        <Arrow />
        <Arrow />
      </span>

      <style>{`
        .qadd {
          display: inline-flex;
          align-items: center;
          gap: 0.7em;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.66rem;
          font-weight: 600;
          padding: 0.5em 0.5em 0.5em 1.1em;
          border-radius: 999px;
          border: 1.5px solid var(--line);
          color: var(--maroon);
          background: transparent;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .qadd:hover {
          background: var(--maroon);
          color: var(--cream);
          border-color: var(--maroon);
        }

        .qadd__arrows {
          position: relative;
          width: 24px;
          height: 24px;
          flex: none;
          border-radius: 50%;
          overflow: hidden;
          background: var(--maroon);
          color: var(--cream);
          display: grid;
          place-items: center;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .qadd:hover .qadd__arrows {
          background: var(--cream);
          color: var(--maroon);
        }

        .qadd__arrows svg {
          position: absolute;
          width: 13px;
          height: 13px;
          transition: transform 0.45s cubic-bezier(0.65, 0, 0.35, 1);
        }
        /* first arrow rests centered; second waits off-screen bottom-left */
        .qadd__arrows svg:first-child { transform: translate(0, 0); }
        .qadd__arrows svg:last-child { transform: translate(-130%, 130%); }
        /* on hover: first exits top-right, second slides in to center */
        .qadd:hover .qadd__arrows svg:first-child { transform: translate(130%, -130%); }
        .qadd:hover .qadd__arrows svg:last-child { transform: translate(0, 0); }

        @media (prefers-reduced-motion: reduce) {
          .qadd__arrows svg { transition: none; }
        }
      `}</style>
    </button>
  )
}

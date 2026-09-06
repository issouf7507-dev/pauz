import type { LegalDoc } from '../data/legal'
import { legalDocs } from '../data/legal'

/** Une politique du site : titre, résumé, sections, et les autres en bas. */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="legal container">
      <h1 className="legal__title">{doc.title}</h1>
      <p className="legal__summary">{doc.summary}</p>

      {doc.sections.map((section) => (
        <section className="legal__section" key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>
      ))}

      <nav className="legal__others" aria-label="Autres politiques">
        {legalDocs
          .filter((other) => other.slug !== doc.slug)
          .map((other) => (
            <a key={other.slug} href={other.path}>
              {other.title}
            </a>
          ))}
      </nav>

      <style>{`
        .legal { padding: clamp(40px, 7vw, 90px) 0 clamp(50px, 8vw, 100px); max-width: 760px; }
        .legal__title {
          font-family: var(--font-display);
          font-size: clamp(1.9rem, 5vw, 3rem);
          font-weight: 600;
          letter-spacing: -.025em;
        }
        .legal__summary { margin: .9rem 0 2.4rem; font-size: 1rem; line-height: 1.6; opacity: .78; }
        .legal__section { margin-bottom: 2rem; }
        .legal__section h2 {
          font-family: var(--font-mono);
          font-size: .72rem;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--maroon);
          margin-bottom: .7rem;
        }
        .legal__section p { font-size: .93rem; line-height: 1.7; margin-bottom: .8rem; }
        .legal__others {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 18px;
          padding-top: 22px;
          border-top: 1.5px solid var(--line);
          font-family: var(--font-mono);
          font-size: .68rem;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .legal__others a { text-decoration: underline; opacity: .75; }
        .legal__others a:hover { opacity: 1; }
      `}</style>
    </article>
  )
}

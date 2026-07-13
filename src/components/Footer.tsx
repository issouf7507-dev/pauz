import { Wordmark, Sun } from './Visuals'

const columns = [
  { title: 'Drinks', links: ['Tropical Tangerine', 'Lush Cherry', 'Wild Berries', 'Variety Pack'] },
  { title: 'Gummies', links: ['Social Spark', 'Sweet Dreams', 'Pure Zen', 'Stress Melt', 'Daily Elevation'] },
  { title: 'Learn', links: ['About Us', 'FAQ'] },
  { title: 'Account', links: ['Contact Us', 'My Account', 'Lab Results'] },
  { title: 'Policies', links: ['Refund Policy', 'Privacy Policy', 'Shipping Policy', 'Terms of Service'] },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Wordmark size={40} color="var(--cream)" />
          <p>Clean, functional, feel-good drinks &amp; gummies for your most joyful moments.</p>
        </div>
        <div className="footer__cols">
          {columns.map((c) => (
            <div key={c.title} className="footer__col">
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer__disclaimer container">
        <p>
          These statements have not been evaluated by the FDA. Products are not intended to diagnose,
          treat, cure, or prevent any disease. Products contain a THC serving — must be 21+ to purchase.
          Please enjoy responsibly.
        </p>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <span>© {new Date().getFullYear()} PAUZ. All rights reserved.</span>
          <span className="footer__suns">
            <Sun size={14} color="var(--orange-soft)" />
            <Sun size={14} color="var(--yellow)" />
          </span>
        </div>
      </div>

      <style>{`
        .footer { background: var(--maroon-deep); color: var(--cream); }
        .footer__top {
          display: grid;
          grid-template-columns: 1.2fr 3fr;
          gap: clamp(24px, 4vw, 60px);
          padding: clamp(50px, 7vw, 90px) 0 40px;
        }
        @media (max-width: 820px) { .footer__top { grid-template-columns: 1fr; } }
        .footer__brand p { margin-top: 1rem; max-width: 260px; opacity: .7; font-size: .85rem; line-height: 1.5; }
        .footer__cols {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }
        @media (max-width: 720px) { .footer__cols { grid-template-columns: repeat(2, 1fr); gap: 28px; } }
        .footer__col h4 {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .1em;
          font-size: .68rem;
          margin-bottom: 1rem;
          color: var(--orange-soft);
        }
        .footer__col li { margin-bottom: .55rem; }
        .footer__col a { font-size: .82rem; opacity: .8; transition: opacity .2s; }
        .footer__col a:hover { opacity: 1; }
        .footer__disclaimer {
          padding: 24px 0;
          border-top: 1px solid rgba(255,255,255,.1);
        }
        .footer__disclaimer p { font-size: .66rem; line-height: 1.6; opacity: .5; max-width: 900px; }
        .footer__bar { background: rgba(0,0,0,.2); }
        .footer__bar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          font-family: var(--font-mono);
          font-size: .64rem;
          letter-spacing: .06em;
          text-transform: uppercase;
          opacity: .7;
        }
        .footer__suns { display: inline-flex; gap: 6px; }
      `}</style>
    </footer>
  )
}

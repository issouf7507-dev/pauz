import { useReveal } from '../hooks/useReveal'
import SplitReveal from './SplitReveal'
import { Can } from './Visuals'

const clouds = [
  { text: 'L-Theanine — focus & calm', x: '6%', y: '8%' },
  { text: 'Panax Ginseng — natural energy', x: '72%', y: '4%' },
  { text: 'Vitamin B — for sharper mood', x: '80%', y: '46%' },
  { text: 'Real fruit juice, no added sugar', x: '2%', y: '52%' },
  { text: 'Monk fruit — a natural sweetener', x: '74%', y: '82%' },
]

const lineup = [
  { body: '#c5dd7f', cap: '#9ec27a', label: 'Daily Elevation' },
  { body: '#2e7d32', cap: '#1b5e20', label: 'Wild Berries' },
  { body: '#4a9a4e', cap: '#2e7d32', label: 'Lush Cherry' },
  { body: '#1b5e20', cap: '#123018', label: 'Pure Zen' },
]

export default function FunctionMeetsFun() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.08 })
  return (
    <section className="fmf" ref={ref}>
      <div className="container">
        <div className="fmf__head reveal">
          <SplitReveal as="h2" className="section-title">
            Where Function
            <br /> Meets Fun
          </SplitReveal>
          <p className="fmf__intro">
            We provide joy-enhancing alternatives that match your better-for-you lifestyle choices.
          </p>
          <a href="#learn" className="btn btn--ghost">
            Learn More
          </a>
        </div>

        <div className="fmf__stage">
          {clouds.map((c, i) => (
            <div className="cloud reveal" key={i} style={{ left: c.x, top: c.y }}>
              {c.text}
            </div>
          ))}

          <div className="fmf__lineup reveal">
            {lineup.map((p, i) => (
              <div className="fmf__can" key={i} style={{ zIndex: i === 1 || i === 2 ? 3 : 2 }}>
                <Can body={p.body} cap={p.cap} />
                <span className="fmf__label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .fmf { padding: clamp(60px, 8vw, 110px) 0; text-align: center; }
        .fmf__head { max-width: 620px; margin: 0 auto 1rem; display: flex; flex-direction: column; align-items: center; gap: 1.2rem; }
        .fmf__intro { font-size: .9rem; opacity: .75; max-width: 380px; line-height: 1.5; }
        .fmf__stage { position: relative; margin-top: 1rem; min-height: 440px; }
        .fmf__lineup {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: clamp(-10px, -1vw, 0px);
          height: 100%;
          padding-top: 40px;
        }
        .fmf__can { width: clamp(120px, 15vw, 190px); margin: 0 -12px; transition: transform .3s ease; }
        .fmf__can:hover { transform: translateY(-10px); }
        .fmf__label {
          display: block;
          font-family: var(--font-mono);
          text-transform: uppercase;
          font-size: .6rem;
          letter-spacing: .1em;
          margin-top: .6rem;
          opacity: .7;
        }
        .cloud {
          position: absolute;
          z-index: 5;
          max-width: 180px;
          background: var(--paper);
          border: 1.5px solid var(--line);
          border-radius: 40px;
          padding: 12px 16px;
          font-family: var(--font-mono);
          font-size: .62rem;
          line-height: 1.35;
          text-transform: uppercase;
          letter-spacing: .05em;
          color: var(--maroon-deep);
          box-shadow: 0 8px 24px rgba(58,20,16,.08);
        }
        .cloud::after {
          content: '';
          position: absolute;
          bottom: -7px; left: 30px;
          width: 12px; height: 12px;
          background: var(--paper);
          border-right: 1.5px solid var(--line);
          border-bottom: 1.5px solid var(--line);
          transform: rotate(45deg);
        }
        @media (max-width: 760px) {
          .cloud { display: none; }
          .fmf__stage { min-height: 320px; }
        }
      `}</style>
    </section>
  )
}

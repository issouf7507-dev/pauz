import Reveal from '@/components/ui/Reveal'
import { useGsap, prefersReducedMotion } from '@/lib/useGsap'
import { gsap } from '@/lib/gsap'
import { PRIZES } from '@/data/site'
import './prizes.css'

export default function Prizes() {
  const scope = useGsap((_self, root) => {
    if (prefersReducedMotion()) return
    const shines = root.querySelectorAll<HTMLElement>('.prize__shine')
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.4,
      scrollTrigger: {
        trigger: root,
        start: 'top 75%',
        toggleActions: 'play pause resume pause',
      },
    })
    shines.forEach((el) => {
      tl.fromTo(
        el,
        { xPercent: -140, opacity: 0 },
        { xPercent: 140, opacity: 1, duration: 0.85, ease: 'power2.inOut' },
        '>-0.55',
      )
    })
  }, [])

  return (
    <section className="prizes section section--dark section--center" id="lots" ref={scope}>
      <div className="container">
        <Reveal>
          <p className="section__eyebrow">Les lots à gagner</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section__title">Des cadeaux qui font envie</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="section__lead">
            Tente ta chance à chaque canette. Pas de probabilités affichées — on garde la
            surprise intacte.
          </p>
        </Reveal>

        <ul className="prizes__grid">
          {PRIZES.map((prize, i) => (
            <Reveal as="li" key={prize.name} delay={0.06 * i} className="prize">
              <span className="prize__shine" aria-hidden="true" />
              <span className="prize__icon" aria-hidden="true">
                {prize.icon}
              </span>
              <span className="prize__name">{prize.name}</span>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.15}>
          <p className="prizes__badge">Nouveaux gagnants chaque semaine à Abidjan</p>
        </Reveal>
      </div>
    </section>
  )
}

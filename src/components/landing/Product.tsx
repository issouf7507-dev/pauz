import Reveal from '@/components/ui/Reveal'
import { useGsap, prefersReducedMotion } from '@/lib/useGsap'
import { gsap } from '@/lib/gsap'
import { PRODUCT_ARGS } from '@/data/site'
import './product.css'

export default function Product() {
  const scope = useGsap((_self, root) => {
    if (prefersReducedMotion()) return
    // Parallaxe des blobs décoratifs
    root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
      const depth = Number(el.dataset.parallax) || 20
      gsap.to(el, {
        yPercent: depth,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  }, [])

  return (
    <section className="product section" id="produit" ref={scope}>
      <div className="container">
        <div className="product__head">
          <Reveal>
            <p className="section__eyebrow">Le produit</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section__title">
              Une gorgée de tropiques,{' '}
              <span className="text-muted">rien d’autre.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section__lead">
              100% eau de coco pure, mise en canette et livrée fraîche à Abidjan. Sans sucre
              ajouté, sans conservateur — juste l’essentiel.
            </p>
          </Reveal>
        </div>

        <div className="product__grid">
          {PRODUCT_ARGS.map((arg, i) => (
            <Reveal as="div" key={arg.title} delay={0.1 + i * 0.1} className="product__card">
              <span className="product__index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="product__card-title">{arg.title}</h3>
              <p className="product__card-text">{arg.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

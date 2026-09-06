import { useEffect, useState } from 'react'

/**
 * Routeur minimal : le site est une page unique, plus quelques pages annexes
 * (suivi de commande, politiques). Pas de dépendance de routage pour ça — on
 * lit `location.pathname` et on intercepte les liens internes.
 *
 * En production, l'hébergeur doit renvoyer `index.html` pour toute route
 * inconnue (nginx : `try_files $uri /index.html`), sinon un accès direct à
 * /commande/... renvoie un 404 du serveur.
 */
export function usePath() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)

    // Les liens internes (href commençant par « / ») ne rechargent pas la page.
    // Les ancres « # » restent gérées par Lenis, qui les fait défiler en douceur.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as HTMLElement)?.closest('a[href^="/"]') as HTMLAnchorElement | null
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return
      e.preventDefault()
      navigate(link.getAttribute('href') ?? '/')
    }
    document.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('popstate', onPop)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return path
}

/** Navigue en interne. Un `#ancre` dans la cible fait défiler après le rendu. */
export function navigate(to: string) {
  const [pathname, hash] = to.split('#')
  const target = pathname || '/'

  if (target !== window.location.pathname) {
    window.history.pushState({}, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  requestAnimationFrame(() => {
    const element = hash ? document.getElementById(hash) : null
    if (element) {
      const lenis = window.__lenis
      if (lenis) lenis.scrollTo(element, { offset: -66 })
      else element.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  })
}

/**
 * Une section de la page d'accueil : ancre simple quand on y est déjà (Lenis
 * la fait défiler), chemin complet depuis une page annexe.
 */
export function sectionHref(path: string, hash: string) {
  return path === '/' ? `#${hash}` : `/#${hash}`
}

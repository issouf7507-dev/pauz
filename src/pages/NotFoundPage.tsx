import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main
      className="container"
      style={{ paddingBlock: '25vh', textAlign: 'center' }}
    >
      <h1 style={{ fontSize: 'clamp(48px, 12vw, 120px)' }}>404</h1>
      <p style={{ color: 'var(--pauz-text-muted)', marginTop: 12 }}>
        Cette page s'est évaporée comme une goutte de coco.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: 24,
          padding: '12px 28px',
          borderRadius: 'var(--r-pill)',
          background: 'var(--pauz-accent)',
          color: 'var(--pauz-bg-deep)',
          fontWeight: 600,
        }}
      >
        Retour à l'accueil
      </Link>
    </main>
  )
}

import { useLenis } from './hooks/useLenis'
import { OrderProvider } from './lib/order'
import { usePath } from './lib/router'
import { findLegalDoc } from './data/legal'
import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Story from './components/Story'
import ProductShowcase from './components/ProductShowcase'
import JoyfulMoments from './components/JoyfulMoments'
import LifeIsALot from './components/LifeIsALot'
import FunctionMeetsFun from './components/FunctionMeetsFun'
import Lookbook from './components/Lookbook'
import Testimonials from './components/Testimonials'
import BundleSave from './components/BundleSave'
import MoreJoy from './components/MoreJoy'
import Footer from './components/Footer'
import PageShell from './components/PageShell'
import LegalPage from './pages/LegalPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import PlayPage from './pages/PlayPage'

const TRACK_PREFIX = '/commande/'
const PLAY_PREFIX = '/gagner'

export default function App() {
  useLenis()
  const path = usePath()

  // Le site est une page unique ; ces deux routes sont les seules exceptions.
  const token = path.startsWith(TRACK_PREFIX) ? path.slice(TRACK_PREFIX.length) : null
  const legalDoc = findLegalDoc(path)
  // Le QR imprimé sur la canette mène à /gagner/<code> ; /gagner seul marche
  // aussi, le client tape alors son code à la main.
  const playing = path === PLAY_PREFIX || path.startsWith(`${PLAY_PREFIX}/`)

  if (token) {
    return (
      <OrderProvider>
        <PageShell>
          <OrderTrackingPage token={token} />
        </PageShell>
      </OrderProvider>
    )
  }

  if (playing) {
    const code = path.slice(PLAY_PREFIX.length + 1)
    return (
      <OrderProvider>
        <PageShell>
          <PlayPage {...(code ? { code: decodeURIComponent(code) } : {})} />
        </PageShell>
      </OrderProvider>
    )
  }

  if (legalDoc) {
    return (
      <OrderProvider>
        <PageShell>
          <LegalPage doc={legalDoc} />
        </PageShell>
      </OrderProvider>
    )
  }

  return (
    <OrderProvider>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Story />
        <ProductShowcase />
        <JoyfulMoments />
        <LifeIsALot />
        <FunctionMeetsFun />
        <Lookbook />
        <Testimonials />
        <BundleSave />
        <MoreJoy />
      </main>
      <Footer />
    </OrderProvider>
  )
}

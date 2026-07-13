import { useLenis } from './hooks/useLenis'
import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import ProductRow from './components/ProductRow'
import JoyfulMoments from './components/JoyfulMoments'
import LifeIsALot from './components/LifeIsALot'
import FunctionMeetsFun from './components/FunctionMeetsFun'
import Testimonials from './components/Testimonials'
import BundleSave from './components/BundleSave'
import MoreJoy from './components/MoreJoy'
import Footer from './components/Footer'

export default function App() {
  useLenis()

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Ticker />
        <ProductRow variant="drinks" />
        <ProductRow variant="gummies" />
        <JoyfulMoments />
        <LifeIsALot />
        <FunctionMeetsFun />
        <Testimonials />
        <BundleSave />
        <MoreJoy />
      </main>
      <Footer />
    </>
  )
}

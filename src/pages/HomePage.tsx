import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Lots from "@/components/landing/Lots";
import Approach from "@/components/landing/Approach";
import Work from "@/components/landing/Work";
import HeroScrub from "@/components/effects/HeroScrub";
import Testimonials from "@/components/landing/Testimonials";
import News from "@/components/landing/News";
import Contact from "@/components/landing/Contact";
import SmoothScrollHero from "@/components/landing/SmoothScrollHero";
import "@/components/landing/sections.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Lots />
        <Approach />
        <Work />
        {/* Séquence provisoire : la même image sur chaque frame (à remplacer
            par une vraie séquence, ex. /frames/hero/0000.webp …). */}
        <HeroScrub
          frameCount={60}
          frameUrl={() => "/img/can-hero.png"}
          titleTop="PAUZ"
          titleBottom="FRAÎCHE"
          accentHex="#0d2b0f"
        />
        <Testimonials />
        <News />
        <Contact />
        {/* Démo parallaxe (contenu SpaceX à rebrander pour PAUZ) */}
        <SmoothScrollHero />
      </main>
      <Footer />
    </>
  );
}

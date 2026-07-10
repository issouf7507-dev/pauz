import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import "./smoothscrollhero.css";

/**
 * Hero parallaxe (image centrale qui se « dé-clippe » au scroll + colonne
 * d'images flottantes), façon SpaceX, en Framer Motion.
 *
 * ⚠️ Le contenu (calendrier de lancements, images Unsplash) est une démo :
 * à remplacer par du visuel/copie PAUZ. Le smooth-scroll (Lenis) de l'exemple
 * d'origine a été retiré — l'effet fonctionne en scroll natif.
 */
export default function SmoothScrollHero() {
  return (
    <div className="smooth-hero">
      <Hero />
    </div>
  );
}

const SECTION_HEIGHT = 1000;

const Hero = () => {
  return (
    <div
      style={{ minHeight: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="smooth-hero__hero"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="smooth-hero__fade" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"],
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0],
  );

  return (
    <motion.div
      className="smooth-hero__center"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop)",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="smooth-hero__images">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop"
        alt="Exemple de lancement spatial"
        start={-200}
        end={200}
        className="sh-w13"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2670&auto=format&fit=crop"
        alt="Exemple de lancement spatial"
        start={200}
        end={-250}
        className="sh-w23 sh-mx"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop"
        alt="Satellite en orbite"
        start={-200}
        end={200}
        className="sh-w13 sh-mr"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670&auto=format&fit=crop"
        alt="Satellite en orbite"
        start={0}
        end={-500}
        className="sh-w512 sh-ml24"
      />
    </div>
  );
};

type ParallaxImgProps = {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
};

const ParallaxImg = ({
  className = "",
  alt,
  src,
  start,
  end,
}: ParallaxImgProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`smooth-hero__pimg ${className}`.trim()}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

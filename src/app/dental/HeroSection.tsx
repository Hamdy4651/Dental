import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Star, Phone, Sparkles, MapPin } from "lucide-react";
import { clinic } from "./data";
import HERO_IMG from "@/imports/images/1.jpeg";

interface HeroProps {
  onBooking: () => void;
}

/*
  Premium Hero:
  - One real smile image only
  - No camera / unrelated imagery
  - No mismatched before/after people
  - Scroll-driven "smile whitening" using CSS filters + light sweep
  - Warm ivory + deep navy + restrained turquoise palette
*/

// const HERO_IMG =
//   "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1800&auto=format&fit=crop&q=90";

/* Praxisstandorte, die im Hero angezeigt werden */
const heroLocations = ["Darmstadt", "Hanau"];

export function HeroSection({ onBooking }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The smile becomes brighter and cleaner as the user scrolls.
  const whitening = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, 0.25, 0.7, 1]);

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.08]);
  const imageBrightness = useTransform(whitening, [0, 1], [0.82, 1.08]);
  const imageSaturation = useTransform(whitening, [0, 1], [0.82, 1.04]);
  const imageContrast = useTransform(whitening, [0, 1], [0.96, 1.05]);

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.72, 0.52, 0.35]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -45]);

  const lightSweepX = useTransform(scrollYProgress, [0, 1], ["-25%", "125%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    [1, 0]
  );

  const scrollToNext = () => {
    document.querySelector("#vertrauen")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Blue Dental – Zahnmedizin in Darmstadt und Hanau"
      className="relative"
      style={{ height: "240vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#062B67]">
        {/* Main dental image */}
        <motion.div
          className="absolute inset-0"
          style={{
            scale: imageScale,
          }}
        >
          <motion.img
            src={HERO_IMG}
            alt="Natürliches Lächeln einer Patientin"
            className="h-full w-full object-cover object-[68%_center]"
            style={{
              filter: useTransform(
                [imageBrightness, imageSaturation, imageContrast],
                ([brightness, saturation, contrast]) =>
                  `brightness(${brightness}) saturate(${saturation}) contrast(${contrast})`
              ),
            }}
          />
        </motion.div>

        {/* Premium dark gradient for readability */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#041D4A] via-[#062B67]/78 to-[#062B67]/12"
          style={{ opacity: overlayOpacity }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#041D4A]/65 via-transparent to-[#041D4A]/15" />

        {/* Scroll-driven light sweep */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-[22vw] min-w-[180px] bg-gradient-to-r from-transparent via-white/12 to-transparent blur-2xl"
          style={{
            x: lightSweepX,
            skewX: "-12deg",
          }}
        />

        {/* Very subtle dental line art */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-[8%] top-[20%] hidden opacity-20 lg:block"
        >
          <svg
            viewBox="0 0 80 90"
            fill="none"
            className="h-20 w-16 stroke-white"
            strokeWidth="1"
          >
            <path d="M40 6C25 6 12 16 12 30c0 6 2 11 4 16 2 6 3 14 4 22 1 6 3 10 6 10 3 0 5-4 6-10l2-8c0-3 2-5 6-5s6 2 6 5l2 8c1 6 3 10 6 10 3 0 5-4 6-10 1-8 2-16 4-22 2-5 4-10 4-16C68 16 55 6 40 6Z" />
          </svg>
        </motion.div>

        {/* Transformation status */}
        <motion.div
          className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 md:block"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [0, 1]) }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="h-32 w-px bg-white/20">
              <motion.div
                className="w-full origin-top bg-[#48B5F5]"
                style={{ height: progressWidth }}
              />
            </div>

            <div className="rounded-full border border-white/20 bg-[#062B67]/45 px-3 py-2 backdrop-blur-md">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                <Sparkles size={12} className="text-[#48B5F5]" />
                Smile Glow
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero copy */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-10 flex items-center"
        >
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="max-w-[650px]">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="mb-5 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-[#48B5F5]" />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#48B5F5]">
                  Blue Dental
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.85 }}
                className="mb-6 text-white"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 6vw, 5.4rem)",
                  lineHeight: 0.98,
                  fontWeight: 600,
                  letterSpacing: "-0.035em",
                }}
              >
                Ihr Lächeln.
                <br />
                <span className="text-[#48B5F5]">Ihre Geschichte.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58, duration: 0.7 }}
                className="mb-8 max-w-xl text-base leading-8 text-white/72 sm:text-lg"
              >
                Moderne Zahnmedizin mit persönlicher Betreuung, präziser
                Diagnostik und einem Blick für natürliche, gesunde Ergebnisse.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72, duration: 0.65 }}
                className="mb-7 flex flex-wrap gap-3"
              >
                <button
                  onClick={onBooking}
                  className="group rounded-full bg-[#0956A3] px-7 py-3.5 font-medium text-white shadow-lg shadow-[#0956A3]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B68BC] hover:shadow-xl hover:shadow-[#0956A3]/40"
                >
                  Termin buchen
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <button
                  onClick={() =>
                    document
                      .querySelector("#behandlungen")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-full border border-white/25 bg-white/8 px-7 py-3.5 font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Behandlungen entdecken
                </button>
              </motion.div>

              {/* Praxisstandorte */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.82, duration: 0.6 }}
                className="mb-6 flex flex-wrap items-center gap-2.5"
                aria-label="Unsere Standorte"
              >
                {heroLocations.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/85 backdrop-blur-md"
                  >
                    <MapPin size={14} className="text-[#48B5F5]" />
                    Praxis {city}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap items-center gap-4 text-sm"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <span className="text-white/80">
                  {clinic.rating} von 5
                </span>

                <span className="text-white/35">•</span>

                <span className="text-white/55">
                  {clinic.reviewCount} Bewertungen
                </span>
              </motion.div>

              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05 }}
                href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                className="mt-6 flex w-fit items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
              >
                <Phone size={14} />
                {clinic.phone}
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Scroll CTA */}
        <motion.button
          onClick={scrollToNext}
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/55 transition-colors hover:text-white"
          aria-label="Weiter scrollen"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
            Scrollen und entdecken
          </span>

          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.button>

        {/* Mobile hint */}
        <div className="absolute bottom-6 right-5 z-20 md:hidden">
          <span className="rounded-full border border-white/15 bg-black/15 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-white/50 backdrop-blur">
            Smile Transformation
          </span>
        </div>
      </div>
    </section>
  );
}
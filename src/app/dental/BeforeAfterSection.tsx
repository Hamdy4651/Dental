import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MoveHorizontal,
} from "lucide-react";

type Case = {
  id: string;
  treatment: string;
  title: string;
  description: string;
  before: string;
  after: string;
};

// ملاحظة: الصور دي صور عامة من Unsplash (رخصة مجانية للاستخدام التجاري)
// بديل مؤقت لحد ما يبقى في صور حقيقية للحالات في المشروع.
// استبدلها بصور "قبل/بعد" حقيقية من العيادة أول ما تكون متاحة.
const cases: Case[] = [
  {
    id: "01",
    treatment: "Ästhetische Zahnmedizin",
    title: "Natürliches Lächeln",
    description:
      "Individuelle ästhetische Behandlung mit einem natürlichen und harmonischen Ergebnis.",
    before:
      "https://luisenplatz-smile-studio.vercel.app/assets/before-C4bwTD4A.jpg",
    after:
      "https://luisenplatz-smile-studio.vercel.app/assets/after-CI6HZM9j.jpg",
  },
  {
    id: "02",
    treatment: "Professionelle Zahnreinigung",
    title: "Sauberer und frischer",
    description:
      "Eine gründliche Reinigung für ein gepflegtes und sichtbar frischeres Lächeln.",
    before:
      "https://images.unsplash.com/photo-1663182234283-28941e7612da?auto=format&fit=crop&w=1200&q=80",
    after:
      "https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "03",
    treatment: "Zahnaufhellung",
    title: "Mehr Leuchtkraft",
    description:
      "Eine individuell geplante Zahnaufhellung für ein helleres und natürlich wirkendes Lächeln.",
    before:
      "https://images.unsplash.com/photo-1654373535457-383a0a4d00f9?auto=format&fit=crop&w=1200&q=80",
    after:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "04",
    treatment: "Ästhetische Rekonstruktion",
    title: "Harmonische Zahnästhetik",
    description:
      "Ästhetische Korrekturen mit Fokus auf Form, Proportion und ein natürliches Gesamtbild.",
    before:
      "https://images.unsplash.com/photo-1564420228450-d9a5bc8d6565?auto=format&fit=crop&w=1200&q=80",
    after:
      "https://images.unsplash.com/photo-1617812191081-2a24e3f30e45?auto=format&fit=crop&w=1200&q=80",
  },
];

export function BeforeAfterSection() {
  const [activeCase, setActiveCase] = useState(0);
  const [sliderPct, setSliderPct] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const current = cases[activeCase];

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const percentage =
      ((clientX - rect.left) / rect.width) * 100;

    setSliderPct(Math.min(100, Math.max(0, percentage)));
  }, []);

  const nextCase = () => {
    setActiveCase((prev) => (prev + 1) % cases.length);
    setSliderPct(50);
  };

  const previousCase = () => {
    setActiveCase(
      (prev) => (prev - 1 + cases.length) % cases.length
    );
    setSliderPct(50);
  };

  return (
    <section
      id="vorher-nachher"
      className="relative overflow-hidden bg-[#062B67] py-24 text-white sm:py-32 lg:py-40"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#0878D1]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#48B5F5]/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#0878D1]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#48B5F5]">
              Vorher & Nachher
            </span>
          </div>

          <h2
            className="text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4.6rem)",
              lineHeight: 1.02,
              fontWeight: 600,
              letterSpacing: "-0.035em",
            }}
          >
            Veränderung,
            <br />
            <span className="text-[#48B5F5]">
              die sichtbar wird.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            Entdecken Sie ausgewählte Behandlungsbeispiele und vergleichen
            Sie die Ausgangssituation mit dem jeweiligen Ergebnis.
          </p>
        </motion.div>

        {/* Case navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {cases.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCase(index);
                  setSliderPct(50);
                }}
                className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs transition-all duration-300 ${
                  activeCase === index
                    ? "border-[#0878D1] bg-[#0878D1] text-white"
                    : "border-white/10 bg-white/[0.04] text-white/50 hover:border-white/20 hover:text-white"
                }`}
              >
                <span className="font-semibold">
                  {item.id}
                </span>

                <span>{item.treatment}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={previousCase}
              aria-label="Vorheriger Fall"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-all hover:border-[#0878D1]/50 hover:bg-[#0878D1]/10"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextCase}
              aria-label="Nächster Fall"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-all hover:border-[#0878D1]/50 hover:bg-[#0878D1]/10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Main content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="grid items-center gap-10 lg:grid-cols-[1fr_0.72fr] lg:gap-16"
          >

            {/* Comparison */}
            <div
              ref={containerRef}
              className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-[#132C40] shadow-2xl shadow-black/30 select-none"
              onMouseMove={(e) => {
                if (dragging.current) {
                  updateSlider(e.clientX);
                }
              }}
              onMouseDown={(e) => {
                dragging.current = true;
                updateSlider(e.clientX);
              }}
              onMouseUp={() => {
                dragging.current = false;
              }}
              onMouseLeave={() => {
                dragging.current = false;
              }}
              onTouchMove={(e) => {
                updateSlider(e.touches[0].clientX);
              }}
              onTouchStart={(e) => {
                updateSlider(e.touches[0].clientX);
              }}
              style={{ cursor: "ew-resize" }}
            >
              {/* AFTER */}
              <img
                src={current.after}
                alt={`${current.treatment} Ergebnis`}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />

              {/* BEFORE */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{
                  width: `${sliderPct}%`,
                }}
              >
                <img
                  src={current.before}
                  alt={`${current.treatment} Ausgangssituation`}
                  className="absolute left-0 top-0 h-full w-full max-w-none object-cover"
                  style={{
                    width: containerRef.current?.offsetWidth || "100%",
                  }}
                  draggable={false}
                />
              </div>

              {/* Before label */}
              <div className="absolute left-5 top-5 z-20 rounded-full border border-white/10 bg-[#062B67]/75 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
                Vorher
              </div>

              {/* After label */}
              <div className="absolute right-5 top-5 z-20 rounded-full bg-[#0878D1]/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
                Nachher
              </div>

              {/* Divider */}
              <div
                className="absolute bottom-0 top-0 z-30"
                style={{
                  left: `${sliderPct}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="h-full w-px bg-white/90 shadow-lg" />

                <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white/80 bg-[#062B67] shadow-2xl">
                  <MoveHorizontal
                    size={21}
                    className="text-[#48B5F5]"
                  />
                </div>
              </div>

              {/* Hint */}
              <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-[#062B67]/70 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/65 backdrop-blur-md">
                Ziehen zum Vergleichen
              </div>
            </div>

            {/* Information */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#48B5F5]">
                    Behandlungsbeispiel
                  </p>

                  <p className="mt-2 text-sm text-white/40">
                    Fall {current.id} von {cases.length}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <Sparkles
                    size={18}
                    className="text-[#48B5F5]"
                  />
                </div>
              </div>

              <h3
                className="text-3xl leading-tight sm:text-4xl"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                }}
              >
                {current.title}
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/55">
                {current.description}
              </p>

              {/* Treatment */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                  Behandlung
                </p>

                <p className="mt-2 font-medium text-white">
                  {current.treatment}
                </p>
              </div>

              {/* Progress */}
              <div className="mt-8">
                <div className="mb-3 flex justify-between text-[10px] uppercase tracking-[0.18em]">
                  <span className="text-white/35">
                    Fälle
                  </span>

                  <span className="text-[#48B5F5]">
                    {String(activeCase + 1).padStart(2, "0")} /{" "}
                    {String(cases.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex gap-2">
                  {cases.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveCase(index);
                        setSliderPct(50);
                      }}
                      className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"
                    >
                      <motion.div
                        animate={{
                          width:
                            activeCase === index
                              ? "100%"
                              : "0%",
                        }}
                        transition={{ duration: 0.4 }}
                        className="h-full rounded-full bg-[#0878D1]"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 border-t border-white/10 pt-6 text-center"
        >
          <p className="text-xs leading-6 text-white/35">
            Individuelle Ergebnisse können variieren. Die gezeigten
            Behandlungsbeispiele dienen der Veranschaulichung.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
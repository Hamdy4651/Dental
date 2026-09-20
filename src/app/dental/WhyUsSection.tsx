import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  HeartHandshake,
  ScanLine,
  ShieldCheck,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import WHY_IMG from "@/imports/images/2.jpeg";


const reasons = [
  {
    icon: HeartHandshake,
    number: "01",
    title: "Persönlich betreut",
    desc: "Wir nehmen uns Zeit, hören zu und erklären jeden Behandlungsschritt verständlich.",
  },
  {
    icon: ScanLine,
    number: "02",
    title: "Moderne Diagnostik",
    desc: "Präzise digitale Diagnostik unterstützt eine individuelle und nachvollziehbare Behandlung.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Mit Ruhe & Vertrauen",
    desc: "Eine angenehme Atmosphäre und ein aufmerksames Team sorgen für ein gutes Gefühl.",
  },
  {
    icon: MessageCircle,
    number: "04",
    title: "Ehrlich beraten",
    desc: "Wir sprechen offen über Möglichkeiten, Alternativen und den nächsten sinnvollen Schritt.",
  },
];

export function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02]);
  const glowY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="warum-wir"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7F5F0] py-24 sm:py-32 lg:py-40"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#0878D1]/8 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#0B4EA2]/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-16 flex flex-col justify-between gap-8 lg:mb-20 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#0878D1]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0B4EA2]">
                Warum Dentalpraxis Luisenplatz?
              </span>
            </div>

            <h2
              className="text-[#062B67]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 5vw, 4.8rem)",
                lineHeight: 1.02,
                fontWeight: 600,
                letterSpacing: "-0.035em",
              }}
            >
              Zahnmedizin mit
              <br />
              <span className="text-[#0B4EA2]">Zeit, Vertrauen</span>
              <br />
              und Präzision.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="max-w-md text-[15px] leading-7 text-[#637382] lg:pb-2"
          >
            Wir möchten, dass Sie sich bei uns nicht nur gut behandelt,
            sondern von Anfang an verstanden und gut aufgehoben fühlen.
          </motion.p>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Image composition */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative h-[480px] overflow-hidden rounded-[2.25rem] sm:h-[600px] lg:h-[650px]">
              <motion.img
                src={WHY_IMG}
                alt="Moderne und freundliche Zahnarztpraxis"
                className="h-full w-full object-cover"
                style={{
                  y: imageY,
                  scale: imageScale,
                }}
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#041D4A]/65 via-transparent to-transparent" />

              {/* Image label */}
              <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-white/12 px-4 py-2 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  <Sparkles size={12} />
                  Moderne Praxis
                </div>
              </div>

              {/* Bottom message */}
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-[#48B5F5]">
                  Ihr Besuch bei uns
                </p>
                <p
                  className="max-w-md text-2xl leading-tight text-white sm:text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Ruhige Atmosphäre.
                  <br />
                  Moderne Zahnmedizin.
                </p>
              </div>
            </div>

            {/* Floating experience card */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.65 }}
              className="absolute -bottom-7 right-4 w-[230px] rounded-2xl border border-[#062B67]/8 bg-white p-5 shadow-[0_20px_60px_rgba(11,32,51,0.15)] sm:-right-7"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A98A4]">
                  Unser Anspruch
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0878D1]/10 text-[#0B4EA2]">
                  <HeartHandshake size={17} />
                </div>
              </div>

              <p
                className="text-xl leading-tight text-[#062B67]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Qualität, die man spürt.
              </p>

              <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#E8EDEB]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "88%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="h-full rounded-full bg-[#0878D1]"
                />
              </div>
            </motion.div>

            {/* Decorative floating circle */}
            <motion.div
              style={{ y: glowY }}
              className="absolute -left-8 top-20 hidden h-20 w-20 rounded-full border border-[#0878D1]/20 bg-[#0878D1]/8 lg:block"
            />
          </motion.div>

          {/* Reasons */}
          <div className="space-y-3">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <motion.div
                  key={reason.number}
                  initial={{ opacity: 0, x: 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.1,
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-[#062B67]/8 bg-white/75 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#0878D1]/30 hover:bg-white hover:shadow-[0_18px_45px_rgba(11,32,51,0.08)] sm:p-6"
                >
                  <div className="flex gap-5">
                    <div className="relative flex w-12 shrink-0 flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#062B67] text-white transition-all duration-500 group-hover:bg-[#0878D1] group-hover:shadow-lg group-hover:shadow-[#0878D1]/20">
                        <Icon size={20} strokeWidth={1.6} />
                      </div>

                      {index !== reasons.length - 1 && (
                        <div className="mt-3 h-full w-px bg-[#062B67]/8" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <h3
                          className="text-lg font-semibold text-[#062B67]"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {reason.title}
                        </h3>

                        <span className="text-[10px] font-semibold tracking-[0.18em] text-[#A0AAB2]">
                          {reason.number}
                        </span>
                      </div>

                      <p
                        className="max-w-lg text-sm leading-6 text-[#687987]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {reason.desc}
                      </p>

                      <div className="mt-4 h-px w-0 bg-[#0878D1] transition-all duration-500 group-hover:w-full" />
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="mt-1 shrink-0 text-[#A6B0B8] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#0878D1]"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

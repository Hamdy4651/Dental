import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ArrowUpRight,
  Check,
  MapPin,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import PR_IMG from "@/imports/images/4.jpeg";

const pillars = [
  {
    label: "Moderne Ausstattung",
    description: "Präzise Diagnostik und zeitgemäße Behandlung",
  },
  {
    label: "Ruhige Atmosphäre",
    description: "Eine Praxis, in der Sie sich wohlfühlen können",
  },
  {
    label: "Persönliche Betreuung",
    description: "Zeit für Ihre Wünsche, Fragen und Anliegen",
  },
  {
    label: "Zentrale Lage",
    description: "Direkt am Luisenplatz in Darmstadt",
  },
];

export function PracticeSection() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.1]);

  return (
    <section
      ref={ref}
      id="praxis"
      className="relative overflow-hidden bg-[#F7F5F0] py-24 sm:py-32 lg:py-40"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#0878D1]/[0.06] blur-[100px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#0B4EA2]/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-3xl lg:mb-20"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#0878D1]" />

            <span
              className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#0B4EA2]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Unsere Praxis
            </span>
          </div>

          <h2
            className="text-[#062B67]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.025em",
            }}
          >
            Zahnmedizin, die sich{" "}
            <span className="text-[#0878D1]">anders anfühlt.</span>
          </h2>

          <p
            className="mt-6 max-w-2xl text-base leading-8 text-[#062B67]/60 sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Moderne Zahnmedizin trifft auf eine ruhige, persönliche
            Atmosphäre. Unsere Praxis ist ein Ort für präzise Behandlung,
            Vertrauen und Zeit für das, was wirklich wichtig ist.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image frame */}
            <div className="relative overflow-visible">
              <div className="relative h-[500px] overflow-hidden rounded-[2rem] bg-[#E8E5DE] shadow-[0_30px_80px_rgba(11,32,51,0.14)] sm:h-[620px]">
                <motion.img
                  src={PR_IMG}
                  alt="Moderne Zahnarztpraxis"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    y: imageY,
                    scale: imageScale,
                  }}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#062B67]/55 via-transparent to-[#062B67]/5" />

                {/* Image top label */}
                <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#062B67]/45 px-4 py-2.5 backdrop-blur-md">
                    <Sparkles size={14} className="text-[#48B5F5]" />

                    <span
                      className="text-xs font-semibold text-white"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Moderne Zahnmedizin
                    </span>
                  </div>
                </div>

                {/* Image bottom content */}
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                  <div className="max-w-md">
                    <p
                      className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#48B5F5]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Willkommen in unserer Praxis
                    </p>

                    <h3
                      className="text-2xl leading-tight text-white sm:text-3xl"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                      }}
                    >
                      Präzision trifft auf Menschlichkeit.
                    </h3>
                  </div>
                </div>
              </div>

              {/* Floating location card */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="absolute -bottom-7 left-5 right-5 rounded-2xl border border-[#062B67]/[0.07] bg-white p-5 shadow-[0_20px_50px_rgba(11,32,51,0.12)] sm:-right-10 sm:left-auto sm:w-[310px]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0878D1]/10 text-[#0878D1]">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <p
                      className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#062B67]/40"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Unser Standort
                    </p>

                    <p
                      className="mt-1 font-semibold text-[#062B67]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Luisenplatz · Darmstadt
                    </p>

                    <p
                      className="mt-1 text-sm text-[#062B67]/50"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Zentral gelegen und gut erreichbar
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative ring */}
              <div className="pointer-events-none absolute -left-8 -top-8 hidden h-24 w-24 rounded-full border border-[#0878D1]/25 sm:block" />

              <div className="pointer-events-none absolute -bottom-12 -left-12 hidden h-36 w-36 rounded-full border border-[#062B67]/10 sm:block" />
            </div>
          </motion.div>

          {/* CONTENT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Small intro card */}
            <div className="mb-10 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#062B67] text-white shadow-lg">
                <Stethoscope size={20} strokeWidth={1.8} />
              </div>

              <div>
                <h3
                  className="text-xl font-semibold text-[#062B67]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Ihr Wohlbefinden steht im Mittelpunkt
                </h3>

                <p
                  className="mt-2 text-sm leading-6 text-[#062B67]/55"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Von der ersten Beratung bis zur Behandlung begleiten wir
                  Sie persönlich und transparent.
                </p>
              </div>
            </div>

            {/* Pillars */}
            <div className="space-y-3">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08 + 0.2,
                  }}
                  className="group rounded-2xl border border-[#062B67]/[0.07] bg-white/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0878D1]/30 hover:bg-white hover:shadow-[0_15px_40px_rgba(11,32,51,0.07)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F5F0] text-[#0878D1] transition-colors duration-300 group-hover:bg-[#0878D1] group-hover:text-white">
                      <Check size={17} strokeWidth={2.5} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-semibold text-[#062B67]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {pillar.label}
                      </h4>

                      <p
                        className="mt-1 text-sm leading-5 text-[#062B67]/45"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {pillar.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-[#062B67]/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0878D1]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom statement */}
            <div className="mt-10 border-t border-[#062B67]/10 pt-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F7F5F0] bg-[#062B67]">
                    <Check size={14} className="text-white" />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F7F5F0] bg-[#0878D1]">
                    <Sparkles size={14} className="text-white" />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F7F5F0] bg-[#0B4EA2]">
                    <Stethoscope size={14} className="text-white" />
                  </div>
                </div>

                <p
                  className="text-sm text-[#062B67]/55"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span className="font-semibold text-[#062B67]">
                    Persönlich.
                  </span>{" "}
                  Präzise. Vertrauensvoll.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
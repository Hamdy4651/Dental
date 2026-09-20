import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { clinic } from "./data";

interface FinalCTAProps {
  onBooking: () => void;
}

export function FinalCTA({ onBooking }: FinalCTAProps) {
  return (
    <section id="kontakt" className="relative py-28 sm:py-36 overflow-hidden bg-[#062B67]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=1400&h=800&fit=crop&auto=format&q=75"
          alt="Strahlend weißes Lächeln"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062B67] via-[#062B67]/80 to-[#062B67]/60" />
      </div>

      {/* Animated accent orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-[#0878D1] blur-[80px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-[#0B4EA2] blur-[80px] pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-px bg-[#0878D1]" />
            <span className="text-[#0878D1] text-xs font-semibold tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
              Jetzt starten
            </span>
            <div className="w-8 h-px bg-[#0878D1]" />
          </div>

          <h2 className="text-white leading-[1.15] mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 600 }}>
            Ihr neues Lächeln beginnt{" "}
            <em className="not-italic text-[#0878D1]">mit einem Gespräch.</em>
          </h2>

          <p className="text-white/60 mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem" }}>
            Vereinbaren Sie jetzt Ihren persönlichen Termin und lernen Sie unser Team kennen. Wir freuen uns auf Sie.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={onBooking}
              className="bg-[#0878D1] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#0B4EA2] transition-all hover:shadow-2xl hover:shadow-[#0878D1]/30 hover:scale-[1.03]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Termin buchen
            </button>
            <a
              href={`tel:${clinic.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2.5 bg-white/8 border border-white/15 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/15 transition-all"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Phone size={18} />
              Jetzt anrufen
            </a>
          </div>

          <p className="text-white/30 mt-8 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            {clinic.phone} · {clinic.email}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

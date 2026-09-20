import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews, clinic } from "./data";

export function ReviewsSection() {
  const [idx, setIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setIdx((i) => (i + 1) % reviews.length), 6000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const go = (next: number) => {
    setIdx(next);
    resetInterval();
  };

  return (
    <section id="bewertungen" className="py-24 sm:py-32 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#0878D1]" />
            <span className="text-[#0878D1] text-xs font-semibold tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
              Bewertungen
            </span>
            <div className="w-8 h-px bg-[#0878D1]" />
          </div>
          <h2 className="text-[#062B67] leading-[1.2]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 600 }}>
            Was unsere Patientinnen<br />
            <span className="italic text-[#0B4EA2]">und Patienten sagen.</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-[#062B67] font-semibold">{clinic.rating} von 5</span>
            <span className="text-[#6B7A8D] text-sm">{clinic.reviewCount} Bewertungen</span>
          </div>
        </motion.div>

        {/* Main featured review */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="absolute -top-4 -left-2 text-[#0B4EA2]/8">
            <Quote size={80} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-[rgba(13,27,42,0.06)] rounded-3xl p-8 sm:p-10 shadow-sm relative"
            >
              <div className="flex gap-0.5 mb-6">
                {[...Array(reviews[idx].rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-[#062B67] leading-relaxed mb-7 text-lg" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                „{reviews[idx].text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0B4EA2] flex items-center justify-center text-white font-semibold text-sm">
                  {reviews[idx].name[1]}
                </div>
                <div>
                  <p className="text-[#062B67] font-semibold text-sm" style={{ fontFamily: "var(--font-body)" }}>{reviews[idx].name}</p>
                  <p className="text-[#6B7A8D] text-xs">{reviews[idx].date}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => go((idx - 1 + reviews.length) % reviews.length)}
              className="w-10 h-10 rounded-full border border-[rgba(13,27,42,0.12)] flex items-center justify-center text-[#6B7A8D] hover:border-[#0B4EA2] hover:text-[#0B4EA2] transition-all"
              aria-label="Vorherige Bewertung"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-[#0B4EA2]" : "w-1.5 bg-[rgba(13,27,42,0.15)]"}`}
                  aria-label={`Bewertung ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => go((idx + 1) % reviews.length)}
              className="w-10 h-10 rounded-full border border-[rgba(13,27,42,0.12)] flex items-center justify-center text-[#6B7A8D] hover:border-[#0B4EA2] hover:text-[#0B4EA2] transition-all"
              aria-label="Nächste Bewertung"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Grid of mini reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {reviews.slice(0, 3).map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-[rgba(13,27,42,0.06)] rounded-2xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-[#062B67]/70 text-sm leading-relaxed mb-4 italic" style={{ fontFamily: "var(--font-display)" }}>
                „{r.text.slice(0, 100)}..."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#EDF1F5] flex items-center justify-center text-[#0B4EA2] font-semibold text-xs">
                  {r.name[1]}
                </div>
                <p className="text-[#062B67] text-xs font-medium" style={{ fontFamily: "var(--font-body)" }}>{r.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

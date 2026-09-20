import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "./data";

export function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#0878D1]" />
            <span className="text-[#0878D1] text-xs font-semibold tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-body)" }}>FAQ</span>
            <div className="w-8 h-px bg-[#0878D1]" />
          </div>
          <h2 className="text-[#062B67]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600 }}>
            Häufige Fragen
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-[rgba(13,27,42,0.08)] overflow-hidden bg-[#FAFAF8]"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#F5F0E8] transition-colors"
                aria-expanded={openId === faq.id}
              >
                <span className="text-[#062B67] font-medium pr-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${openId === faq.id ? "bg-[#0B4EA2] text-white" : "bg-white border border-[rgba(13,27,42,0.1)] text-[#6B7A8D]"}`}>
                  {openId === faq.id ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 border-t border-[rgba(13,27,42,0.06)]">
                      <p className="text-[#6B7A8D] leading-relaxed pt-4 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { staff } from "./data";

export function StaffSection() {
  return (
    <section className="py-20 bg-white border-y border-[rgba(13,27,42,0.06)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-[#062B67]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600 }}>
            Unser Praxisteam
          </h2>
          <p className="text-[#6B7A8D] mt-2 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            Die Menschen, die täglich für Sie da sind.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {staff.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center group"
            >
              <div className="relative mb-3">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0878D1] rounded-full border-2 border-white" />
              </div>
              <p className="text-[#062B67] font-semibold text-sm text-center" style={{ fontFamily: "var(--font-body)" }}>{member.name}</p>
              <p className="text-[#6B7A8D] text-xs text-center mt-0.5" style={{ fontFamily: "var(--font-body)" }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

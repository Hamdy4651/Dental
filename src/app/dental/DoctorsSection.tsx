import { motion } from "motion/react";
import { doctors } from "./data";

export function DoctorsSection() {
  const featuredDoctor = doctors[0];
  const otherDoctors = doctors.slice(1);

  return (
    <section id="team" className="py-24 sm:py-32 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Section Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-px bg-[#0878D1]" />

            <span
              className="text-[#0878D1] text-xs font-semibold tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Unsere Ärzte
            </span>
          </div>

          <h2
            className="text-[#062B67] leading-[1.2]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 600,
            }}
          >
            Menschen, denen Sie{" "}
            <span className="block italic text-[#0B4EA2]">
              vertrauen können.
            </span>
          </h2>

          <p
            className="text-[#6B7A8D] mt-4 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Unser Ärzteteam vereint medizinische Kompetenz mit langjähriger
            Erfahrung und echter menschlicher Wärme.
          </p>
        </motion.div>

        {/* =========================================================
            FEATURED DOCTOR
        ========================================================= */}
        {featuredDoctor && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-24"
          >
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">

              {/* Doctor Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-[2rem] shadow-xl shadow-[#062B67]/10">
                  <img
                    src={featuredDoctor.image}
                    alt={`${featuredDoctor.name} — ${featuredDoctor.role}`}
                    className="w-full h-[420px] sm:h-[520px] lg:h-[580px] object-cover"
                    loading="lazy"
                  />

                  {/* Image Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062B67]/40 via-transparent to-transparent" />
                </div>

                {/* Small Badge */}
                <div className="absolute bottom-6 left-6 bg-white rounded-xl px-5 py-3 shadow-lg">
                  <p
                    className="text-[#0878D1] text-[10px] uppercase tracking-[0.2em] font-semibold"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Ärztliche Leitung
                  </p>
                </div>
              </div>

              {/* Doctor Information */}
              <div>
                <p
                  className="text-[#0878D1] text-xs font-semibold uppercase tracking-[0.2em] mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {featuredDoctor.role}
                </p>

                <h3
                  className="text-[#062B67] leading-tight mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    fontWeight: 600,
                  }}
                >
                  {featuredDoctor.name}
                </h3>

                <p
                  className="text-[#6B7A8D] text-base leading-relaxed max-w-xl mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {featuredDoctor.description}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-[#DCE2E5] mb-8" />

                {/* Qualifications */}
                <div>
                  <p
                    className="text-[#062B67] font-semibold text-lg mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Ausbildung & Qualifikationen
                  </p>

                  <div className="space-y-5">

                    {/* Studium */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0878D1]/10 flex items-center justify-center">
                        <span className="text-[#0878D1] text-sm font-semibold">
                          01
                        </span>
                      </div>

                      <div>
                        <p
                          className="text-[#062B67] font-semibold text-sm mb-1"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Studium
                        </p>

                        <p
                          className="text-[#6B7A8D] text-sm leading-relaxed"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Studium in Halle (Saale) und München
                        </p>
                      </div>
                    </div>

                    {/* Approbation */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0878D1]/10 flex items-center justify-center">
                        <span className="text-[#0878D1] text-sm font-semibold">
                          02
                        </span>
                      </div>

                      <div>
                        <p
                          className="text-[#062B67] font-semibold text-sm mb-1"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Approbation
                        </p>

                        <p
                          className="text-[#6B7A8D] text-sm leading-relaxed"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Approbation an der LMU München
                        </p>
                      </div>
                    </div>

                    {/* Diplomarbeit */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0878D1]/10 flex items-center justify-center">
                        <span className="text-[#0878D1] text-sm font-semibold">
                          03
                        </span>
                      </div>

                      <div>
                        <p
                          className="text-[#062B67] font-semibold text-sm mb-1"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Diplomarbeit
                        </p>

                        <p
                          className="text-[#6B7A8D] text-sm leading-relaxed"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Anerkennung der Diplomarbeit in Bern, Schweiz
                        </p>
                      </div>
                    </div>

                    {/* Bewilligung */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0878D1]/10 flex items-center justify-center">
                        <span className="text-[#0878D1] text-sm font-semibold">
                          04
                        </span>
                      </div>

                      <div>
                        <p
                          className="text-[#062B67] font-semibold text-sm mb-1"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Berufliche Bewilligung
                        </p>

                        <p
                          className="text-[#6B7A8D] text-sm leading-relaxed"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Berufliche Bewilligung im Kanton Luzern
                        </p>
                      </div>
                    </div>

                    {/* Implantologie */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0878D1]/10 flex items-center justify-center">
                        <span className="text-[#0878D1] text-sm font-semibold">
                          05
                        </span>
                      </div>

                      <div>
                        <p
                          className="text-[#062B67] font-semibold text-sm mb-1"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Implantologie
                        </p>

                        <p
                          className="text-[#6B7A8D] text-sm leading-relaxed"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Curriculum der Implantologie in Mainz
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            OTHER DOCTORS
        ========================================================= */}
        {otherDoctors.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-px bg-[#0878D1]" />

                <span
                  className="text-[#0878D1] text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Unser Team
                </span>
              </div>

              <h3
                className="text-[#062B67]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  fontWeight: 600,
                }}
              >
                Unser Ärzteteam
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherDoctors.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                  }}
                  className="group"
                >
                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden mb-5 shadow-lg shadow-[#062B67]/8">
                    <img
                      src={doc.image}
                      alt={`${doc.name} — ${doc.role}`}
                      className="w-full h-72 object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#062B67]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                    {/* Description on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      <p
                        className="text-white text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {doc.description}
                      </p>
                    </div>
                  </div>

                  {/* Name */}
                  <h4
                    className="text-[#062B67] mb-1 font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.15rem",
                    }}
                  >
                    {doc.name}
                  </h4>

                  {/* Role */}
                  <p
                    className="text-[#0878D1] text-sm font-medium mb-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {doc.role}
                  </p>

                  {/* Specialization */}
                  <p
                    className="text-[#6B7A8D] text-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {doc.specialization}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
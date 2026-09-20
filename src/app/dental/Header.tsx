import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoSrc from "@/imports/logoclinic.png";
import { clinic } from "./data";

const navLinks = [
  { href: "#hero", label: "Startseite" },
  { href: "#warum-wir", label: "Über uns" },
  { href: "#behandlungen", label: "Behandlungen" },
  { href: "#vorher-nachher", label: "Vorher & Nachher" },
  { href: "#team", label: "Team" },
  { href: "#bewertungen", label: "Bewertungen" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

interface HeaderProps {
  onBooking: () => void;
}

export function Header({ onBooking }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 bg-white/96 backdrop-blur-xl shadow-[0_1px_24px_rgba(13,27,42,0.08)] border-b border-[rgba(13,27,42,0.06)]"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-3 group flex-shrink-0">
            <ImageWithFallback
              src={logoSrc}
              alt="Dentalpraxis Luisenplatz Logo"
              className="h-10 w-10 object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-[#0B4EA2] font-semibold text-sm leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                 Blue Dental
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Hauptnavigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  scrolled ? "text-[#062B67]/70 hover:text-[#0B4EA2] hover:bg-[#0B4EA2]/5" : "text-[#062B67]/80 hover:text-[#0B4EA2] hover:bg-white/50"
                }`}
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={`tel:${clinic.phone.replace(/\s/g, "")}`}
              className={`hidden lg:flex items-center gap-2 text-sm transition-colors ${scrolled ? "text-[#062B67]/60 hover:text-[#0B4EA2]" : "text-[#062B67]/70 hover:text-[#0B4EA2]"}`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Phone size={14} strokeWidth={2} />
              {clinic.phone}
            </a>
            <button
              onClick={onBooking}
              className="flex items-center gap-2 bg-[#0B4EA2] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#0878D1] transition-all duration-300 hover:shadow-lg hover:shadow-[#0878D1]/25"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Termin buchen
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 group"
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            >
              <span className={`w-5 h-px bg-[#062B67] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
              <span className={`w-5 h-px bg-[#062B67] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-px bg-[#062B67] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#FAFAF8] flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-8 pt-24">
              <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    onClick={() => scrollTo(link.href)}
                    className="text-left text-3xl text-[#062B67] py-3 border-b border-[#062B67]/8 hover:text-[#0878D1] transition-colors"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex flex-col gap-3"
              >
                <button
                  onClick={() => { setMobileOpen(false); onBooking(); }}
                  className="bg-[#0B4EA2] text-white py-4 rounded-2xl text-center font-medium text-lg"
                >
                  Termin buchen
                </button>
                <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 text-[#062B67]/60 py-2 text-sm">
                  <Phone size={16} />
                  {clinic.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

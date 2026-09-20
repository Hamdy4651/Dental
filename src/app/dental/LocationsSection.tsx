import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import clinicImage1 from "@/imports/images/1.jpeg";
import clinicImage2 from "@/imports/images/2.jpeg";
import clinicImage3 from "@/imports/images/3.jpeg";
import clinicImage4 from "@/imports/images/4.jpeg";
import clinicImage5 from "@/imports/images/5.jpeg";


import clinicImage11 from "@/imports/images/11.jpeg";
import clinicImage22 from "@/imports/images/44.jpeg";
import clinicImage33 from "@/imports/images/33.jpeg";
import clinicImage55 from "@/imports/images/55.jpeg";

interface LocationsSectionProps {
  onBooking: () => void;
}

const locations = [
  {
    city: "Darmstadt",
    images: [clinicImage4, clinicImage5, clinicImage3],
    address: "Luisenplatz, Darmstadt",
    phone: "+49 152 13709772",
    hours: "Mo - Fr 08:00 - 18:00",
    badge: "Hauptpraxis",
  },
  {
    city: "Hanau",
    images: [clinicImage11, clinicImage22, clinicImage33, clinicImage55],
    address: "Adresse der Praxis Hanau",
    phone: "+49 152 13709772",
    hours: "Mo - Fr 08:00 - 18:00",
    badge: "Zweigpraxis",
  },
];

interface LocationCardProps {
  location: (typeof locations)[number];
  index: number;
  onBooking: () => void;
}

function LocationCard({ location, index, onBooking }: LocationCardProps) {
  const [activeImage, setActiveImage] = useState(0);

  const showPrevious = () => {
    setActiveImage((current) =>
      current === 0 ? location.images.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveImage((current) => (current + 1) % location.images.length);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="group relative overflow-hidden rounded-[2rem] border border-[#062B67]/[0.08] bg-[#F7F5F0] shadow-[0_20px_60px_rgba(11,32,51,0.06)] transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(11,32,51,0.14)]"
    >
      <div className="relative h-[280px] overflow-hidden sm:h-[340px]">
        <img
          src={location.images[activeImage]}
          alt={`Praxisräume Blue Dental ${location.city}, Bild ${activeImage + 1}`}
          className="h-full w-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041D4A]/70 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
          {location.badge}
        </span>

        <button
          type="button"
          onClick={showPrevious}
          aria-label={`Vorheriges Bild von ${location.city}`}
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#062B67]/60 text-white backdrop-blur-md transition-colors hover:bg-[#0878D1]"
        >
          <ArrowLeft size={17} />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label={`Nächstes Bild von ${location.city}`}
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#062B67]/60 text-white backdrop-blur-md transition-colors hover:bg-[#0878D1]"
        >
          <ArrowRight size={17} />
        </button>

        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4">
          <h3
            className="text-3xl text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {location.city}
          </h3>
          <span className="rounded-full bg-[#062B67]/65 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
            {activeImage + 1} / {location.images.length}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-1.5 border-b border-[#062B67]/[0.06] px-6 py-3">
        {location.images.map((image, imageIndex) => (
          <button
            key={`${location.city}-${imageIndex}`}
            type="button"
            onClick={() => setActiveImage(imageIndex)}
            aria-label={`${location.city} Bild ${imageIndex + 1} anzeigen`}
            className={`h-1.5 rounded-full transition-all ${
              imageIndex === activeImage
                ? "w-7 bg-[#0878D1]"
                : "w-1.5 bg-[#062B67]/20 hover:bg-[#0878D1]/60"
            }`}
          />
        ))}
      </div>

      <div className="space-y-3 p-6 sm:p-7">
        <div className="flex items-start gap-3 text-sm text-[#454F58]">
          <MapPin size={16} className="mt-0.5 shrink-0 text-[#0878D1]" />
          <span>{location.address}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#454F58]">
          <Phone size={16} className="shrink-0 text-[#0878D1]" />
          <span>{location.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#454F58]">
          <Clock size={16} className="shrink-0 text-[#0878D1]" />
          <span>{location.hours}</span>
        </div>

        <button
          type="button"
          onClick={onBooking}
          className="group/btn mt-4 inline-flex items-center gap-2 rounded-full bg-[#062B67] px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#0878D1]"
        >
          Termin in {location.city} buchen
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </button>
      </div>
    </motion.article>
  );
}

export function LocationsSection({ onBooking }: LocationsSectionProps) {
  return (
    <section
      id="standorte"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#0878D1]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#0878D1]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0B4EA2]">
              Zwei Standorte, ein Anspruch
            </span>
          </div>
          <h2
            className="text-[#062B67]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              lineHeight: 1.05,
              fontWeight: 600,
            }}
          >
            Unsere Standorte
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {locations.map((location, index) => (
            <LocationCard
              key={location.city}
              location={location}
              index={index}
              onBooking={onBooking}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

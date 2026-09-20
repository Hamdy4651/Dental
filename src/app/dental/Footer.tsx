import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CalendarDays,
  Navigation,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoSrc from "@/imports/logoclinic.png";
import { clinic } from "./data";

const navLinks = [
  { href: "#hero", label: "Startseite" },
  { href: "#warum-wir", label: "Über uns" },
  { href: "#behandlungen", label: "Behandlungen" },
  { href: "#vorher-nachher", label: "Vorher & Nachher" },
  { href: "#team", label: "Team" },
  { href: "#standorte", label: "Standorte" },
  { href: "#bewertungen", label: "Bewertungen" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

/*
|--------------------------------------------------------------------------
| Google Maps
|--------------------------------------------------------------------------
| Erzeugt einen Link, der beim Klick direkt Google Maps (App oder Web)
| mit dem Standort der Praxis öffnet.
|
| Für beste Genauigkeit kann bei `mapsUrl` alternativ der Teilen-Link aus
| Google Maps eingetragen werden (Ort öffnen → "Teilen" → "Link kopieren",
| z. B. https://maps.app.goo.gl/xxxx).
*/

const mapsSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;

/*
|--------------------------------------------------------------------------
| Praxisstandorte
|--------------------------------------------------------------------------
| Bitte hier später die echten Daten von Darmstadt und Hanau einsetzen.
*/

const locations = [
  {
    id: "darmstadt",
    name: "Darmstadt",
    address: "Luisenplatz, Darmstadt",
    phone: clinic.phone,
    // TODO: Genaue Adresse oder Google-Maps-Teilen-Link der Praxis einsetzen
    mapsUrl: mapsSearchUrl("Dentalpraxis Luisenplatz, Darmstadt"),
    hours: [
      { day: "Mo – Fr", time: "08:00 – 18:00" },
      { day: "Samstag", time: "Nach Vereinbarung" },
      { day: "Sonntag", time: "Geschlossen" },
    ],
  },
  {
    id: "hanau",
    name: "Hanau",
    address: "Adresse der Praxis Hanau",
    phone: "+49 ...",
    // TODO: Echte Adresse oder Google-Maps-Teilen-Link der Praxis Hanau einsetzen
    mapsUrl: mapsSearchUrl("Zahnarztpraxis Hanau"),
    hours: [
      { day: "Mo – Fr", time: "08:00 – 18:00" },
      { day: "Samstag", time: "Nach Vereinbarung" },
      { day: "Sonntag", time: "Geschlossen" },
    ],
  },
];

const treatments = [
  "Vorsorge & Prophylaxe",
  "Schmerz & Beschwerden",
  "Ästhetische Zahnmedizin",
  "Implantologie & Zahnersatz",
  "Kinderzahnmedizin",
];

const scrollTo = (href: string) => {
  document
    .querySelector(href)
    ?.scrollIntoView({ behavior: "smooth" });
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#062B67]"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">

        {/* =====================================================
            TOP INTRO
        ====================================================== */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <ImageWithFallback
                src={logoSrc}
                alt="Zahnarztpraxis"
                className="h-11 w-11 object-contain"
              />

              <div>
                <p
                  className="text-white font-semibold text-sm"
                  style={{
                    fontFamily:
                      "var(--font-display)",
                  }}
                >
                  {clinic.name}
                </p>

                <p
                  className="text-white/40 text-xs mt-0.5"
                  style={{
                    fontFamily:
                      "var(--font-body)",
                  }}
                >
                  Zahnmedizin in Darmstadt & Hanau
                </p>
              </div>
            </div>

            <p
              className="text-white/40 text-sm leading-relaxed max-w-xl"
              style={{
                fontFamily:
                  "var(--font-body)",
              }}
            >
              Moderne Zahnmedizin mit persönlicher
              Betreuung, präziser Diagnostik und einem
              hohen Anspruch an Qualität und
              Patientenkomfort.
            </p>
          </div>

          {/* Booking CTA */}

          <button
            onClick={() => {
              document
                .querySelector("#hero")
                ?.scrollIntoView({
                  behavior: "smooth",
                });

              /*
               * Falls dein BookingWizard über einen
               * globalen Handler geöffnet wird, kannst
               * du diesen Button später direkt damit
               * verbinden.
               */
            }}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0878D1] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#0878D1]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B4EA2] hover:shadow-xl hover:shadow-[#0878D1]/30 w-fit"
            style={{
              fontFamily:
                "var(--font-body)",
            }}
          >
            <CalendarDays size={16} />

            <span>
              Termin buchen
            </span>

            <span className="ml-0.5 inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* =====================================================
            MAIN GRID
        ====================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* ===================================================
              BRAND / CONTACT
          ==================================================== */}

          <div>
            <h3
              className="text-white text-xs font-semibold uppercase tracking-widest mb-5"
              style={{
                fontFamily:
                  "var(--font-body)",
              }}
            >
              Kontakt
            </h3>

            <div className="space-y-3">

              <a
                href={`tel:${clinic.phone.replace(
                  /\s/g,
                  ""
                )}`}
                className="flex items-center gap-2.5 text-white/40 hover:text-[#0878D1] text-sm transition-colors"
                style={{
                  fontFamily:
                    "var(--font-body)",
                }}
              >
                <Phone size={14} />
                {clinic.phone}
              </a>

              <a
                href={`mailto:${clinic.email}`}
                className="flex items-center gap-2.5 text-white/40 hover:text-[#0878D1] text-sm transition-colors break-all"
                style={{
                  fontFamily:
                    "var(--font-body)",
                }}
              >
                <Mail size={14} />
                {clinic.email}
              </a>
            </div>
          </div>

          {/* ===================================================
              NAVIGATION
          ==================================================== */}

          <div>
            <h3
              className="text-white text-xs font-semibold uppercase tracking-widest mb-5"
              style={{
                fontFamily:
                  "var(--font-body)",
              }}
            >
              Navigation
            </h3>

            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() =>
                      scrollTo(link.href)
                    }
                    className="text-white/40 hover:text-[#0878D1] text-sm transition-colors text-left"
                    style={{
                      fontFamily:
                        "var(--font-body)",
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ===================================================
              BEHANDLUNGEN
          ==================================================== */}

          <div>
            <h3
              className="text-white text-xs font-semibold uppercase tracking-widest mb-5"
              style={{
                fontFamily:
                  "var(--font-body)",
              }}
            >
              Behandlungen
            </h3>

            <ul className="space-y-2.5">
              {treatments.map((treatment) => (
                <li key={treatment}>
                  <button
                    onClick={() =>
                      scrollTo("#behandlungen")
                    }
                    className="text-white/40 hover:text-[#0878D1] text-sm transition-colors text-left"
                    style={{
                      fontFamily:
                        "var(--font-body)",
                    }}
                  >
                    {treatment}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ===================================================
              STANDORTE (klickbar → Google Maps)
          ==================================================== */}

          <div>
            <h3
              className="text-white text-xs font-semibold uppercase tracking-widest mb-5"
              style={{
                fontFamily:
                  "var(--font-body)",
              }}
            >
              Unsere Standorte
            </h3>

            <div className="space-y-3">

              {locations.map((location) => (
                <a
                  key={location.id}
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Praxis ${location.name} in Google Maps öffnen`}
                  className="group flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#0878D1]/15">
                    <MapPin
                      size={14}
                      className="text-[#0878D1]"
                    />
                  </div>

                  <div>
                    <p
                      className="text-white text-sm font-medium transition-colors group-hover:text-[#0878D1]"
                      style={{
                        fontFamily:
                          "var(--font-body)",
                      }}
                    >
                      {location.name}
                    </p>

                    <p
                      className="text-white/40 text-xs mt-0.5 leading-relaxed"
                      style={{
                        fontFamily:
                          "var(--font-body)",
                      }}
                    >
                      {location.address}
                    </p>
                  </div>
                </a>
              ))}

            </div>
          </div>
        </div>

        {/* =====================================================
            LOCATION CARDS
        ====================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">

          {locations.map((location) => (
            <div
              key={location.id}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

                {/* Location */}

                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0878D1]/10 flex items-center justify-center">
                      <MapPin
                        size={16}
                        className="text-[#0878D1]"
                      />
                    </div>

                    <div>
                      <p
                        className="text-white text-sm font-semibold"
                        style={{
                          fontFamily:
                            "var(--font-body)",
                        }}
                      >
                        Praxis {location.name}
                      </p>

                      <p className="text-white/35 text-[11px]">
                        Zahnmedizin
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-white/45 text-xs leading-relaxed"
                    style={{
                      fontFamily:
                        "var(--font-body)",
                    }}
                  >
                    {location.address}
                  </p>

                  <a
                    href={`tel:${location.phone.replace(
                      /\s/g,
                      ""
                    )}`}
                    className="inline-flex items-center gap-2 mt-3 text-white/45 hover:text-[#0878D1] text-xs transition-colors"
                  >
                    <Phone size={12} />
                    {location.phone}
                  </a>

                  {/* Google Maps Button */}

                  <div>
                    <a
                      href={location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Route zur Praxis ${location.name} in Google Maps öffnen`}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#0878D1]/30 bg-[#0878D1]/10 px-4 py-2 text-xs font-medium text-[#0878D1] transition-all duration-300 hover:bg-[#0878D1] hover:text-white"
                      style={{
                        fontFamily:
                          "var(--font-body)",
                      }}
                    >
                      <Navigation size={12} />
                      In Google Maps öffnen
                    </a>
                  </div>
                </div>

                {/* Opening hours */}

                <div className="sm:min-w-[230px]">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock
                      size={14}
                      className="text-[#0878D1]"
                    />

                    <span className="text-white text-xs font-semibold">
                      Öffnungszeiten
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {location.hours.map(
                      (hour) => (
                        <div
                          key={hour.day}
                          className="flex justify-between gap-5 text-[11px]"
                        >
                          <span className="text-white/35">
                            {hour.day}
                          </span>

                          <span className="text-white/55">
                            {hour.time}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =====================================================
            BOTTOM
        ====================================================== */}

        <div className="border-t border-white/5 pt-8 flex flex-col lg:flex-row items-center justify-between gap-5">

          <p
            className="text-white/25 text-xs text-center lg:text-left"
            style={{
              fontFamily:
                "var(--font-body)",
            }}
          >
            © {currentYear} {clinic.name}.
            Alle Rechte vorbehalten.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="#"
              className="text-white/25 hover:text-white/60 text-xs transition-colors"
            >
              Impressum
            </a>

            <a
              href="#"
              className="text-white/25 hover:text-white/60 text-xs transition-colors"
            >
              Datenschutz
            </a>

            <a
              href="#"
              className="text-white/25 hover:text-white/60 text-xs transition-colors"
            >
              Cookie-Richtlinie
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
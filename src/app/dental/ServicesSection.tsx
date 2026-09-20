import { motion } from "motion/react";
import {
  ArrowUpRight,
  ShieldCheck,
  ScanSearch,
  Sparkles,
  Baby,
  CircleDot,
  HeartPulse,
  Stethoscope,
  Activity,
  Crown,
  Smile,
  ScanLine,
  HeartHandshake,
  Syringe,
  CalendarDays,
  Clock3,
  Euro,
} from "lucide-react";

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  icon: keyof typeof iconMap;
}

interface ServicesSectionProps {
  onBooking: () => void;
}

const iconMap = {
  checkup: <ShieldCheck size={20} />,
  diagnostics: <ScanSearch size={20} />,
  cleaning: <Sparkles size={20} />,
  child: <Baby size={20} />,
  filling: <CircleDot size={20} />,
  pain: <HeartPulse size={20} />,
  root: <Stethoscope size={20} />,
  gums: <Activity size={20} />,
  crown: <Crown size={20} />,
  denture: <Smile size={20} />,
  whitening: <Sparkles size={20} />,
  xray: <ScanLine size={20} />,
  consultation: <HeartHandshake size={20} />,
  implant: <Syringe size={20} />,
};

const services: Service[] = [
  {
    id: "untersuchung",
    number: "01",
    title: "Zahnuntersuchungen & Diagnostik",
    description:
      "Gründliche Untersuchung Ihrer Zähne, Ihres Zahnfleisches und der gesamten Mundgesundheit.",
    price: "Preis nach Beratung",
    duration: "ca. 20 Min.",
    // Dentist examining a patient with a dental scanner
    image:
      "https://images.unsplash.com/photo-1667133295315-820bb6481730?w=1200&auto=format&fit=crop&q=85",
    icon: "checkup",
  },

  {
    id: "zahnreinigung",
    number: "02",
    title: "Professionelle Zahnreinigung",
    description:
      "Entfernung von Belägen und Zahnstein für ein sauberes, frisches und gepflegtes Lächeln.",
    price: "ab 90 €",
    duration: "ca. 45 bis 60 Min.",
    // Woman having her teeth treated by a dentist
    image:
      "https://images.unsplash.com/photo-1681939282781-341ac4f61996?w=1200&auto=format&fit=crop&q=85",
    icon: "cleaning",
  },

  {
    id: "kinderprophylaxe",
    number: "03",
    title: "Kinderprophylaxe & Vorsorge",
    description:
      "Kindgerechte Vorsorge und individuelle Beratung für gesunde Zähne von Anfang an.",
    price: "nach Versicherungsleistung",
    duration: "ca. 20 bis 30 Min.",
    // Bright, friendly orange dental chair
    image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&auto=format&fit=crop&q=85",
    icon: "child",
  },

  {
    id: "karies",
    number: "04",
    title: "Kariesbehandlung & Füllungen",
    description:
      "Schonende Behandlung von Karies und hochwertige Füllungen für Funktion und Ästhetik.",
    price: "Preis nach Befund",
    duration: "ca. 30 bis 60 Min.",
    // Two dentists performing a procedure on a patient
    image:
      "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=1200&auto=format&fit=crop&q=85",
    icon: "filling",
  },

  {
    id: "zahnschmerzen",
    number: "05",
    title: "Zahnschmerzen & Entzündungen",
    description:
      "Schnelle Untersuchung und gezielte Behandlung bei akuten Schmerzen und Entzündungen.",
    price: "nach Untersuchung",
    duration: "ca. 20 bis 45 Min.",
    // Dentist examining a patient with a dental mirror
    image:
      "https://images.unsplash.com/photo-1667133295352-ef4c83620e8e?w=1200&auto=format&fit=crop&q=85",
    icon: "pain",
  },

  {
    id: "extraktion",
    number: "06",
    title: "Zahnextraktionen",
    description:
      "Schonende Entfernung von nicht erhaltungswürdigen oder stark geschädigten Zähnen.",
    price: "Preis nach Befund",
    duration: "ca. 20 bis 45 Min.",
    // Dentist working on a patient
    image:
      "https://images.unsplash.com/photo-1657470179447-0f5aa16daa91?w=1200&auto=format&fit=crop&q=85",
    icon: "root",
  },

  {
    id: "wurzelkanal",
    number: "07",
    title: "Wurzelkanalbehandlungen",
    description:
      "Präzise Behandlung entzündeter Zahnwurzeln mit dem Ziel, den natürlichen Zahn zu erhalten.",
    price: "Preis nach Befund",
    duration: "ca. 60 bis 90 Min.",
    // Dentist in blue gloves examining a patient's teeth
    image:
      "https://images.unsplash.com/photo-1663755489920-5e09f66d011a?w=1200&auto=format&fit=crop&q=85",
    icon: "root",
  },

  {
    id: "zahnfleisch",
    number: "08",
    title: "Zahnfleischbehandlung & Vorsorge",
    description:
      "Früherkennung und Behandlung von Zahnfleischerkrankungen für langfristig gesunde Zähne.",
    price: "Preis nach Befund",
    duration: "ca. 30 bis 60 Min.",
    // Dental mirror in the foreground, blurred dental chair behind
    image:
      "https://images.unsplash.com/photo-1698749778813-ad5f2814e50f?w=1200&auto=format&fit=crop&q=85",
    icon: "gums",
  },

  {
    id: "kronen-bruecken",
    number: "09",
    title: "Kronen & Brücken",
    description:
      "Hochwertiger Zahnersatz zur Wiederherstellung von Funktion, Stabilität und natürlicher Ästhetik.",
    price: "ab 700 €",
    duration: "mehrere Termine",
    // Close-up of a mouth with natural white teeth
    image:
      "https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?w=1200&auto=format&fit=crop&q=85",
    icon: "crown",
  },

  {
    id: "prothesen",
    number: "10",
    title: "Zahnprothesen",
    description:
      "Individuell angepasste Lösungen für Komfort, Funktion und ein sicheres Gefühl im Alltag.",
    price: "Preis nach Planung",
    duration: "mehrere Termine",
    // Hand holding a denture
    image:
      "https://images.unsplash.com/photo-1468493858157-0da44aaf1d13?w=1200&auto=format&fit=crop&q=85",
    icon: "denture",
  },

  {
    id: "bleaching",
    number: "11",
    title: "Bleaching & Ästhetische Zahnmedizin",
    description:
      "Professionelle Zahnaufhellung und ästhetische Behandlungen für ein natürlich schönes Lächeln.",
    price: "ab 300 €",
    duration: "ca. 60 bis 90 Min.",
    // Smiling woman, close-up
    image:
      "https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?w=1200&auto=format&fit=crop&q=85",
    icon: "whitening",
  },

  {
    id: "roentgen",
    number: "12",
    title: "Digitale Röntgendiagnostik",
    description:
      "Moderne Röntgenaufnahmen zur präzisen Diagnostik und sicheren Behandlungsplanung.",
    price: "Preis nach Untersuchung",
    duration: "ca. 10 bis 20 Min.",
    // Dentist examining dental X-rays on a light box
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&auto=format&fit=crop&q=85",
    icon: "xray",
  },

  {
    id: "mundhygiene",
    number: "13",
    title: "Beratung zur Mundhygiene",
    description:
      "Individuelle Tipps und Empfehlungen für die tägliche Zahnpflege und langfristige Mundgesundheit.",
    price: "im Beratungstermin",
    duration: "ca. 15 bis 30 Min.",
    // Gloved hand holding a toothbrush
    image:
      "https://images.unsplash.com/photo-1720685193975-3b449a7cb905?w=1200&auto=format&fit=crop&q=85",
    icon: "consultation",
  },

  {
    id: "implantate",
    number: "14",
    title: "Zahnimplantate",
    description:
      "Moderne Implantologie zum Ersatz fehlender Zähne für eine stabile und natürlich wirkende Lösung.",
    price: "Preis nach Planung",
    duration: "individuell",
    // Dental implant model with teeth
    image:
      "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?w=1200&auto=format&fit=crop&q=85",
    icon: "implant",
  },
];

export function ServicesSection({
  onBooking,
}: ServicesSectionProps) {
  return (
    <section
      id="behandlungen"
      className="relative overflow-hidden bg-[#F7F8F6] py-24 sm:py-32"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0878D1]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col justify-between gap-8 lg:mb-20 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#0878D1]" />

              <span
                className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0878D1]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Unsere Behandlungen
              </span>
            </div>

            <h2
              className="text-[#062B67]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                lineHeight: 1.02,
                fontWeight: 600,
                letterSpacing: "-0.035em",
              }}
            >
              Zahnmedizin,
              <br />

              <span className="text-[#0878D1]">
                die zu Ihnen passt.
              </span>
            </h2>
          </div>

          <p
            className="max-w-md text-base leading-8 text-[#6B7A8D]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Von der Vorsorge bis zur modernen Implantologie. Wir
            begleiten Sie mit Erfahrung, moderner Technik und
            persönlicher Betreuung.
          </p>
        </motion.div>

        {/* Services */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.12,
              }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.08,
              }}
              whileHover={{
                y: -8,
              }}
              className="group relative flex flex-col overflow-hidden rounded-[1.8rem] border border-[#062B67]/7 bg-white shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#062B67]/10"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041D4A]/75 via-[#041D4A]/10 to-transparent" />

                {/* Number */}
                <div className="absolute left-5 top-5">
                  <span
                    className="text-5xl font-semibold tracking-tight text-white/35"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {service.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/90 text-[#062B67] shadow-lg backdrop-blur-md transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#0878D1] group-hover:text-white">
                  {iconMap[service.icon]}
                </div>

                {/* Title */}
                <div className="absolute bottom-5 left-6 right-6">
                  <div className="mb-2 h-px w-10 bg-[#48B5F5] transition-all duration-500 group-hover:w-20" />

                  <h3
                    className="text-2xl leading-tight text-white"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                    }}
                  >
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <p
                  className="mb-6 text-sm leading-7 text-[#6B7A8D]"
                  style={{
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {service.description}
                </p>

                {/* Price + Duration */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[#062B67]/6 bg-[#F7F8F6] p-3.5">
                    <div className="mb-1.5 flex items-center gap-1.5 text-[#0878D1]">
                      <Euro size={14} />

                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                        Preis
                      </span>
                    </div>

                    <p className="text-xs font-semibold leading-5 text-[#062B67]">
                      {service.price}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#062B67]/6 bg-[#F7F8F6] p-3.5">
                    <div className="mb-1.5 flex items-center gap-1.5 text-[#0878D1]">
                      <Clock3 size={14} />

                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                        Dauer
                      </span>
                    </div>

                    <p className="text-xs font-semibold leading-5 text-[#062B67]">
                      {service.duration}
                    </p>
                  </div>
                </div>

                {/* Booking button */}
                <button
                  onClick={onBooking}
                  className="group/button mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-[#0878D1] px-6 py-3.5 font-medium text-white shadow-lg shadow-[#0878D1]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B4EA2] hover:shadow-xl hover:shadow-[#0878D1]/25 active:translate-y-0"
                >
                  <CalendarDays size={16} />

                  <span>Termin buchen</span>

                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1"
                  />
                </button>
              </div>

              {/* Animated bottom line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#0878D1] via-[#48B5F5] to-[#0878D1] transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-16 overflow-hidden rounded-[2rem] bg-[#062B67] px-6 py-10 sm:px-10 sm:py-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0878D1]/15 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-[#48B5F5]">
                <Sparkles size={16} />

                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Ihr nächster Schritt
                </span>
              </div>

              <h3
                className="mb-3 text-3xl text-white sm:text-4xl"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                }}
              >
                Nicht sicher, welche Behandlung Sie brauchen?
              </h3>

              <p className="max-w-xl leading-7 text-white/60">
                Vereinbaren Sie einen Termin. Wir nehmen uns Zeit für
                eine persönliche Untersuchung und beraten Sie
                individuell.
              </p>
            </div>

            <button
              onClick={onBooking}
              className="group shrink-0 flex items-center justify-center gap-2 rounded-full bg-[#0878D1] px-7 py-4 font-medium text-white shadow-lg shadow-[#0878D1]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0B4EA2] hover:shadow-xl hover:shadow-[#0878D1]/30"
            >
              <CalendarDays size={17} />

              <span>Termin buchen</span>

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs leading-6 text-[#6B7A8D]/75">
          Die angegebenen Preise und Behandlungszeiten dienen zur
          Orientierung. Der endgültige Umfang und die Kosten richten
          sich nach dem individuellen Befund und der Behandlungsplanung.
        </p>
      </div>
    </section>
  );
}
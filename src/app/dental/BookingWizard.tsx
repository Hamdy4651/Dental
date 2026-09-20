import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Shield,
  Activity,
  Sparkles,
  Layers,
  Smile,
  MessageCircle,
  MapPin,
  Calendar,
  Clock,
  Phone,
} from "lucide-react";
import { bookingTreatments, doctors } from "./data";

interface BookingState {
  locationId: string;
  treatment: string;
  doctorId: number | null;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const EMPTY: BookingState = {
  locationId: "",
  treatment: "",
  doctorId: null,
  date: "",
  time: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

/*
|--------------------------------------------------------------------------
| Standorte
|--------------------------------------------------------------------------
| Ersetze hier die Adressen und Öffnungszeiten durch die echten Daten.
| Der Rest des Booking-Wizards muss dafür nicht geändert werden.
*/

const LOCATIONS = [
  {
    id: "darmstadt",
    name: "Darmstadt",
    address: "Luisenplatz, Darmstadt",
    addressLine2: "Deutschland",
    phone: "+49 ...",
    hours: [
      { day: "Montag", time: "08:00 – 18:00 Uhr" },
      { day: "Dienstag", time: "08:00 – 18:00 Uhr" },
      { day: "Mittwoch", time: "08:00 – 18:00 Uhr" },
      { day: "Donnerstag", time: "08:00 – 18:00 Uhr" },
      { day: "Freitag", time: "08:00 – 16:00 Uhr" },
      { day: "Samstag", time: "Nach Vereinbarung" },
      { day: "Sonntag", time: "Geschlossen" },
    ],
  },
  {
    id: "hanau",
    name: "Hanau",
    address: "Adresse der Praxis Hanau",
    addressLine2: "Hanau, Deutschland",
    phone: "+49 ...",
    hours: [
      { day: "Montag", time: "08:00 – 18:00 Uhr" },
      { day: "Dienstag", time: "08:00 – 18:00 Uhr" },
      { day: "Mittwoch", time: "08:00 – 18:00 Uhr" },
      { day: "Donnerstag", time: "08:00 – 18:00 Uhr" },
      { day: "Freitag", time: "08:00 – 16:00 Uhr" },
      { day: "Samstag", time: "Nach Vereinbarung" },
      { day: "Sonntag", time: "Geschlossen" },
    ],
  },
];

const STEPS = [
  { id: 1, label: "Standort" },
  { id: 2, label: "Behandlung" },
  { id: 3, label: "Arzt" },
  { id: 4, label: "Datum" },
  { id: 5, label: "Uhrzeit" },
  { id: 6, label: "Daten" },
  { id: 7, label: "Bestätigung" },
];

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={22} />,
  "heart-pulse": <Activity size={22} />,
  sparkles: <Sparkles size={22} />,
  layers: <Layers size={22} />,
  smile: <Smile size={22} />,
  "message-circle": <MessageCircle size={22} />,
};

function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days: {
    day: number | null;
    date?: Date;
    available?: boolean;
  }[] = [];

  const offset = (firstDay + 6) % 7;

  for (let i = 0; i < offset; i++) {
    days.push({ day: null });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);

    const isWeekend =
      date.getDay() === 0 || date.getDay() === 6;

    days.push({
      day: d,
      date,
      available: !isWeekend && date >= today,
    });
  }

  return days;
}

const TIMES = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];

const MONTHS_DE = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

const DAYS_DE = [
  "Mo",
  "Di",
  "Mi",
  "Do",
  "Fr",
  "Sa",
  "So",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function BookingWizard({ open, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [booking, setBooking] =
    useState<BookingState>(EMPTY);

  const [submitted, setSubmitted] = useState(false);

  const today = new Date();

  const [calYear, setCalYear] = useState(
    today.getFullYear()
  );

  const [calMonth, setCalMonth] = useState(
    today.getMonth()
  );

  const [dir, setDir] = useState(1);

  const next = useCallback(() => {
    setStep((s) => Math.min(s + 1, 7));
  }, []);

  const prev = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const selectedLocation = LOCATIONS.find(
    (location) =>
      location.id === booking.locationId
  );

  const treatmentLabel =
    bookingTreatments.find(
      (t) => t.id === booking.treatment
    )?.label || "";

  const doctorName =
    doctors.find(
      (d) => d.id === booking.doctorId
    )?.name || "";

  const canNext = () => {
    if (step === 1) {
      return !!booking.locationId;
    }

    if (step === 2) {
      return !!booking.treatment;
    }

    if (step === 3) {
      return booking.doctorId !== null;
    }

    if (step === 4) {
      return !!booking.date;
    }

    if (step === 5) {
      return !!booking.time;
    }

    if (step === 6) {
      return (
        !!booking.firstName &&
        !!booking.lastName &&
        !!booking.email &&
        !!booking.phone
      );
    }

    return true;
  };

  const goNext = () => {
    if (!canNext()) return;

    setDir(1);
    next();
  };

  const goPrev = () => {
    setDir(-1);
    prev();
  };

  const handleSubmit = () => {
    setSubmitted(true);

    /*
     * Hier kannst du später deine API / Backend-Anbindung
     * einbauen.
     *
     * Zum Beispiel:
     *
     * await fetch("/api/appointments", {
     *   method: "POST",
     *   body: JSON.stringify(booking)
     * });
     */

    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      setBooking(EMPTY);
      onClose();
    }, 4000);
  };

  const calDays = generateCalendarDays(
    calYear,
    calMonth
  );

  const selectedDateFormatted = booking.date
    ? new Date(
        `${booking.date}T12:00:00`
      ).toLocaleDateString("de-DE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
    }),

    center: {
      x: 0,
      opacity: 1,
    },

    exit: (direction: number) => ({
      x: direction > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  const inputCls =
    "w-full border border-[rgba(13,27,42,0.12)] rounded-xl px-4 py-3 text-[#062B67] placeholder:text-[#6B7A8D]/50 focus:outline-none focus:border-[#0878D1] focus:ring-2 focus:ring-[#0878D1]/10 transition-all bg-white text-sm";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{
            backdropFilter: "blur(12px)",
            background: "rgba(13,27,42,0.6)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{
              y: 60,
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              y: 60,
              opacity: 0,
              scale: 0.97,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative bg-[#FAFAF8] w-full max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[92vh] flex flex-col shadow-2xl"
          >
            {/* =====================================================
                HEADER
            ====================================================== */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(13,27,42,0.06)] bg-white flex-shrink-0">
              <div>
                <h2
                  className="text-[#062B67] font-semibold"
                  style={{
                    fontFamily:
                      "var(--font-display)",
                    fontSize: "1.15rem",
                  }}
                >
                  Termin buchen
                </h2>

                <p
                  className="text-[#6B7A8D] text-xs mt-0.5"
                  style={{
                    fontFamily:
                      "var(--font-body)",
                  }}
                >
                  Schritt {step} von 7
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[#EDF1F5] flex items-center justify-center text-[#6B7A8D] hover:bg-[#062B67] hover:text-white transition-all"
                aria-label="Schließen"
              >
                <X size={16} />
              </button>
            </div>

            {/* =====================================================
                PROGRESS
            ====================================================== */}

            <div className="px-6 pt-5 flex-shrink-0">
              <div className="flex gap-1">
                {STEPS.map((s) => (
                  <div
                    key={s.id}
                    className="flex-1 min-w-0"
                  >
                    <div
                      className={`h-1 rounded-full transition-all duration-400 ${
                        step >= s.id
                          ? "bg-[#0878D1]"
                          : "bg-[rgba(13,27,42,0.1)]"
                      }`}
                    />

                    <p
                      className={`text-[9px] sm:text-[10px] mt-1 font-medium text-center transition-colors truncate ${
                        step === s.id
                          ? "text-[#0B4EA2]"
                          : step > s.id
                          ? "text-[#0878D1]"
                          : "text-[#6B7A8D]/40"
                      }`}
                      style={{
                        fontFamily:
                          "var(--font-body)",
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {submitted ? (
                <motion.div
                  initial={{
                    scale: 0.8,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-[#0878D1] rounded-full flex items-center justify-center mb-5 shadow-lg shadow-[#0878D1]/30">
                    <Check
                      size={28}
                      className="text-white"
                      strokeWidth={3}
                    />
                  </div>

                  <h3
                    className="text-[#062B67] mb-2"
                    style={{
                      fontFamily:
                        "var(--font-display)",
                      fontSize: "1.6rem",
                      fontWeight: 600,
                    }}
                  >
                    Vielen Dank.
                  </h3>

                  <p
                    className="text-[#6B7A8D] max-w-xs"
                    style={{
                      fontFamily:
                        "var(--font-body)",
                    }}
                  >
                    Wir haben Ihre
                    Terminanfrage erhalten und
                    melden uns so schnell wie
                    möglich bei Ihnen.
                  </p>
                </motion.div>
              ) : (
                <AnimatePresence
                  mode="wait"
                  custom={dir}
                >
                  {/* =================================================
                      STEP 1 - STANDORT
                  ================================================== */}

                  {step === 1 && (
                    <motion.div
                      key="step1"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <div className="mb-6">
                        <h3
                          className="text-[#062B67] mb-2"
                          style={{
                            fontFamily:
                              "var(--font-display)",
                            fontSize: "1.4rem",
                            fontWeight: 600,
                          }}
                        >
                          Wo möchten Sie Ihren Termin?
                        </h3>

                        <p
                          className="text-[#6B7A8D] text-sm"
                          style={{
                            fontFamily:
                              "var(--font-body)",
                          }}
                        >
                          Wählen Sie den gewünschten
                          Praxisstandort.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {LOCATIONS.map(
                          (location) => {
                            const isSelected =
                              booking.locationId ===
                              location.id;

                            return (
                              <button
                                key={location.id}
                                onClick={() =>
                                  setBooking(
                                    (b) => ({
                                      ...b,
                                      locationId:
                                        location.id,
                                    })
                                  )
                                }
                                className={`group text-left rounded-2xl border-2 overflow-hidden transition-all ${
                                  isSelected
                                    ? "border-[#0878D1] bg-[#0878D1]/5 shadow-md"
                                    : "border-[rgba(13,27,42,0.08)] bg-white hover:border-[rgba(13,27,42,0.2)] hover:shadow-md"
                                }`}
                              >
                                {/* Location top */}
                                <div
                                  className={`p-5 ${
                                    isSelected
                                      ? "bg-[#0878D1]/5"
                                      : "bg-white"
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                                          isSelected
                                            ? "bg-[#0878D1] text-white"
                                            : "bg-[#EDF1F5] text-[#0B4EA2] group-hover:bg-[#0B4EA2] group-hover:text-white"
                                        }`}
                                      >
                                        <MapPin
                                          size={20}
                                        />
                                      </div>

                                      <div>
                                        <p
                                          className="text-[#062B67] font-semibold text-base"
                                          style={{
                                            fontFamily:
                                              "var(--font-body)",
                                          }}
                                        >
                                          {location.name}
                                        </p>

                                        <p
                                          className="text-[#6B7A8D] text-xs mt-0.5"
                                          style={{
                                            fontFamily:
                                              "var(--font-body)",
                                          }}
                                        >
                                          Praxisstandort
                                        </p>
                                      </div>
                                    </div>

                                    {isSelected && (
                                      <div className="w-6 h-6 rounded-full bg-[#0878D1] flex items-center justify-center">
                                        <Check
                                          size={13}
                                          className="text-white"
                                          strokeWidth={3}
                                        />
                                      </div>
                                    )}
                                  </div>

                                  {/* Address */}
                                  <div className="mt-5 flex gap-2">
                                    <MapPin
                                      size={14}
                                      className="text-[#0878D1] mt-0.5 flex-shrink-0"
                                    />

                                    <div>
                                      <p className="text-[#062B67] text-sm font-medium">
                                        {location.address}
                                      </p>

                                      <p className="text-[#6B7A8D] text-xs mt-0.5">
                                        {
                                          location.addressLine2
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Opening hours */}
                                <div className="border-t border-[rgba(13,27,42,0.06)] px-5 py-4 bg-[#FAFAF8]">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Clock
                                      size={14}
                                      className="text-[#0878D1]"
                                    />

                                    <span className="text-[#062B67] text-xs font-semibold">
                                      Öffnungszeiten
                                    </span>
                                  </div>

                                  <div className="space-y-1.5">
                                    {location.hours
                                      .slice(0, 5)
                                      .map((hour) => (
                                        <div
                                          key={
                                            hour.day
                                          }
                                          className="flex justify-between gap-3 text-[11px]"
                                        >
                                          <span className="text-[#6B7A8D]">
                                            {hour.day}
                                          </span>

                                          <span className="text-[#062B67] font-medium">
                                            {hour.time}
                                          </span>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </button>
                            );
                          }
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* =================================================
                      STEP 2 - BEHANDLUNG
                  ================================================== */}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <h3
                        className="text-[#062B67] mb-2"
                        style={{
                          fontFamily:
                            "var(--font-display)",
                          fontSize: "1.4rem",
                          fontWeight: 600,
                        }}
                      >
                        Welche Behandlung wünschen Sie?
                      </h3>

                      <p className="text-[#6B7A8D] text-xs mb-6">
                        Standort:{" "}
                        <span className="text-[#0B4EA2] font-medium">
                          {selectedLocation?.name}
                        </span>
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {bookingTreatments.map(
                          (t) => {
                            const isSelected =
                              booking.treatment ===
                              t.id;

                            return (
                              <button
                                key={t.id}
                                onClick={() =>
                                  setBooking(
                                    (b) => ({
                                      ...b,
                                      treatment:
                                        t.id,
                                    })
                                  )
                                }
                                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                                  isSelected
                                    ? "border-[#0878D1] bg-[#0878D1]/8"
                                    : "border-[rgba(13,27,42,0.08)] bg-white hover:border-[rgba(13,27,42,0.2)]"
                                }`}
                              >
                                <div
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-[#0878D1] text-white"
                                      : "bg-[#EDF1F5] text-[#0B4EA2]"
                                  }`}
                                >
                                  {iconMap[t.icon]}
                                </div>

                                <span
                                  className="text-[#062B67] font-medium text-sm leading-tight"
                                  style={{
                                    fontFamily:
                                      "var(--font-body)",
                                  }}
                                >
                                  {t.label}
                                </span>

                                {isSelected && (
                                  <Check
                                    size={14}
                                    className="text-[#0878D1] ml-auto flex-shrink-0"
                                  />
                                )}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* =================================================
                      STEP 3 - ARZT
                  ================================================== */}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <h3
                        className="text-[#062B67] mb-2"
                        style={{
                          fontFamily:
                            "var(--font-display)",
                          fontSize: "1.4rem",
                          fontWeight: 600,
                        }}
                      >
                        Bei wem möchten Sie Ihren Termin?
                      </h3>

                      <p className="text-[#6B7A8D] text-xs mb-6">
                        Behandlung:{" "}
                        <span className="text-[#0B4EA2] font-medium">
                          {treatmentLabel}
                        </span>
                      </p>

                      <div className="flex flex-col gap-3">
                        {doctors.map((doc) => {
                          const isSelected =
                            booking.doctorId ===
                            doc.id;

                          return (
                            <button
                              key={doc.id}
                              onClick={() =>
                                setBooking(
                                  (b) => ({
                                    ...b,
                                    doctorId:
                                      doc.id,
                                  })
                                )
                              }
                              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                                isSelected
                                  ? "border-[#0878D1] bg-[#0878D1]/8"
                                  : "border-[rgba(13,27,42,0.08)] bg-white hover:border-[rgba(13,27,42,0.2)]"
                              }`}
                            >
                              <img
                                src={doc.image}
                                alt={doc.name}
                                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                              />

                              <div className="flex-1">
                                <p
                                  className="text-[#062B67] font-semibold text-sm"
                                  style={{
                                    fontFamily:
                                      "var(--font-body)",
                                  }}
                                >
                                  {doc.name}
                                </p>

                                <p className="text-[#6B7A8D] text-xs mt-0.5">
                                  {
                                    doc.specialization
                                  }
                                </p>
                              </div>

                              {isSelected && (
                                <Check
                                  size={16}
                                  className="text-[#0878D1]"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* =================================================
                      STEP 4 - DATUM
                  ================================================== */}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <h3
                        className="text-[#062B67] mb-6"
                        style={{
                          fontFamily:
                            "var(--font-display)",
                          fontSize: "1.4rem",
                          fontWeight: 600,
                        }}
                      >
                        Wählen Sie einen Termin.
                      </h3>

                      {/* Month navigation */}

                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => {
                            if (calMonth === 0) {
                              setCalMonth(11);
                              setCalYear(
                                (y) => y - 1
                              );
                            } else {
                              setCalMonth(
                                (m) => m - 1
                              );
                            }
                          }}
                          className="w-8 h-8 rounded-full border border-[rgba(13,27,42,0.12)] flex items-center justify-center hover:bg-white transition-colors"
                          aria-label="Vorheriger Monat"
                        >
                          <ChevronLeft
                            size={14}
                          />
                        </button>

                        <p
                          className="text-[#062B67] font-semibold text-sm"
                          style={{
                            fontFamily:
                              "var(--font-body)",
                          }}
                        >
                          {MONTHS_DE[calMonth]}{" "}
                          {calYear}
                        </p>

                        <button
                          onClick={() => {
                            if (calMonth === 11) {
                              setCalMonth(0);
                              setCalYear(
                                (y) => y + 1
                              );
                            } else {
                              setCalMonth(
                                (m) => m + 1
                              );
                            }
                          }}
                          className="w-8 h-8 rounded-full border border-[rgba(13,27,42,0.12)] flex items-center justify-center hover:bg-white transition-colors"
                          aria-label="Nächster Monat"
                        >
                          <ChevronRight
                            size={14}
                          />
                        </button>
                      </div>

                      {/* Days */}

                      <div className="grid grid-cols-7 mb-2">
                        {DAYS_DE.map((d) => (
                          <div
                            key={d}
                            className="text-center text-[#6B7A8D] text-xs font-medium py-1"
                            style={{
                              fontFamily:
                                "var(--font-body)",
                            }}
                          >
                            {d}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {calDays.map(
                          (cell, i) => {
                            if (!cell.day) {
                              return (
                                <div key={i} />
                              );
                            }

                            const dateStr =
                              cell.date
                                ? cell.date
                                    .toISOString()
                                    .split("T")[0]
                                : "";

                            const isSelected =
                              booking.date ===
                              dateStr;

                            return (
                              <button
                                key={i}
                                disabled={
                                  !cell.available
                                }
                                onClick={() => {
                                  if (
                                    cell.available
                                  ) {
                                    setBooking(
                                      (b) => ({
                                        ...b,
                                        date: dateStr,
                                        time: "",
                                      })
                                    );
                                  }
                                }}
                                className={`aspect-square rounded-xl text-sm font-medium transition-all ${
                                  isSelected
                                    ? "bg-[#0B4EA2] text-white shadow-md"
                                    : cell.available
                                    ? "hover:bg-[#0878D1]/15 text-[#062B67]"
                                    : "text-[#6B7A8D]/30 cursor-not-allowed"
                                }`}
                                style={{
                                  fontFamily:
                                    "var(--font-body)",
                                }}
                              >
                                {cell.day}
                              </button>
                            );
                          }
                        )}
                      </div>

                      {booking.date && (
                        <div className="mt-5 p-4 rounded-2xl bg-[#0878D1]/8 border border-[#0878D1]/15 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#0878D1] text-white flex items-center justify-center">
                            <Calendar
                              size={16}
                            />
                          </div>

                          <div>
                            <p className="text-[#6B7A8D] text-[11px]">
                              Gewählter Termin
                            </p>

                            <p className="text-[#062B67] text-sm font-semibold capitalize">
                              {selectedDateFormatted}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* =================================================
                      STEP 5 - UHRZEIT
                  ================================================== */}

                  {step === 5 && (
                    <motion.div
                      key="step5"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <h3
                        className="text-[#062B67] mb-2"
                        style={{
                          fontFamily:
                            "var(--font-display)",
                          fontSize: "1.4rem",
                          fontWeight: 600,
                        }}
                      >
                        Welche Uhrzeit passt Ihnen?
                      </h3>

                      <p
                        className="text-[#6B7A8D] text-xs mb-6"
                        style={{
                          fontFamily:
                            "var(--font-body)",
                        }}
                      >
                        Wählen Sie eine bevorzugte
                        Uhrzeit für Ihre Terminanfrage.
                      </p>

                      <div className="mb-5 p-4 rounded-2xl bg-white border border-[rgba(13,27,42,0.08)]">
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin
                              size={14}
                              className="text-[#0878D1]"
                            />

                            <span className="text-[#062B67] text-xs font-medium">
                              {selectedLocation?.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar
                              size={14}
                              className="text-[#0878D1]"
                            />

                            <span className="text-[#062B67] text-xs font-medium capitalize">
                              {selectedDateFormatted}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {TIMES.map((time) => {
                          const isSelected =
                            booking.time === time;

                          return (
                            <button
                              key={time}
                              onClick={() =>
                                setBooking(
                                  (b) => ({
                                    ...b,
                                    time,
                                  })
                                )
                              }
                              className={`flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                                isSelected
                                  ? "border-[#0878D1] bg-[#0878D1] text-white shadow-md"
                                  : "border-[rgba(13,27,42,0.08)] bg-white hover:border-[rgba(13,27,42,0.2)] text-[#062B67]"
                              }`}
                              style={{
                                fontFamily:
                                  "var(--font-body)",
                              }}
                            >
                              <Clock size={13} />
                              {time}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-5 p-3 rounded-xl bg-[#EDF1F5] text-[#6B7A8D] text-[11px]">
                        Hinweis: Die angezeigten
                        Uhrzeiten dienen als
                        Terminvorschläge. Die endgültige
                        Verfügbarkeit wird von der Praxis
                        bestätigt.
                      </div>
                    </motion.div>
                  )}

                  {/* =================================================
                      STEP 6 - PERSONAL DATA
                  ================================================== */}

                  {step === 6 && (
                    <motion.div
                      key="step6"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <h3
                        className="text-[#062B67] mb-2"
                        style={{
                          fontFamily:
                            "var(--font-display)",
                          fontSize: "1.4rem",
                          fontWeight: 600,
                        }}
                      >
                        Wie können wir Sie erreichen?
                      </h3>

                      <p className="text-[#6B7A8D] text-xs mb-6">
                        Ihre Angaben werden für die
                        Bearbeitung der Terminanfrage
                        benötigt.
                      </p>

                      <form
                        className="space-y-4"
                        onSubmit={(e) =>
                          e.preventDefault()
                        }
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label
                              className="text-[#062B67] text-xs font-medium mb-1.5 block"
                              style={{
                                fontFamily:
                                  "var(--font-body)",
                              }}
                            >
                              Vorname *
                            </label>

                            <input
                              value={
                                booking.firstName
                              }
                              onChange={(e) =>
                                setBooking(
                                  (b) => ({
                                    ...b,
                                    firstName:
                                      e.target
                                        .value,
                                  })
                                )
                              }
                              placeholder="Max"
                              className={inputCls}
                              required
                            />
                          </div>

                          <div>
                            <label
                              className="text-[#062B67] text-xs font-medium mb-1.5 block"
                              style={{
                                fontFamily:
                                  "var(--font-body)",
                              }}
                            >
                              Nachname *
                            </label>

                            <input
                              value={
                                booking.lastName
                              }
                              onChange={(e) =>
                                setBooking(
                                  (b) => ({
                                    ...b,
                                    lastName:
                                      e.target
                                        .value,
                                  })
                                )
                              }
                              placeholder="Mustermann"
                              className={inputCls}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            className="text-[#062B67] text-xs font-medium mb-1.5 block"
                            style={{
                              fontFamily:
                                "var(--font-body)",
                            }}
                          >
                            E-Mail *
                          </label>

                          <input
                            type="email"
                            value={booking.email}
                            onChange={(e) =>
                              setBooking(
                                (b) => ({
                                  ...b,
                                  email:
                                    e.target.value,
                                })
                              )
                            }
                            placeholder="max@beispiel.de"
                            className={inputCls}
                            required
                          />
                        </div>

                        <div>
                          <label
                            className="text-[#062B67] text-xs font-medium mb-1.5 block"
                            style={{
                              fontFamily:
                                "var(--font-body)",
                            }}
                          >
                            Telefon *
                          </label>

                          <input
                            type="tel"
                            value={booking.phone}
                            onChange={(e) =>
                              setBooking(
                                (b) => ({
                                  ...b,
                                  phone:
                                    e.target.value,
                                })
                              )
                            }
                            placeholder="+49 ..."
                            className={inputCls}
                            required
                          />
                        </div>

                        <div>
                          <label
                            className="text-[#062B67] text-xs font-medium mb-1.5 block"
                            style={{
                              fontFamily:
                                "var(--font-body)",
                            }}
                          >
                            Nachricht (optional)
                          </label>

                          <textarea
                            value={booking.message}
                            onChange={(e) =>
                              setBooking(
                                (b) => ({
                                  ...b,
                                  message:
                                    e.target.value,
                                })
                              )
                            }
                            rows={3}
                            placeholder="Haben Sie besondere Wünsche oder Anliegen?"
                            className={
                              inputCls +
                              " resize-none"
                            }
                          />
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* =================================================
                      STEP 7 - CONFIRMATION
                  ================================================== */}

                  {step === 7 && (
                    <motion.div
                      key="step7"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <h3
                        className="text-[#062B67] mb-2"
                        style={{
                          fontFamily:
                            "var(--font-display)",
                          fontSize: "1.4rem",
                          fontWeight: 600,
                        }}
                      >
                        Ihre Terminanfrage
                      </h3>

                      <p className="text-[#6B7A8D] text-xs mb-6">
                        Bitte überprüfen Sie Ihre
                        Angaben vor dem Absenden.
                      </p>

                      {/* Location highlight */}

                      <div className="mb-4 p-4 rounded-2xl bg-[#0B4EA2] text-white">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                            <MapPin
                              size={18}
                              className="text-[#0878D1]"
                            />
                          </div>

                          <div>
                            <p className="text-white/60 text-[11px]">
                              Praxisstandort
                            </p>

                            <p className="font-semibold text-sm mt-0.5">
                              {selectedLocation?.name}
                            </p>

                            <p className="text-white/70 text-xs mt-1">
                              {
                                selectedLocation?.address
                              }
                              <br />
                              {
                                selectedLocation?.addressLine2
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Booking summary */}

                      <div className="bg-white rounded-2xl border border-[rgba(13,27,42,0.08)] divide-y divide-[rgba(13,27,42,0.06)]">
                        {[
                          {
                            label: "Standort",
                            value:
                              selectedLocation?.name ||
                              "",
                          },
                          {
                            label: "Behandlung",
                            value:
                              treatmentLabel,
                          },
                          {
                            label: "Arzt",
                            value: doctorName,
                          },
                          {
                            label: "Datum",
                            value:
                              selectedDateFormatted,
                          },
                          {
                            label: "Uhrzeit",
                            value:
                              booking.time +
                              " Uhr",
                          },
                          {
                            label: "Name",
                            value: `${booking.firstName} ${booking.lastName}`,
                          },
                          {
                            label: "Telefon",
                            value:
                              booking.phone,
                          },
                          {
                            label: "E-Mail",
                            value:
                              booking.email,
                          },
                        ].map((row) => (
                          <div
                            key={row.label}
                            className="flex justify-between gap-4 py-3 px-5"
                          >
                            <span
                              className="text-[#6B7A8D] text-sm flex-shrink-0"
                              style={{
                                fontFamily:
                                  "var(--font-body)",
                              }}
                            >
                              {row.label}
                            </span>

                            <span
                              className="text-[#062B67] font-medium text-sm text-right"
                              style={{
                                fontFamily:
                                  "var(--font-body)",
                              }}
                            >
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {booking.message && (
                        <div className="mt-3 bg-white rounded-2xl border border-[rgba(13,27,42,0.08)] p-5">
                          <p
                            className="text-[#6B7A8D] text-xs mb-1"
                            style={{
                              fontFamily:
                                "var(--font-body)",
                            }}
                          >
                            Nachricht
                          </p>

                          <p
                            className="text-[#062B67] text-sm"
                            style={{
                              fontFamily:
                                "var(--font-body)",
                            }}
                          >
                            {booking.message}
                          </p>
                        </div>
                      )}

                      {/* Contact information */}

                      <div className="mt-4 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#EDF1F5]">
                          <Clock
                            size={14}
                            className="text-[#0878D1]"
                          />

                          <span className="text-[#6B7A8D] text-[11px]">
                            Anfrage wird von der
                            Praxis bestätigt
                          </span>
                        </div>

                        {selectedLocation?.phone && (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#EDF1F5]">
                            <Phone
                              size={14}
                              className="text-[#0878D1]"
                            />

                            <span className="text-[#6B7A8D] text-[11px]">
                              {
                                selectedLocation.phone
                              }
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* =====================================================
                FOOTER NAVIGATION
            ====================================================== */}

            {!submitted && (
              <div className="flex items-center justify-between px-6 py-5 border-t border-[rgba(13,27,42,0.06)] bg-white flex-shrink-0">
                <button
                  onClick={goPrev}
                  disabled={step === 1}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    step === 1
                      ? "text-[#6B7A8D]/30 cursor-not-allowed"
                      : "text-[#062B67] hover:bg-[#EDF1F5]"
                  }`}
                  style={{
                    fontFamily:
                      "var(--font-body)",
                  }}
                >
                  <ChevronLeft size={16} />
                  Zurück
                </button>

                {step < 7 ? (
                  <button
                    onClick={goNext}
                    disabled={!canNext()}
                    className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      canNext()
                        ? "bg-[#0B4EA2] text-white hover:bg-[#0878D1] hover:shadow-lg hover:shadow-[#0878D1]/20"
                        : "bg-[rgba(13,27,42,0.08)] text-[#6B7A8D] cursor-not-allowed"
                    }`}
                    style={{
                      fontFamily:
                        "var(--font-body)",
                    }}
                  >
                    Weiter
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium bg-[#0878D1] text-white hover:bg-[#0B4EA2] hover:shadow-lg hover:shadow-[#0878D1]/30 transition-all"
                    style={{
                      fontFamily:
                        "var(--font-body)",
                    }}
                  >
                    Termin verbindlich anfragen
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
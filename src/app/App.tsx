import "../styles/fonts.css";
import "../styles/globals.css";
import "../styles/index.css";
import "../styles/tailwind.css";
import { useState, useEffect } from "react";
import { Header } from "./dental/Header";
import { HeroSection } from "./dental/HeroSection";
import { TrustSection } from "./dental/TrustSection";
import { WhyUsSection } from "./dental/WhyUsSection";
import { BeforeAfterSection } from "./dental/BeforeAfterSection";
import { ServicesSection } from "./dental/ServicesSection";
import { PracticeSection } from "./dental/PracticeSection";
import { DoctorsSection } from "./dental/DoctorsSection";
import { StaffSection } from "./dental/StaffSection";
import { LocationsSection } from "./dental/LocationsSection";
import { ReviewsSection } from "./dental/ReviewsSection";
import { BookingWizard } from "./dental/BookingWizard";
import { FaqSection } from "./dental/FaqSection";
import { FinalCTA } from "./dental/FinalCTA";
import { Footer } from "./dental/Footer";

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#FAFAF8", fontFamily: "var(--font-body)" }}
    >
      <Header onBooking={() => setBookingOpen(true)} />

      <main>
        <HeroSection onBooking={() => setBookingOpen(true)} />
        <TrustSection />
        <WhyUsSection />
        <BeforeAfterSection />
        <ServicesSection onBooking={() => setBookingOpen(true)}  />
        <PracticeSection />
        <DoctorsSection />
        <StaffSection />
        <LocationsSection onBooking={() => setBookingOpen(true)} />
        <ReviewsSection />
        <FaqSection />
        <FinalCTA onBooking={() => setBookingOpen(true)} />
      </main>

      <Footer />

      <BookingWizard open={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* Scroll-to-top */}
      <ScrollTopButton />
    </div>
  );
}

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-[#0B4EA2] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#0878D1] transition-all hover:scale-110"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none", transition: "opacity 0.3s" }}
      aria-label="Nach oben scrollen"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

import { CustomerReviewsCarousel } from "@/components/sections/home/CustomerReviewsCarousel";
import { GlobalNetworkMap } from "@/components/sections/home/GlobalNetworkMap";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { SurveyFaq } from "@/components/sections/home/SurveyFaq";
import { SurveyRdpPlans } from "@/components/sections/home/SurveyRdpPlans";
import { TrustBadgesStrip } from "@/components/sections/home/TrustBadgesStrip";
import { WhyTrustUs } from "@/components/sections/home/WhyTrustUs";
import { StickyConversionBar } from "@/components/ui/StickyConversionBar";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — clean ISP-First headline, US/UK/DE/FR country selector, live IP proof card */}
      <HeroSection />

      {/* 2. Trust strip — 0/100 · 7-Day Swap · <90s delivery · Secure Payment */}
      <TrustBadgesStrip />

      {/* 3. Survey RDP Plans — 3 clean tiers with in-card country selector dropdown */}
      <SurveyRdpPlans />

      {/* 4. Global Network Map — Dallas, Ashburn, Amsterdam & Dhaka Desk */}
      <GlobalNetworkMap />

      {/* 5. Why Trust Us — 4 pain-point trust cards + compact stats bar + Dhaka WhatsApp */}
      <WhyTrustUs />

      {/* 6. Customer Reviews Carousel — auto-scrolling verified proof across US, UK, DE, FR */}
      <CustomerReviewsCarousel />

      {/* 7. FAQ — 4 survey & residential RDP objection-handling questions */}
      <SurveyFaq />

      {/* 8. Sticky conversion bar — appears on scroll */}
      <StickyConversionBar />
    </>
  );
}

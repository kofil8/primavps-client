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
      {/* 1. Hero — headline, ISP proof card, CTAs, payment logos */}
      <HeroSection />

      {/* 2. Trust strip — 0/100 · 7-Day Swap · <90s · Secure Payment */}
      <TrustBadgesStrip />

      {/* 4. Survey RDP Plans — 3 clean tiers */}
      <SurveyRdpPlans />

      {/* 5. Global Network Map */}
      <GlobalNetworkMap />

      {/* 6. Why Trust Us — 4 trust points + stat strip + WhatsApp CTA */}
      <WhyTrustUs />

      {/* 5. Customer Review */}

      {/* 7. FAQ — 4 survey-focused questions */}
      <SurveyFaq />

      {/* 8. Sticky bar — appears on scroll */}
      <StickyConversionBar />
    </>
  );
}

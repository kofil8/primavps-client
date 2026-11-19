import { HeroSection }         from "@/components/sections/home/HeroSection";
import { TrustBadgesStrip }    from "@/components/sections/home/TrustBadgesStrip";
import { LiveDiagnosticsHook } from "@/components/sections/home/LiveDiagnosticsHook";
import { SurveyRdpPlans }      from "@/components/sections/home/SurveyRdpPlans";
import { WhyTrustUs }          from "@/components/sections/home/WhyTrustUs";
import { SurveyFaq }           from "@/components/sections/home/SurveyFaq";
import { StickyConversionBar } from "@/components/ui/StickyConversionBar";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — headline, ISP proof card, CTAs, payment logos */}
      <HeroSection />

      {/* 2. Trust strip — 0/100 · 7-Day Swap · <90s · Secure Payment */}
      <TrustBadgesStrip />

      {/* 3. Live Proof — IP fraud scanner, latency, reviews */}
      <LiveDiagnosticsHook />

      {/* 4. Survey RDP Plans — 3 clean tiers */}
      <SurveyRdpPlans />

      {/* 5. Why Trust Us — 4 trust points + stat strip + WhatsApp CTA */}
      <WhyTrustUs />

      {/* 6. FAQ — 4 survey-focused questions */}
      <SurveyFaq />

      {/* 7. Sticky bar — appears on scroll */}
      <StickyConversionBar />
    </>
  );
}

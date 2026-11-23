import { JsonLd } from "@/components/seo/JsonLd";
import { CustomerReviewsCarousel } from "@/components/sections/home/CustomerReviewsCarousel";
import { GlobalNetworkMap } from "@/components/sections/home/GlobalNetworkMap";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { SurveyFaq } from "@/components/sections/home/SurveyFaq";
import { SurveyRdpPlans } from "@/components/sections/home/SurveyRdpPlans";
import { WhyTrustUs } from "@/components/sections/home/WhyTrustUs";
import { CookieConsentNotice } from "@/components/ui/CookieConsentNotice";
import { HOME_FAQS } from "@/lib/data/faqs";
import { faqSchema, ispPlansSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQS)} />
      <JsonLd data={ispPlansSchema()} />
      {/* 1. Hero — clean ISP-First headline, US/UK/DE/FR country selector, live IP proof card */}
      <HeroSection />

      {/* 2. How it works */}
      <HowItWorks />

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

      {/* 8. Cookie consent notice — auto-hides after ~3s or on dismiss */}
      <CookieConsentNotice />
    </>
  );
}

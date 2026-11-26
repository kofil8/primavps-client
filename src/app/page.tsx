import { JsonLd } from "@/components/seo/JsonLd";
import { CustomerReviewsCarousel } from "@/components/sections/home/CustomerReviewsCarousel";
import { GlobalNetworkMap } from "@/components/sections/home/GlobalNetworkMap";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { IspFaq } from "@/components/sections/home/IspFaq";
import { IspPlansSection } from "@/components/sections/home/IspPlansSection";
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

      {/* 3. Residential ISP RDP Plans — 3 clean tiers with in-card country selector dropdown */}
      <IspPlansSection />

      {/* 4. Global Network Map — Dallas, Ashburn, Amsterdam & Dhaka Desk */}
      <GlobalNetworkMap />

      {/* 5. Why Trust Us — 4 pain-point trust cards + compact stats bar + Dhaka WhatsApp */}
      <WhyTrustUs />

      {/* 6. Customer Reviews Carousel — auto-scrolling verified proof across US, UK, DE, FR */}
      <CustomerReviewsCarousel />

      {/* 7. FAQ — 4 residential ISP & RDP objection-handling questions */}
      <IspFaq />

      {/* 8. Cookie consent notice — auto-hides after ~3s or on dismiss */}
      <CookieConsentNotice />
    </>
  );
}

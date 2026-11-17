import React from 'react';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { MetricBar } from '@/components/sections/home/MetricBar';
import { BuiltForPersonas } from '@/components/sections/home/BuiltForPersonas';
import { GlobalNetworkMap } from '@/components/sections/home/GlobalNetworkMap';
import { DualOfferings } from '@/components/sections/home/DualOfferings';
import { ComparisonMatrix } from '@/components/sections/home/ComparisonMatrix';
import { SocialProofTestimonials } from '@/components/sections/home/SocialProofTestimonials';
import { FounderNote } from '@/components/sections/home/FounderNote';
import { ProofAndFaq } from '@/components/sections/home/ProofAndFaq';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Home hero with product paths */}
      <HeroSection />

      {/* 2. Engineering Metric & SLA Bar */}
      <MetricBar />

      {/* 3. Purpose-Built Personas Strip (Surveyors, E-Commerce, Developers) */}
      <BuiltForPersonas />

      {/* 4. Global Network, Local Excellence (Interactive World Map with Radar Nodes) */}
      <GlobalNetworkMap />

      {/* 5. Core Infrastructure Offerings (Dedicated ISP Compute & Scalable Cloud) */}
      <DualOfferings />

      {/* 6. Why primevpsbd Comparison Matrix */}
      <ComparisonMatrix />

      {/* 7. Real Customer Success Stories & Outcomes */}
      <SocialProofTestimonials />

      {/* 8. Founder's Mission & Dhaka-Dallas Operations Desk */}
      <FounderNote />

      {/* 9. Verified IPQS Proof & Engineering FAQ */}
      <ProofAndFaq />
    </div>
  );
}

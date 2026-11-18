import { DhakaOperationsDesk } from "@/components/sections/home/DhakaOperationsDesk";
import { DualOfferings } from "@/components/sections/home/DualOfferings";
import { FounderNote } from "@/components/sections/home/FounderNote";
import { GlobalNetworkMap } from "@/components/sections/home/GlobalNetworkMap";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { LiveDiagnosticsHook } from "@/components/sections/home/LiveDiagnosticsHook";
import { MetricBar } from "@/components/sections/home/MetricBar";
import { ProofAndFaq } from "@/components/sections/home/ProofAndFaq";
import { TrustBadgesStrip } from "@/components/sections/home/TrustBadgesStrip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadgesStrip />
      <DualOfferings />
      <DhakaOperationsDesk />
      <LiveDiagnosticsHook />
      <MetricBar />
      <GlobalNetworkMap />
      <FounderNote />
      <ProofAndFaq />
    </>
  );
}

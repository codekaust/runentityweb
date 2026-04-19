import AnnouncementBanner from "@/components/sections/AnnouncementBanner";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import FeatureTabs from "@/components/sections/FeatureTabs";
import TrustedBy from "@/components/sections/TrustedBy";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Navigation */}
      <Navigation />

      {/* --- SECTION GROUP 1: Hero + Features + Trust --- */}
      <Hero />
      <FeatureTabs />
      <TrustedBy variant="top" />

      {/* --- SECTION GROUP 2: Close + Footer (Dark) --- */}
      <FinalCTA />
    </main>
  );
}

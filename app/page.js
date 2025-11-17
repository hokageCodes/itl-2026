import HeroSection from '@/components/sections/HeroSection';
import ConferenceSection from '@/components/sections/ConferenceSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import SpeakersSection from '@/components/sections/SpeakersSection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import FAQsSection from '@/components/sections/FAQsSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SponsorsSection />
      <ConferenceSection />
      <BenefitsSection />
      <SpeakersSection />
      <FAQsSection />
    </div>
  );
}

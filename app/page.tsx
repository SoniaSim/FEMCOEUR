import { WelcomeSection } from "@/components/content/home/WelcomeSection";
import { WhyFeminineSection } from "@/components/content/home/WhyFeminineSection";
import { WhatWeDoSection } from "@/components/content/home/WhatWeDoSection";
import { CallToActionSection } from "@/components/content/home/CallToActionSection";

export default function Home() {
  return (
    <>
      <WelcomeSection />
      <WhyFeminineSection />
      <WhatWeDoSection />
      <CallToActionSection />
    </>
  );
}

import { ApproachSection } from "@/components/approach-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";
import { WorkSection } from "@/components/work-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <WorkSection />
        <ApproachSection />
        <ContactSection />
      </main>
    </>
  );
}

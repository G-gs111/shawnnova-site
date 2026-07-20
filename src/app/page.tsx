import { ApproachSection } from "@/components/approach-section";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { Hero } from "@/components/hero";
import { MottoBand } from "@/components/motto-band";
import { SiteHeader } from "@/components/site-header";
import { ToolStrip } from "@/components/tool-strip";
import { WorkSection } from "@/components/work-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MottoBand />
        <ToolStrip />
        <WorkSection />
        <ExperienceSection />
        <ApproachSection />
        <ContactSection />
      </main>
    </>
  );
}

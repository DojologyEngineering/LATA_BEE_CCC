import { SiteHeader } from "@/components/layout/site-header";
import { About } from "@/components/sections/about";
import { Benefits } from "@/components/sections/benefits";
import { WhySection } from "@/components/sections/bento";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Decline } from "@/components/sections/decline";
import { Impact } from "@/components/sections/impact";
import { Process } from "@/components/sections/process";
import { Products } from "@/components/sections/products";
import { Team } from "@/components/sections/team";
import { Ticker } from "@/components/sections/ticker";

export default function Home() {
  return (
    <>
      <SiteHeader overlay />
      <main>
        <Hero />
        <Ticker />
        <About />
        <WhySection />
        <Process />
        <Products />
        <Benefits />
        <Decline />
        <Impact />
        <Team />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import WhyChoose from "@/components/home/WhyChoose";
import Projects from "@/components/home/Projects";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";
import Footer from "@/components/layout/Footer";


import WhatsAppButton from "@/components/ui/WhatsAppButton";
import BackToTop from "@/components/ui/BackToTop";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FadeIn from "@/components/ui/FadeIn";

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <Navbar />

      <Hero />
      


      <FadeIn delay={0.1}>
        <About />
      </FadeIn>

      <FadeIn delay={0.2}>
        <Services />
      </FadeIn>

      <FadeIn delay={0.3}>
        <WhyChoose />
      </FadeIn>

      <FadeIn delay={0.4}>
        <Projects />
      </FadeIn>

      <FadeIn delay={0.5}>
        <Process />
      </FadeIn>

      <FadeIn delay={0.6}>
        <Testimonials />
      </FadeIn>

      <FadeIn delay={0.7}>
        <Contact />
      </FadeIn>

      <Footer />

      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
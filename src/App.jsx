import { useState, lazy, Suspense } from "react";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Projects from "./components/Projects/Projects";
import Achievements from "./components/Achievements/Achievements";
import Certificates from "./components/Certificates/Certificates";
import Hobbies from "./components/Hobbies/Hobbies";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import CommandPalette from "./components/CommandPalette/CommandPalette";
import Preloader from "./components/Preloader/Preloader";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import Marquee from "./components/Marquee/Marquee";
import ScrollSection from "./components/ScrollSection/ScrollSection";
import StripeTransition from "./components/StripeTransition/StripeTransition";
import Code3D from "./components/Code3D/Code3D";
import { personalInfo } from "./constants";

const CVPreview = lazy(() => import("./components/CVPreview/CVPreview"));

export default function App() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <SmoothScroll>
        <ScrollProgress />
        <Navbar onCVOpen={() => setCvOpen(true)} />
        <Hero />
        <Marquee items={personalInfo.marqueeItems} />
        <StripeTransition />
        <ScrollSection preset="perspectiveRise"><About /></ScrollSection>
        <ScrollSection preset="zoomFade"><Skills /></ScrollSection>
        <ScrollSection preset="slideLeft"><Experience /></ScrollSection>
        <ScrollSection preset="slideRight"><Education /></ScrollSection>
        <ScrollSection preset="zoomFade"><Projects /></ScrollSection>
        <Code3D />
        <Marquee items={personalInfo.marqueeItems} />
        <StripeTransition />
        <ScrollSection preset="perspectiveRise"><Achievements /></ScrollSection>
        <ScrollSection preset="flipIn"><Certificates /></ScrollSection>
        <ScrollSection preset="curtainDrop"><Hobbies /></ScrollSection>
        <ScrollSection preset="perspectiveRise"><Contact /></ScrollSection>
        <Footer />
        {/* v8 ignore start */}
        <CommandPalette onOpenCV={() => setCvOpen(true)} />
        {cvOpen && (
          <Suspense fallback={null}>
            <CVPreview onClose={() => setCvOpen(false)} />
          </Suspense>
        )}
        {/* v8 ignore stop */}
      </SmoothScroll>
    </>
  );
}

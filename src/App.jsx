import { useState, lazy, Suspense } from "react";
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

// CVPreview pulls @react-pdf/renderer (~heavy) — only load when opened.
const CVPreview = lazy(() => import("./components/CVPreview/CVPreview"));

export default function App() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <Navbar onCVOpen={() => setCvOpen(true)} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Achievements />
      <Certificates />
      <Hobbies />
      <Contact />
      <Footer />
      <CommandPalette onOpenCV={() => setCvOpen(true)} />
      {cvOpen && (
        <Suspense fallback={null}>
          <CVPreview onClose={() => setCvOpen(false)} />
        </Suspense>
      )}
    </>
  );
}

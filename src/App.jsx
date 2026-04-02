import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Projects from "./components/Projects/Projects";
import Achievements from "./components/Achievements/Achievements";
import Hobbies from "./components/Hobbies/Hobbies";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import CVPreview from "./components/CVPreview/CVPreview";

export default function App() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <Navbar onCVOpen={() => setCvOpen(true)} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Achievements />
      <Hobbies />
      <Contact />
      <Footer />
      {cvOpen && <CVPreview onClose={() => setCvOpen(false)} />}
    </>
  );
}

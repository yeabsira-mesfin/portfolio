import './App.css';
import { useState } from 'react';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import AboutMe from './Components/AboutMe';
import Projects from './Components/Projects';
import Services from './Components/Services';
import Skills from './Components/Skills';
import Hobbies from './Components/Hobbies';
import Contact from './Components/Contact';
import ScrollProgressCircle from './Components/ScrollProgressCircle_TEMP'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ScrollProgressCircle />
      <Hero />
      <AboutMe />
      <Projects />
      <Services />
      <Skills />
      <Hobbies />
      <Contact />
    </div>
  );
}

export default App;

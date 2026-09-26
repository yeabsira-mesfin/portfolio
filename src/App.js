import './App.css';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import AboutMe from './Components/AboutMe';
import Projects from './Components/Projects';
import Skills from './Components/Skills';
import Updates from './Components/Updates';
import Contact from './Components/Contact';
import PortfolioBot from './Components/PortfolioBot';
import ScrollProgressCircle from './Components/ScrollProgressCircle';

function App() {
  return (
    <div className="portfolio-shell">
      <Navbar />
      <ScrollProgressCircle />
      <main>
        <Hero />
        <AboutMe />
        <Projects />
        <Skills />
        <Updates />
        <Contact />
      </main>
      <PortfolioBot />
    </div>
  );
}

export default App;

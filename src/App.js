import './App.css';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import AboutMe from './Components/AboutMe';
import Projects from './Components/Projects';
import Services from './Components/Services';
import Skills from './Components/Skills';
import Hobbies from './Components/Hobbies';
import Updates from './Components/Updates';
import Contact from './Components/Contact';
import PortfolioBot from './Components/PortfolioBot';
import ScrollProgressCircle from './Components/ScrollProgressCircle';

function App() {
  return (
    <div>
      <Navbar />
      <ScrollProgressCircle />
      <Hero />
      <AboutMe />
      <Projects />
      <Services />
      <Skills />
      <Hobbies />
      <Updates />
      <Contact />
      <PortfolioBot />
    </div>
  );
}

export default App;

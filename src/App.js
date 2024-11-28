import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import AboutMe from './Components/AboutMe';
import Projects from './Components/Projects';


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <Navbar/>
      <Hero/>
      <AboutMe/>
      <Projects/>
     
    </div>
  );
}

export default App;

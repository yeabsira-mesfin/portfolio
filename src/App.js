import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import AboutMe from './Components/AboutMe';


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <Navbar/>
      <Hero/>
      <AboutMe/>
     
    </div>
  );
}

export default App;

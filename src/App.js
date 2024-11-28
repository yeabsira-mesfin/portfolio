import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <Navbar/>
      <Hero/>
     
    </div>
  );
}

export default App;

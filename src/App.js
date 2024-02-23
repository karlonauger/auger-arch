import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './components/canvas.js';

import React from "react";

import DotCanvas from "./components/dotCanvas";
import Navbar from "./components/navbar";
import Title from "./components/title";
import About from "./components/about.js";
import PartnerToProfit from "./components/partnerToProfit";
import Tetris from "./components/tetris";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <DotCanvas />
      <Navbar />
      <Title />
      <About />
      <PartnerToProfit />
      <Tetris />
      <Footer />
    </div>
  );
}

export default App;

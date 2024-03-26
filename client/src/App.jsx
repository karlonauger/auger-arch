import 'bootstrap/dist/css/bootstrap.css';
import './components/canvas';

import React from 'react';

import DotCanvas from './components/dotCanvas';
import Navbar from './components/navbar';
import Title from './components/title';
import About from './components/about';
import AugerConstruction from './components/augerConstruction';
import PartnerToProfit from './components/partnerToProfit';
import Tetris from './components/tetris';
import Architecture from './components/architecture';
import Footer from './components/footer';

function App() {
  return (
    <div>
      <DotCanvas />
      <Navbar />
      <Title />
      <About />
      <AugerConstruction />
      <PartnerToProfit />
      <Tetris />
      <Architecture />
      <Footer />
    </div>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './components/canvas';

import React from 'react';

import DotCanvas from './components/dotCanvas';
import Navbar from './components/navbar';
import Title from './components/title';
import About from './components/about';
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
      <PartnerToProfit />
      <Tetris />
      <Architecture />
      <Footer />
    </div>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './components/canvas.js';

import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import Title from "./components/title";
import PartnerToProfit from "./components/partnerToProfit";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <div className="canvas">
        <canvas className="connecting-dots" style={ { display: 'block' } } />
      </div>
      <Navbar />
      <Title />
      <PartnerToProfit />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

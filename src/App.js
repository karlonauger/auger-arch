import './App.css';
import './components/canvas.js';

import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import Title from "./components/title";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import PartnerToProfit from "./components/partnerToProfit";

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
    </div>
  );
}

export default App;

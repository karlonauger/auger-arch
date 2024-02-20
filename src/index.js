import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import canvas from './components/canvas.js';

window.onload = function () {
  canvas();
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> This is running Tetris twice
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);

import React from 'react';

export default function Navbar() {
  return (
    <header className="navbar navbar-expand-sm fixed-top bg-dark">
      <div className="container">
        <a className="navbar-brand pt-0 pb-0" href="/" style={{ width: '150px' }}>
          <img className="img-fluid" src="/logo.png" alt="Auger Architecture Logo" />
        </a>
        <div className="collapse navbar-collapse fw-normal">
          <ul className="nav me-auto">
            <li>
              <a className="nav-link" href="#about">About</a>
            </li>
            <li>
              <a className="nav-link" href="#profit">Partner To Profit</a>
            </li>
            <li>
              <a className="nav-link" href="#tetris">Tetris</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

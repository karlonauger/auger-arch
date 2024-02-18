import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm fixed-top">
        <div className="container">
          <NavLink className="navbar-brand" to="#" style={{ width: '150px' }}>
            <img className="img-fluid" src="/logo.png" alt="Auger Architecture Logo"></img>
          </NavLink>
          <button 
            className="navbar-toggler"
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">              
              <li className="nav-item">
                <NavLink className="nav-link" to="#skills">Skills</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#profit">Partner To Profit</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#tetris">Tetris</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#GW">GW</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

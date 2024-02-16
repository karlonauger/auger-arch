import React from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 // We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-sm sticky-top" data-bs-theme="dark">
        <div class="container">
          <NavLink className="navbar-brand" to="#" style={{ width: '150px' }}>
            <img className="img-fluid" src="/logo.png" alt="Auger Architecture Logo"></img>
          </NavLink>
          <button 
            class="navbar-toggler"
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">              
              <li class="nav-item">
                <NavLink className="nav-link" to="#skills">Skills</NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="#projects">Projects</NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="#P2P">P2P</NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="#tetris">Tetris</NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="#GW">GW</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

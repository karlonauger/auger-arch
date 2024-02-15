import React from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 // We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 // Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-md sticky-top border-bottom" data-bs-theme="dark">
        <div class="container">
          <NavLink className="navbar-brand" to="/">
            <img
              style={{"width" : 25 + '%'}}
              src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
              alt="MongoDB Logo"
            ></img>
          </NavLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="#offcanvas" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="#offcanvas" aria-labelledby="#offcanvasLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="#offcanvasLabel">Aperture</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav flex-grow-1 justify-content-between">
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
        </div>
      </nav>
    </div>
  );
}

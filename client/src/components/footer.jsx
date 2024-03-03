import React from 'react';
import { NavLink } from 'react-router-dom';

import Socials from './socials';

export default function Footer() {
  return (
    <div className="position-relative container">
      <footer className="d-flex justify-content-between align-items-center py-3 my-4 border-top">
        <div className="d-flex gap-2 align-items-center">
          <NavLink className="navbar-brand" to="#" style={{ width: '30px' }}>
            <img className="img-fluid" src="/logo_emblem.png" alt="Auger Architecture Logo" />
          </NavLink>
          <span className="ml-3 mr-2">© 2024 Auger Architecture</span>
        </div>
        <div className="d-flex align-items-center">
          <Socials size={"24"} />
        </div>
      </footer>
    </div>
  );
}

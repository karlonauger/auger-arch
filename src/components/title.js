import React from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 // We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

export default function Title() {
  return (
    <div
      className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center"
      style={{ height: '100vh', display: 'flex', alignItems: 'center' }}
    >
      <div className="col-md-8 p-lg-5 mx-auto my-5">
        <h1 className="display-3 fw-bold">Hello, I'm Karlon</h1>
        <h2 className="fw-normal text-muted mb-3">I'm a full stack web developer</h2>
        <div className="d-flex gap-3 justify-content-center lead fw-normal">
          <NavLink className="nav-link" to="#learn_more">Learn more</NavLink>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function Title() {
  return (
    <div
      className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center"
      style={{ height: '100vh', display: 'flex', alignItems: 'center' }}
    >
      <div className="col-md-8 p-lg-5 mx-auto my-5">
        <h1 className="display-3 fw-bold">Hello, I&apos;m Karlon</h1>
        <h2 className="fw-normal text-muted">I&apos;m a full stack web developer</h2>
        <div className="nav d-flex justify-content-center lead fw-normal">
          <a className="nav-link" href="#about">Learn more</a>
        </div>
      </div>
    </div>
  );
}

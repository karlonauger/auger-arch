import React from 'react';

export default function AugerConstruction() {
  return (
    <div id="profit" className="jumbotron">
      <div className="position-relative container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <div className="row">
            <div className="col-md-6 mb-3">
              <img
                src="augerConstruction.png"
                alt="Auger Construction Screenshot"
                className="img-fluid rounded-3"
              />
            </div>
            <div className="col-md-6">
              <h2 className="text-body-emphasis">Auger Construction</h2>
              <p className="mx-auto fs-4 text-muted">
                Residential Remodeling
              </p>
              <hr className="my-3" />
              <p className="mx-auto text-muted">
                Designed and implemented a company website for a residential contractor in Hudson,
                MA. Featuring project image carousel, thumbnails, and project detail pages, all
                manageable via a Strapi CMS admin portal. The site, built with React, Bootstrap, and
                PostgreSQL, emphasizes ease of content management and responsive design.
              </p>
              <div className="d-inline-flex">
                <a
                  className="btn btn-primary btn-lg"
                  href="https://www.auger-construction.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

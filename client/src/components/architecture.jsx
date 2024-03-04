import React from 'react';

export default function Architecture() {
  return (
    <div id="architecture" className="jumbotron">
      <div className="position-relative container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h1 className="text-body-emphasis">Architecture</h1>
              <hr className="my-3" />
              <p className="mx-auto fs-5 text-muted">
                This site was built on the MERN (MongoDB, Express.js, React, Node.js) stack,
                containerized by Docker, and deployed on a Kubernetes Cluster in AWS Elastic
                Kubernetes Service. All infrastructure is defined as code in Terraform.
              </p>
              <a
                className="btn btn-primary btn-lg"
                href="https://github.com/karlonauger/auger-arch/tree/master/client/src/tetris"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
              >
                Source Code
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor" 
                  className="bi bi-github ms-2 mb-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>
            </div>
            <div className="col-md-6">
              <img
                src="augerArchitectureDiagram.png"
                alt="Auger Architecture Diagram"
                className="img-fluid rounded-3 border border-5 border-primary-subtle"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

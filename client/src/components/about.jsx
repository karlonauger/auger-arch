import React from 'react';

import Socials from './socials';

export default function About() {
  return (
    <div id="about" className="jumbotron">
      <div className="position-relative container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <div className="row">
            <div className="col-md-6">
              <img
                src="headshot.jpeg"
                alt="Headshot"
                className="img-fluid rounded-5"
                style={{ maxHeight: '150px' }}
              />
              <hr className="my-3" />
              <p className="mx-auto fs-5 text-muted">
                Detail-oriented Developer with a background in architecting and implementing
                innovative solutions. Delivering high-quality software, automating complex
                processes, and contributing to dynamic engineering team growth. My philosophy is to
                identify prominent design patterns such as pipelines, frameworks, and dev tools to
                drive efficiency and product quality.
              </p>
              <div className="d-inline-flex mb-3">
                <a
                  className="btn btn-primary btn-lg"
                  href="/KarlonAugerResume.pdf"
                  role="button"
                  target="_blank"
                >
                  Resume
                </a>
                <Socials size={"32"} />
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="awsSolutionArchCert.png"
                alt="AWS Solution Architect Associate Cert"
                className="img-fluid"
                style={{ maxHeight: '210px' }}
              />
              <img
                src="jsNodeReact.png"
                alt="JS Node React"
                className="img-fluid"
                style={{ maxHeight: '200px' }}
              />
              <img
                src="ruby.webp"
                alt="Ruby"
                className="img-fluid mt-5"
                style={{ maxHeight: '110px' }}
              />
              <img
                src="java.png"
                alt="Java"
                className="img-fluid"
                style={{ maxHeight: '110px' }}
              />
              <img
                src="python.png"
                alt="Python"
                className="img-fluid"
                style={{ maxHeight: '100px', marginRight: '0px' }}
              />
              <img
                src="goLang.png"
                alt="goLang"
                className="img-fluid"
                style={{ maxHeight: '130px' }}
              />
              <div
                className=""
                style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  height: '150px',
                  width: '120px',
                }}
              >
                <img
                  src="docker.png"
                  alt="Docker"
                  className="img-fluid"
                  style={{ maxHeight: '80px' }}
                />
                <img
                  src="mySQL.png"
                  alt="mySQL"
                  className="img-fluid"
                  style={{ maxHeight: '50px' }}
                />
                <img
                  src="mongoDB.png"
                  alt="mongoDB"
                  className="img-fluid"
                  style={{ maxHeight: '70px' }}
                />
              </div>
              <img
                src="CICD.webp"
                alt="CICD"
                className="img-fluid"
                style={{ maxHeight: '130px' }}
              />
              <img
                src="terraform.png"
                alt="Terraform"
                className="img-fluid"
                style={{ maxHeight: '110px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

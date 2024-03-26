import React from 'react';

export default function PartnerToProfit() {
  return (
    <div id="profit" className="jumbotron">
      <div className="position-relative container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h2 className="text-body-emphasis">Partner To Profit</h2>
              <p className="mx-auto fs-5 text-muted">
                Calculated planning and analysis for Business Partnerships
              </p>
              <hr className="my-3" />
              <p className="mx-auto text-muted">
                Developed SaaS application designed to simulate financial outcomes of business
                partnerships. The accompaning promotianal site generated over 75 leads and served
                more than 4,000 users in its inaugural year.
              </p>
              <div className="d-inline-flex gap-2">
                <a
                  className="btn btn-primary btn-lg"
                  href="https://www.partnertoprofit.biz/home.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >
                  Visit Website
                </a>
                <a
                  className="btn btn-secondary btn-lg"
                  href="https://app.partnertoprofit.biz/home.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >
                  Visit App
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="partner_to_profit_ss.png"
                alt="Partner To Profit Screenshot"
                className="img-fluid rounded-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

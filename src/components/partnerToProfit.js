import React from 'react';

const PartnerToProfit = () => {
  return (
    <div className="jumbotron">
      <div className="position-relative container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <div className="row">
            <div className="col-md-6">
              <img
                src="partner_to_profit_ss.png"
                alt="Partner To Profit Screenshot"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h1 className="text-body-emphasis">Partner To Profit</h1>
              <p className="mx-auto fs-5 text-muted">
                Fact-based planning, analysis and decision-making for Alliance-Partnerships
              </p>
              <hr className="my-4" />
              <p className="mx-auto text-muted">
                PHP-based SAAS application to model financial outcomes of business partnerships
              </p>
              <div class="d-inline-flex gap-2 mb-5">
                <a
                  className="btn btn-primary btn-lg mr-5"
                  href="https://www.partnertoprofit.biz"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >Visit Website</a>
                <a
                  className="btn btn-secondary btn-lg"
                  href="https://app.partnertoprofit.biz/home.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >Visit App</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerToProfit;

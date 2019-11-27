import React, { Fragment } from "react";

const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          <i class="fab fa-buysellads"></i>
          <i class="fas fa-info-circle"></i>
          <i class="fas fa-chart-bar"></i> Stock Expert
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Features
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;

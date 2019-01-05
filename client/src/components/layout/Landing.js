import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row landing__wrapper">
          <div className="landing">
            <h1 className="display-1 my-4">Employee Connector</h1>
            <h2 className="font-weight-light my-4">
              Create a portfolio and let your peers know about you!!
            </h2>
            <Link to="register">
              <button className="btn btn-info m-4 px-4 py-2 rounded shadow">Sign Up</button>
            </Link>
            <Link to="login">
              <button className="btn btn-light m-4 px-4 py-2 rounded shadow">Log In</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;

import React, { Component } from "react";
import { Link } from "react-router-dom";
class Header extends Component {
  render() {
    return (
      <header className="bg-dark p-3">
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex mr-auto">
              <Link className="text-white font-weight-bold mr-4 " to="/">
                Employee Connector
              </Link>
              <Link className="text-white" to="/profiles">
                Employees
              </Link>
            </div>
            <div className="d-flex ml-auto">
              <Link className="text-white mr-4" to="/register">
                Sign Up
              </Link>
              <Link className="text-white" to="/login">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;

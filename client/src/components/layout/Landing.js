import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestLinks = (
      <div className="landing ">
        <h1 className="display-1 my-4">Employee Connector</h1>
        <h2 className="font-weight-light my-4">
          Create a portfolio and let your peers know about you!!
        </h2>
        <Link to="register">
          <button className="btn btn-info m-4 px-4 py-2 rounded shadow">
            Sign Up
          </button>
        </Link>
        <Link to="login">
          <button className="btn btn-light m-4 px-4 py-2 rounded shadow">
            Log In
          </button>
        </Link>
      </div>
    );

    const authLinks = (
      <div className="landing ">
        <h1 className="my-4">Welcome {user.name}</h1>
        <h2 className="font-weight-light my-4">
          Create /Edit your portfolio and let your peers know about you!!
        </h2>
        <Link to="dashboard">
          <button className="btn btn-info m-4 px-4 py-2 rounded shadow">
            Dashboard
          </button>
        </Link>
      </div>
    );

    return (
      <div className="container-fluid height-fixer">
        <div className="row landing__wrapper">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

Landing.PropTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Landing);

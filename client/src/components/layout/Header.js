import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Header extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLink = (
      <div className="d-flex ml-auto">
        <Link className="text-white mr-4" to="/register">
          Sign Up
        </Link>
        <Link className="text-white" to="/login">
          Log In
        </Link>
      </div>
    );

    const authLink = (
      <div className="d-flex ml-auto">
        <Link className="text-white mr-4" to="/dashboard">
          Dashboard
        </Link>
        <Link className="text-white" to="" onClick={this.onLogout.bind(this)}>
          Log Out
        </Link>
      </div>
    );
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
            {isAuthenticated ? authLink : guestLink}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

Header.PropTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Header);

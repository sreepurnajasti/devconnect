import React, { Component } from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    // console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-3 text-center">Sign Up</h1>
            <h2 className="font-weight-light text-center mb-4">
              Create / Edit Your Profile
            </h2>
          </div>
          <div className="col-md-8 m-auto">
            <form className="p-4" onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="name">Name:</label>
                <input
                  type="text"
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": errors.name
                  })}
                  id="name"
                  placeholder="Enter name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">*{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label for="email">Email:</label>
                <input
                  type="email"
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": errors.email
                  })}
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">*{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label for="password">Password:</label>
                <input
                  type="password"
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": errors.password
                  })}
                  id="password"
                  placeholder="Enter password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">*{errors.password}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-info btn-block btn-lg shadow"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.PropTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));

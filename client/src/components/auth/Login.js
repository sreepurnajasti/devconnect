import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //Do not allow user to come to register when they are already loggedin
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  //Set the errors to component state and on successful login send to dashboard
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);
    this.props.loginUser(user);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-3 text-center">Log In</h1>
            <h2 className="font-weight-light text-center mb-4">
              Create / Edit Your Profile
            </h2>
          </div>
          <div className="col-md-8 m-auto">
            <form className="p-4" onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
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
                <label htmlFor="password">Password:</label>
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

Login.PropTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);

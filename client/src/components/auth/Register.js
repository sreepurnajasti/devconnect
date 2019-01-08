import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";

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
    axios
      .post("/api/users/register", newUser, {
        proxy: {
          host: "192.168.1.1",
          port: 3128
        }
      })
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
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

export default Register;

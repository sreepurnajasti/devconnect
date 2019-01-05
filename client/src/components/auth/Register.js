import React, { Component } from "react";

class Register extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-3 text-center">Sign In</h1>
            <h2 className="font-weight-light text-center mb-4">
              Create / Edit Your Profile
            </h2>
          </div>
          <div className="col-md-8 m-auto">
            <form className="p-4">
              <div className="form-group">
                <label for="name">Name:</label>
                <input
                  type="text"
                  className="form-control form-control-lg "
                  id="name"
                  placeholder="Enter name"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label for="email">Email:</label>
                <input
                  type="email"
                  className="form-control form-control-lg "
                  id="email"
                  placeholder="Enter email"
                  name="email"
                />
              </div>
              <div className="form-group">
                <label for="password">Password:</label>
                <input
                  type="password"
                  className="form-control form-control-lg "
                  id="password"
                  placeholder="Enter password"
                  name="password"
                />
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

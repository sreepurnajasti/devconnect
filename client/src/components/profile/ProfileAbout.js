import React, { Component } from "react";
import isEmpty from "../../validation/isEmpty";

class ProfileAbout extends Component {
  render() {
    const profile = this.props.profile;

    const skills = profile.skills.map((skill, index) => (
      <div key={index} className=" p-3 d-inline">
        <i className="fa fa-check mr-2" />
        {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card bg-light text-dark mb-2">
            <div className="card-body">
              <h3 className="text-center text-info"> Summary </h3>
              {isEmpty(profile.personal && profile.personal.bio) ? (
                <span>There is no bio to display</span>
              ) : (
                <span> {profile.personal.bio} </span>
              )}
              <hr />
              <h3 className="text-center text-info"> Skill Set </h3>
              <div className="row">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  <div className="p-3">{skills}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;

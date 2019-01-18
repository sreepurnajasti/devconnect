import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-4">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-12">
            <h3>{profile.user.name}</h3>
            <p>Employee number: {profile.company.empNo}</p>
            <p>Department: {profile.company.department}</p>
            <p>Position: {profile.company.status}</p>
            <p>
              {!isEmpty(profile.company.shift)
                ? `Shift:${profile.company.shift}`
                : ""}
            </p>
            <Link
              to={`/employees/${profile.company.handle}`}
              className="btn btn-info shadow"
            >
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check-pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileItem;

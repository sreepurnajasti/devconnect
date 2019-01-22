import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProfileByHandle } from "../../actions/profileActions";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import Spinner from "../common/Spinner";
import Moment from "react-moment";
import isEmpty from "../../validation/isEmpty";
import sad from "../../img/insideoutsad.png";
class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (loading) {
      profileContent = (
        <div className="col-md-8 m-auto">
          <Spinner />
        </div>
      );
    } else {
      if (profile === null) {
        profileContent = (
          <div style={{ width: "100%", height: "200px" }}>
            <div>
              <img
                className="float-center"
                src={sad}
                alt="no profiles ..."
                style={{ height: "150px", margin: "auto", display: "block" }}
              />
            </div>
            <div className="text-center">
              <h4> No profile to display!!!</h4>
            </div>
          </div>
        );
      } else {
        profileContent = (
          <div className="col-md-8 m-auto">
            <div className="row">
              <div className="col-md-6">
                <Link to="/employees" className="btn btn-light my-3 float-left">
                  Back to Profiles
                </Link>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-outline-danger float-right my-3"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  <i className="fa fa-info" />
                </button>
                <div className="modal fade" id="myModal">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Emergency Info</h4>
                      </div>

                      <div className="modal-body">
                        <p>
                          {isEmpty(
                            profile.personal && profile.personal.gender
                          ) ? null : (
                            <span>
                              <strong>Gender : </strong>
                              {profile.personal.gender}
                            </span>
                          )}
                        </p>
                        <p>
                          {isEmpty(
                            profile.personal && profile.personal.dob
                          ) ? null : (
                            <span>
                              <strong>Date of Birth : </strong>
                              <Moment format="YYYY/MM/DD">
                                {profile.personal.dob}
                              </Moment>
                            </span>
                          )}
                        </p>
                        <p>
                          <strong>Emergency Number : </strong>
                          {profile.personal.emergencyNo}
                        </p>
                        <p>
                          <strong>Blood Group : </strong>
                          {profile.personal.bloodGroup}
                        </p>
                        <p>
                          <strong>Address : </strong>
                          {profile.personal.address}
                        </p>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProfileHeader profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileCreds
              education={profile.education}
              experience={profile.experience}
            />
          </div>
        );
      }
    }

    return (
      <div className="container-fluid">
        <div className="row">{profileContent}</div>
      </div>
    );
  }
}

Profile.PropTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = {
  getProfileByHandle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

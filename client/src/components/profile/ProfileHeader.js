import React, { Component } from "react";
import isEmpty from "../../validation/isEmpty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card bg-info text-white mb-2">
            <div className="card-body text-center">
              <h1 className="display-4 ">{profile.user.name}</h1>
              <p className="lead font-weight-light">
                {profile.company.empNo} - {profile.company.department} -{" "}
                {profile.company.status}
              </p>
              <p>
                <i className="fa fa-envelope mr-2" />
                {profile.user.email}
              </p>
              <p>
                <i className="fa fa-phone mr-2" />
                {profile.personal.phone}
              </p>
              <p>
                {isEmpty(
                  profile.personal && profile.personal.website
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.personal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fa fa-globe fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    rel="noopener noreferrer"
                  >
                    <i class="fa fa-facebook-square fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    rel="noopener noreferrer"
                  >
                    <i class="fa fa-linkedin fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    rel="noopener noreferrer"
                  >
                    <i class="fa fa-instagram fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.medium) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.medium}
                    rel="noopener noreferrer"
                  >
                    <i class="fa fa-medium fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.quora) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.quora}
                    rel="noopener noreferrer"
                  >
                    <i class="fa fa-quora fa-2x" />
                  </a>
                )}
                {isEmpty(
                  profile.social && profile.social.stackoverflow
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.stackoverflow}
                    rel="noopener noreferrer"
                  >
                    <i class="fa fa-stack-overflow fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    rel="noopener noreferrer"
                  >
                    <i class="fa fa-twitter-square fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;

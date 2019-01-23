import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getCurrentProfile, deleteProfile } from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDelete(e) {
    this.props.deleteProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome
              <Link to={`/employees/${profile.company.handle}`}>
                {user.name}
              </Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <button
              type="button"
              className="btn btn-danger shadow mb-4"
              onClick={this.onDelete.bind(this)}
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        //logged in user has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome{ user.name}</p>
            <p>You have not yet created a profile, Please add some info</p>
            <Link to="/create-profile" className="btn btn-info shadow mb-4">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="container-fluid height-fixer">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-3 text-center">Dashboard</h1>
            <div className="col-md-8 m-auto">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.PropTypes = {
  deleteProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = {
  getCurrentProfile,
  deleteProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

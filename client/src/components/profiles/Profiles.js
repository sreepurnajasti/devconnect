import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import sad from "../../img/insideoutsad.png";
import ProfileItem from "./ProfileItem";

export class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles == null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length === 0) {
        profileItems = (
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
              <h4> No profiles to display!!!</h4>
            </div>
          </div>
        );
      } else {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      }
    }

    return (
      <div className="container-fluid height-fixer">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-3 text-center">Employee Profiles</h1>
            <h2 className="font-weight-light text-center mb-4">
              Browse and connect with your peers
            </h2>
          </div>
          <div className="col-md-8 m-auto mb-4 ">
            <form className="form-inline float-right mb-4" action="/">
              <input
                type="text"
                className="form-control"
                placeholder="search by skills"
                id="usr"
                name="skillsearch"
              />
              <button type="submit" className="btn btn-info">
                <i class="fa fa-search" />
              </button>
            </form>
          </div>
          <div className="col-md-8 m-auto">{profileItems}</div>
        </div>
      </div>
    );
  }
}
Profiles.PropTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = {
  getProfiles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);

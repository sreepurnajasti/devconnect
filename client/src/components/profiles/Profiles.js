import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles, getProfilesBySkills } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import sad from "../../img/insideoutsad.png";
import ProfileItem from "./ProfileItem";
import classnames from "classnames";

export class Profiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
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
  componentDidMount() {
    this.props.getProfiles();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    let errors = this.state.errors;
    let name = e.target.name;
    if (errors[name]) {
      delete errors[name];
      this.setState({ errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.state.search.trim() !== "") {
      this.props.getProfilesBySkills(this.state.search);
    }
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles == null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length === 0) {
        profileItems = (
          <div className="height-fixer">
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
    const { errors } = this.state;
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
            <form
              className="form-inline float-right mb-4"
              onSubmit={this.onSubmit}
            >
              <input
                type="text"
                className={classnames("form-control form-control ", {
                  "is-invalid": errors.skills
                })}
                placeholder="search by skills"
                id="search"
                name="search"
                value={this.state.search}
                onChange={this.onChange}
              />
              {errors.skills && (
                <div className="invalid-feedback">*{errors.skills}</div>
              )}
              <button type="submit" className="btn btn-info">
                <i className="fa fa-search" />
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
  getProfilesBySkills: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = {
  getProfiles,
  getProfilesBySkills
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);

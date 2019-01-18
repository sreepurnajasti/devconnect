import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import { withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/isEmpty";
import { Link } from "react-router-dom";

export class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      displaySocialInputs: false,
      empNo: "",
      department: "",
      status: "",
      shift: "",
      handle: "",
      gender: "",
      dob: "",
      phone: "",
      address: "",
      emergencyNo: "",
      bloodGroup: "",
      bio: "",
      website: "",
      githubusername: "",
      skills: "",
      youtube: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      stackoverflow: "",
      medium: "",
      quora: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  //Set the errors to component state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile) {
      console.log(JSON.stringify(nextProps.profile));
      //create object
      let profile = nextProps.profile.profile;
      let skillsCsv = profile.skills.join(",");
      profile.company = !isEmpty(profile.company) ? profile.company : {};
      profile.personal = !isEmpty(profile.personal) ? profile.personal : {};
      profile.social = !isEmpty(profile.social) ? profile.social : {};

      profile.empNo = !isEmpty(profile.company.empNo)
        ? profile.company.empNo.toString()
        : "";
      profile.department = !isEmpty(profile.company.department)
        ? profile.company.department
        : "";
      profile.status = !isEmpty(profile.company.status)
        ? profile.company.status
        : "";
      profile.shift = !isEmpty(profile.company.shift)
        ? profile.company.shift
        : "";
      profile.handle = !isEmpty(profile.company.handle)
        ? profile.company.handle
        : "";

      profile.gender = !isEmpty(profile.personal.gender)
        ? profile.personal.gender
        : "";
      profile.dob = !isEmpty(profile.personal.dob) ? profile.personal.dob : "";
      profile.phone = !isEmpty(profile.personal.phone)
        ? profile.personal.phone.toString()
        : "";
      profile.address = !isEmpty(profile.personal.address)
        ? profile.personal.address
        : "";
      profile.emergencyNo = !isEmpty(profile.personal.emergencyNo)
        ? profile.personal.emergencyNo.toString()
        : "";
      profile.bloodGroup = !isEmpty(profile.personal.bloodGroup)
        ? profile.personal.bloodGroup
        : "";
      profile.bio = !isEmpty(profile.personal.bio) ? profile.personal.bio : "";
      profile.website = !isEmpty(profile.personal.website)
        ? profile.personal.website
        : "";
      profile.githubusername = !isEmpty(profile.personal.githubusername)
        ? profile.personal.githubusername
        : "";

      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.stackoverflow = !isEmpty(profile.social.stackoverflow)
        ? profile.social.stackoverflow
        : "";
      profile.medium = !isEmpty(profile.social.medium)
        ? profile.social.medium
        : "";
      profile.quora = !isEmpty(profile.social.quora)
        ? profile.social.quora
        : "";

      //set component state
      this.setState({
        empNo: profile.empNo,
        department: profile.department,
        status: profile.status,
        shift: profile.shift,
        handle: profile.handle,
        gender: profile.gender,
        dob: profile.dob,
        phone: profile.phone,
        address: profile.address,
        emergencyNo: profile.emergencyNo,
        bloodGroup: profile.bloodGroup,
        bio: profile.bio,
        website: profile.website,
        githubusername: profile.githubusername,
        skills: skillsCsv,
        youtube: profile.youtube,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        instagram: profile.instagram,
        stackoverflow: profile.stackoverflow,
        medium: profile.medium,
        quora: profile.quora
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newProfile = {
      empNo: this.state.empNo,
      department: this.state.department,
      status: this.state.status,
      shift: this.state.shift,
      handle: this.state.handle,
      gender: this.state.gender,
      dob: this.state.dob,
      phone: this.state.phone,
      address: this.state.address,
      emergencyNo: this.state.emergencyNo,
      bloodGroup: this.state.bloodGroup,
      bio: this.state.bio,
      website: this.state.website,
      githubusername: this.state.githubusername,
      skills: this.state.skills,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      stackoverflow: this.state.stackoverflow,
      medium: this.state.medium,
      quora: this.state.quora
    };
    this.props.createProfile(newProfile, this.props.history);
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    //enable the socialInputs block
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fa fa-twitter"
            error={errors.twitter}
            value={this.state.twitter}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fa fa-facebook-f"
            error={errors.facebook}
            value={this.state.facebook}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fa fa-linkedin"
            error={errors.linkedin}
            value={this.state.linkedin}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Youtube Channel URL"
            name="youtube"
            icon="fa fa-youtube"
            error={errors.youtube}
            value={this.state.youtube}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Youtube Channel URL"
            name="instagram"
            icon="fa fa-instagram"
            error={errors.instagram}
            value={this.state.instagram}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Stackoverflow Profile URL"
            name="stackoverflow"
            icon="fa fa-stack-overflow"
            error={errors.stackoverflow}
            value={this.state.stackoverflow}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Quora Page URL"
            name="quora"
            icon="fa fa-quora"
            error={errors.quora}
            value={this.state.quora}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Medium Profile URL"
            name="medium"
            icon="fa fa-medium"
            error={errors.medium}
            value={this.state.medium}
            onChange={this.onChange}
          />
        </div>
      );
    }
    //select options for department
    const deptOptions = [
      { label: "Select Department", value: 0 },
      { label: "Engineering", value: "Engineering" },
      { label: "Marketing", value: "Marketing" },
      { label: "Sales", value: "Sales" }
    ];
    //select options for shift
    const shiftOptions = [
      { label: "Select Shift", value: 0 },
      { label: "Morning", value: "Morning" },
      { label: "Afternoon", value: "Afternoon" },
      { label: "Night", value: "Night" }
    ];
    //select options for blood group
    const bloodGroupOptions = [
      { label: "Select Blood Group", value: 0 },
      { label: "O+", value: "O+" },
      { label: "O-", value: "O-" },
      { label: "A+", value: "A+" },
      { label: "A-", value: "A-" },
      { label: "B+", value: "B+" },
      { label: "B-", value: "B-" },
      { label: "AB+", value: "AB+" },
      { label: "B-", value: "B-" }
    ];
    //select options for gender
    const genderOptions = [
      { label: "Select Gender", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Neutral", value: "Neutral" },
      { label: "Rather Not Say", value: "Rather Not Say" }
    ];
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-3 text-center">Edit Your Profile</h1>
          </div>
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light mr-4">
              <i class="fa fa-arrow-left text-info mr-1" />
              Back
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <form className="p-4" onSubmit={this.onSubmit}>
              <h3 className="font-weight-light mb-4">
                {" "}
                Employement Information:{" "}
              </h3>
              <TextFieldGroup
                label="* Profile Handle:"
                placeholder="Enter profile handle"
                name="handle"
                id="handle"
                error={errors.handle}
                value={this.state.handle}
                onChange={this.onChange}
                info="A uinque handle for your profile URL."
              />
              <TextFieldGroup
                label="* Employee Number:"
                placeholder="Enter employee number"
                name="empNo"
                id="empNo"
                error={errors.empNo}
                value={this.state.empNo}
                onChange={this.onChange}
              />
              <SelectListGroup
                label="* Department:"
                name="department"
                id="department"
                options={deptOptions}
                error={errors.department}
                value={this.state.department}
                onChange={this.onChange}
              />
              <TextFieldGroup
                label="* Position:"
                placeholder="Enter Position"
                name="status"
                id="status"
                error={errors.status}
                value={this.state.status}
                onChange={this.onChange}
              />
              <SelectListGroup
                label="Shift:"
                name="shift"
                id="shift"
                options={shiftOptions}
                error={errors.shift}
                value={this.state.shift}
                onChange={this.onChange}
              />
              <h3 className="font-weight-light mb-4">
                {" "}
                Personal Information:{" "}
              </h3>
              <TextFieldGroup
                label="* Skills:"
                placeholder="Enter Skills"
                name="skills"
                id="skills"
                error={errors.skills}
                value={this.state.skills}
                onChange={this.onChange}
                info="Please enter a comma separated values.(eg. cpp,java,html,css,javascript)"
              />
              <TextFieldGroup
                label="* Phone Number:"
                placeholder="Enter phone number"
                name="phone"
                id="phone"
                error={errors.phone}
                value={this.state.phone}
                onChange={this.onChange}
                info="Please enter 10 digit number without any special characters and spaces in between(eg. 8712345069)"
              />
              <TextAreaFieldGroup
                label="* Address:"
                placeholder="Enter phone number"
                name="address"
                id="address"
                error={errors.address}
                value={this.state.address}
                onChange={this.onChange}
              />
              <TextFieldGroup
                label="* Emergency Number:"
                placeholder="Enter emergency number"
                name="emergencyNo"
                id="emergencyNo"
                error={errors.emergencyNo}
                value={this.state.emergencyNo}
                onChange={this.onChange}
                info="Please enter 10 digit number without any special characters and spaces in between(eg. 8712345069)"
              />
              <SelectListGroup
                label="* Blood Group:"
                name="bloodGroup"
                id="bloodGroup"
                options={bloodGroupOptions}
                error={errors.bloodGroup}
                value={this.state.bloodGroup}
                onChange={this.onChange}
              />

              <div className="form-group">
                <label for="dob">Date Of Birth:</label>
                <InputGroup
                  placeholder="Choose birth date"
                  name="dob"
                  icon="fa fa-calendar"
                  error={errors.dob}
                  value={this.state.dob}
                  onChange={this.onChange}
                />
              </div>

              <SelectListGroup
                label="* Gender:"
                name="gender"
                id="gender"
                options={genderOptions}
                error={errors.gender}
                value={this.state.gender}
                onChange={this.onChange}
              />
              <TextAreaFieldGroup
                label="Bio:"
                placeholder="Enter bio"
                name="bio"
                id="bio"
                error={errors.bio}
                value={this.state.bio}
                onChange={this.onChange}
              />
              <TextFieldGroup
                label="Website:"
                placeholder="Enter Website"
                name="website"
                id="website"
                error={errors.website}
                value={this.state.website}
                onChange={this.onChange}
              />
              <TextFieldGroup
                label="Github UserName:"
                placeholder="Enter github username"
                name="githubusername"
                id="githubusername"
                error={errors.githubusername}
                value={this.state.githubusername}
                onChange={this.onChange}
              />

              <div className="mb-4">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }));
                  }}
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
              <button type="submit" className="btn btn-info btn-block shadow">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.PropTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = {
  createProfile,
  getCurrentProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateProfile));

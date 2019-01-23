import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profileActions";

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
      phoneExtension: "",
      mentor:"",
      
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

  //Set the errors to component state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    const newProfile = {
      empNo: this.state.empNo,
      department: this.state.department,
      status: this.state.status,
      shift: this.state.shift,
      phoneExtension: this.state.phoneExtension,
      mentor: this.state.mentor,
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
            placeholder="Instagram URL"
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
      { label: "HumanResource", value: "HumanResource" },
      { label: "Management", value: "Management" },
      { label: "Marketing", value: "Marketing" },
      { label: "Sales", value: "Sales" },
      { label: "Testing", value: "testing" }
    ];
    //select options for shift
    const shiftOptions = [
      { label: "Select Shift", value: 0 },
      { label: "Day", value: "Day" },
      { label: "Split", value: "Split" },
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
            <h1 className="display-3 text-center">Create Your Profile</h1>
            <h2 className="font-weight-light text-center mb-4">
              Lets get your information to make your profile standout
            </h2>
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
              <TextFieldGroup
                label="* Phone Extension:"
                placeholder="Enter phone extension number"
                name="phoneExtension"
                id="phoneExtension"
                error={errors.phoneExtension}
                value={this.state.phoneExtension}
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
              <TextFieldGroup
                label="Mentor:"
                placeholder="Enter mentor name"
                name="mentor"
                id="mentor"
                error={errors.mentor}
                value={this.state.mentor}
                onChange={this.onChange}
              />
              
              <h3 className="font-weight-light mb-4">Personal Information: </h3>
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
                <label htmlFor="dob">Date Of Birth:</label>
                <InputGroup
                  placeholder="Choose birth date"
                  type="date"
                  name="dob"
                  info="Please enter in DD-MM-YYYY format(eg. 15-02-1995)"
                  icon="fa fa-calendar"
                  error={errors.dob}
                  value={this.state.dob}
                  onChange={this.onChange}
                  pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                />
              </div>

              <SelectListGroup
                label="Gender:"
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
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = {
  createProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateProfile));

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addEducation } from "../../actions/educationActions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

export class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      specialization: "",
      location: "",
      description: "",
      from: "",
      to: "",
      current: false,
      disabled: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChecked = this.onChecked.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const userEdu = {
      school: this.state.school,
      degree: this.state.degree,
      specialization: this.state.specialization,
      location: this.state.location,
      description: this.state.description,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current
    };
    this.props.addEducation(userEdu, this.props.history);
  }
  onChecked() {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="container-fluid mb-4">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-3 text-center">Add Education</h1>
            <h2 className="font-weight-light text-center mb-4">
              Add any qualifications, bootcamps, and courses you had!!
            </h2>
            <div className="col-md-8 m-auto">
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  label="* School / College:"
                  placeholder="Enter school / college"
                  name="school"
                  id="school"
                  error={errors.school}
                  value={this.state.school}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  label="* Degree or Certification:"
                  placeholder="Enter degree or certification"
                  name="degree"
                  id="degree"
                  error={errors.degree}
                  value={this.state.degree}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  label="Specialization:"
                  placeholder="Enter specialization"
                  name="specialization"
                  id="specialization"
                  error={errors.specialization}
                  value={this.state.specialization}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  label="Location:"
                  placeholder="Enter Location"
                  name="location"
                  id="location"
                  error={errors.location}
                  value={this.state.location}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  label="* From:"
                  placeholder="Enter Start Date"
                  name="from"
                  id="from"
                  type="date"
                  error={errors.from}
                  value={this.state.from}
                  onChange={this.onChange}
                />

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onChecked}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Currently Studying
                  </label>
                </div>
                <TextFieldGroup
                  label="To:"
                  placeholder="Enter End Date"
                  name="to"
                  id="to"
                  type="date"
                  error={errors.to}
                  value={this.state.to}
                  onChange={this.onChange}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <TextAreaFieldGroup
                  label="Description:"
                  placeholder="Enter description"
                  name="description"
                  id="description"
                  error={errors.description}
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <button type="submit" className="btn btn-info btn-block shadow">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddEducation.PropTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = {
  addEducation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation));
